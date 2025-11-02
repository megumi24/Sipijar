import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const Error = (props: { status: number }) => {
  const title = {
    503: '503: Service Unavailable',
    500: '500: Server Error',
    404: '404: Page Not Found',
    403: '403: Forbidden',
  }[props.status];

  const description = {
    503: 'Sorry, we are doing some maintenance. Please check back soon.',
    500: 'Whoops, something went wrong on our servers.',
    404: 'Sorry, the page you are looking for could not be found.',
    403: 'Sorry, you are forbidden from accessing this page.',
  }[props.status];

  return (
    <AppLayout>
      <Head title={title} />
      <div className="flex flex-col items-start gap-4 p-4">
        <div className="flex h-full w-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl bg-[var(--surface-card)] p-4">
          <h1>{title}</h1>
          <div>{description}</div>
        </div>
      </div>
    </AppLayout>
  );
};
export default Error;
