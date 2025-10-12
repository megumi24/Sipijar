import TelegramLoginButton from '@/components/telegram-login-button';
import { dashboard } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface WelcomeProps {
  config: {
    'telegram-login': string;
    'auth-url': string;
  };
}

export default function Welcome({ config }: WelcomeProps) {
  const { auth } = usePage<SharedData>().props;

  return (
    <>
      <Head title="Welcome">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
          rel="stylesheet"
        />
      </Head>
      <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
        <header className="mb-6 w-full text-sm not-has-[nav]:hidden">
          <nav className="flex items-center justify-end gap-4">
            {auth.user && (
              <Link
                href={dashboard()}
                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
              >
                Dashboard
              </Link>
            )}
          </nav>
        </header>
        <main className="flex w-full flex-1 flex-col items-center justify-center">
          <TelegramLoginButton
            telegramLogin={config['telegram-login']}
            authUrl={config['auth-url']}
          />
        </main>
      </div>
    </>
  );
}
