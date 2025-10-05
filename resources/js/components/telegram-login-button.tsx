import { useEffect, useRef } from 'react';

interface TelegramLoginButtonProps {
  telegramLogin: string;
  authUrl: string;
}

const TelegramLoginButton = ({
  telegramLogin,
  authUrl,
}: TelegramLoginButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', telegramLogin);
    script.setAttribute('data-size', 'medium');
    script.setAttribute('data-userpic', 'true');
    script.setAttribute('data-auth-url', authUrl);
    script.setAttribute('data-request-access', 'write');

    if (containerRef.current) {
      containerRef.current.innerHTML = ''; // clear if re-rendered
      containerRef.current.appendChild(script);
    }
  }, [telegramLogin, authUrl]);

  return <div ref={containerRef}></div>;
};
export default TelegramLoginButton;
