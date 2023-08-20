import { getData } from '@/utils/firestore';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import PostItem from '@/components/board/post/PostItem';
import { Post } from '@/types/board';
import { Timestamp } from 'firebase/firestore';
import type { Metadata, ResolvingMetadata } from 'next';
import { verifyToken } from '@/utils/jwt';
import Secret from './Secret';
import { getPlaiceholder } from 'plaiceholder';

type Props = {
  params: { id: string; category: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const getImage = async (src: string) => {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const category = params.category;
  const res: Required<Post> | null = await getData('posts', id);

  const title = res?.title || '';

  return {
    title,
    openGraph: {
      title,
      images: [
        {
          url: res?.thumbnailUrl || 'https://nextjs.org/og-alt.png',
          width: 800,
          height: 600,
        },
        {
          url: res?.thumbnailUrl || 'https://nextjs.org/og-alt.png',
          width: 1800,
          height: 1600,
        },
      ],
      locale: 'ko_KR',
      type: 'website',
    },
  };
}

const PostPage = async ({
  params,
}: {
  params: { id: string; category: string };
}) => {
  const id = params.id;
  const category = params.category;

  if (!id) {
    redirect('/');
  }

  const res: Required<Post> | null = await getData('posts', id);

  let noAuth = false;
  let post;
  let url = '';
  let thumbBase64;
  // 비밀글일 때 분기 로직

  if (res?.isSecret) {
    console.log('비밀글===========');
    const cookieStore = cookies();
    const token = cookieStore.get('access_token');

    if (!token?.value) {
      noAuth = true;
    } else {
      try {
        verifyToken(token?.value);
      } catch (err) {
        noAuth = true;
      }
    }
  }

  // 권한 있을 때만 글 마저 불러옴
  if (!noAuth) {
    if (res) {
      post = {
        ...res,
        createdAt: (res?.createdAt as Timestamp).toDate(),
        thumbnailUrl: res.thumbnailUrl || '',
      };

      if (post.thumbnailUrl) {
        const { base64 } = await getImage(post.thumbnailUrl);
        thumbBase64 = base64;

      }

    }
  } else {
    // 권한 없으면 비밀번호 Url
    const res = await getData<{ passwordUrl: string }>('settings', 'common');
    url = res?.passwordUrl || '-';
  }

  return (
    <>
      {noAuth ? (
        <Secret url={url} />
      ) : post ? (
        <PostItem post={post} id={id} base64={thumbBase64} />
      ) : (
        <div className='w-full h-screen flex justify-center flex-wrap items-center'>
          삭제되었거나 존재하지 않는 게시글입니다.
        </div>
      )}
    </>
  );
};

export default PostPage;
