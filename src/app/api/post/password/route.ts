import { getData } from '@/utils/firestore';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { generateToken } from '@/utils/jwt';
import { v4 } from 'uuid';

export async function POST(request: NextResponse) {
  try {
    const body = await request.json();

    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');

    const { password: dbPassword } = await getData('settings', 'common');

    const { password } = body;

    if (password !== dbPassword) {
      throw new Error('비밀번호가 올바르지 않습니다.');
    }

    cookies().set('access_token', generateToken({ uuid: v4() }));

    if (!origin || !referer) {
      throw new Error('잘못된 요청입니다');
    }

    const url = new URLSearchParams(referer);
    const id = url.get('id');
    const category = url.get('category');

    return NextResponse.redirect(origin + `/category/${category}/${id}`);
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ msg: err.message }, { status: 401 });
    }

    return new Response('Internal Server Error', { status: 500 });
  }
}
