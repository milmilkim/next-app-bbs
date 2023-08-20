import CommonLayout from '@/components/common/layouts/CommonLayout';
import '@/app/font.css'
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CommonLayout>{children}</CommonLayout>;
}
