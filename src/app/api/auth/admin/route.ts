import { NextResponse } from 'next/server';
import { auth as admin } from '@/lib/admin';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { secret, email, password } = body;

    if (secret !== process.env.AUTH_SECRET) {
      throw new Error('잘못된 시크릿키입니다');
    }

    // 계정 생성
    const current = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // 권한 설정
    await admin.setCustomUserClaims(current.user.uid, { admin: true });

    return NextResponse.json({ msg: 'ok' });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ msg: err.message }, { status: 401 });
    }

    return new Response('Internal Server Error', { status: 500 });
  }
}
