import { Orbit, Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google';

const orbit = Orbit({ weight: '400', subsets: ['latin'] });

const notoSansRegular = Noto_Sans_KR({ weight: '400', subsets: ['latin'] });
const notoSansBold = Noto_Sans_KR({ weight: '500', subsets: ['latin'] });
const notoSansBlack = Noto_Sans_KR({ weight: '900', subsets: ['latin'] });
const notoSerifRegular = Noto_Serif_KR({ weight: '400', subsets: ['latin'] });

export { orbit, notoSansBlack, notoSansRegular, notoSansBold, notoSerifRegular };
