import { Board } from '@/types/board';
import { getArray, getDataList } from '@/utils/firestore';
import { where } from 'firebase/firestore';
import { redirect } from 'next/navigation';
import getComponent from '@/utils/getBoardType';

const Page = async ({ params }: { params: { category: string } }) => {
  const res = await getDataList('boards', where('url', '==', params.category));
  const meta = getArray<Required<Board>>(res);

  if (meta.length < 1) {
    redirect('/');
  }

  const { title, type, id, url, isPublic } = meta[0];

  if (!id || !isPublic) {
    redirect('/');
  }

  const BoardComponent = getComponent(type);

  return <BoardComponent id={id} title={title} url={url} />;
};

export default Page;
