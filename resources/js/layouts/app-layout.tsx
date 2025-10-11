import { useAppearance } from '@/hooks/use-appearance';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { PrimeReactContext } from 'primereact/api';
import { useContext, useEffect, type ReactNode } from 'react';
import DefaultLayout from './default-layout';

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
  const { changeTheme } = useContext(PrimeReactContext);
  const { isDark } = useAppearance();

  useEffect(() => {
    const _isDark = isDark();
    const newTheme = _isDark ? 'lara-dark-amber' : 'lara-light-amber';
    if (!document.getElementById('theme-link')) {
      const link = document.createElement('link');
      link.id = 'theme-link';
      link.rel = 'stylesheet';
      link.href = `/themes/${newTheme}/theme.css`;
      document.head.appendChild(link);
    }
    if (changeTheme)
      changeTheme(
        !_isDark ? 'lara-dark-amber' : 'lara-light-amber',
        newTheme,
        'theme-link',
      );
  }, [changeTheme, isDark]);

  return (
    <DefaultLayout>
      <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
      </AppLayoutTemplate>
    </DefaultLayout>
  );
};
