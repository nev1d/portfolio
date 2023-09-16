import { usePathname } from 'next/navigation';

import { PagesEnum } from '@/constants/pages';

export const useCurrentPathname = () => {
    return usePathname() as PagesEnum;
};
