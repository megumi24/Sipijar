import { useAppStore } from '@/stores/app';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { ComponentType, ReactNode, useEffect, useRef, useState } from 'react';

const render = (name: string) =>
  resolvePageComponent(
    `../pages/${name}.tsx`,
    import.meta.glob('../pages/**/*.tsx'),
  );

const DefaultLayout = ({ children }: { children?: ReactNode }) => {
  const setToastRef = useAppStore((state) => state.setToastRef);
  const toastRef = useRef<Toast>(null);

  const [ModalPage, setModalPage] = useState<ComponentType<{
    title?: string;
    [key: string]: unknown;
  }> | null>(null);
  const { modalData } = usePage<SharedData>().props;

  useEffect(() => {
    setToastRef(toastRef);
  }, [setToastRef]);

  useEffect(() => {
    if (modalData?.modal) {
      render(modalData.modal).then((module) =>
        setModalPage(
          () =>
            (
              module as {
                default: ComponentType<{
                  title?: string;
                  [key: string]: unknown;
                }>;
              }
            ).default,
        ),
      );
    }
  }, [modalData?.modal]);
  return (
    <>
      {children}
      <Dialog
        visible={!!ModalPage}
        onHide={() => setModalPage(null)}
        header={modalData?.data?.title || 'Modal Page'}
      >
        {ModalPage !== null && <ModalPage {...(modalData?.data || {})} />}
      </Dialog>
      <Toast ref={toastRef} />
    </>
  );
};
export default DefaultLayout;
