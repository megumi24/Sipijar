import { dashboard } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

interface WelcomeProps {
  config: {
    'telegram-login': string;
    'auth-url': string;
  };
}

export default function Welcome({ config }: WelcomeProps) {
  const { auth } = usePage<SharedData>().props;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', config['telegram-login']);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-auth-url', config['auth-url']);
    script.setAttribute('data-request-access', 'write');

    if (containerRef.current) {
      containerRef.current.innerHTML = ''; // clear if re-rendered
      containerRef.current.appendChild(script);
    }
  }, [config]);

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
        <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
          <nav className="flex items-center justify-end gap-4">
            {auth.user ? (
              <Link
                href={dashboard()}
                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
              >
                Dashboard
              </Link>
            ) : (
              <div ref={containerRef}></div>
            )}
          </nav>
        </header>
        <iframe
          src="http://metabase.sipijar.my.id/public/dashboard/da963482-4070-40e9-927c-9c827107e2ed"
          width="1024"
          height="768"
          allowTransparency
        ></iframe>
        <div className="hidden h-14.5 lg:block"></div>
      </div>
    </>
  );
}
