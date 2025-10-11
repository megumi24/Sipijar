import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import DefaultLayout from './default-layout';

export default function AuthLayout({
  children,
  title,
  description,
  ...props
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <DefaultLayout>
      <AuthLayoutTemplate title={title} description={description} {...props}>
        {children}
      </AuthLayoutTemplate>
    </DefaultLayout>
  );
}
