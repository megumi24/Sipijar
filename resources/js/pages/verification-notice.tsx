import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const VerificationNotice = () => {
  return (
    <AppLayout>
      <Head title="User Unverified" />

      <div className="flex flex-col items-start gap-4 p-4">
        <div className="flex h-full w-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl bg-[var(--surface-card)] p-4">
          Anda belum terverifikasi. Silahkan hubungi admin SIPIJAR untuk
          mendapatkan akses ke aplikasi.
        </div>
      </div>
    </AppLayout>
  );
};
export default VerificationNotice;
