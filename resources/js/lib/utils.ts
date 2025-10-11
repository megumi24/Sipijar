import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const debounce = (fn: Function, wait: number = 300) => {
  let timer: ReturnType<typeof setTimeout>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (this: any, ...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
};
