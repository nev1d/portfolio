import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { PagesEnum } from '@/constants/pages';

export const usePageUtils = () => {
    const router = useRouter();

    useEffect(() => {
        const pagesToPrefetch = Object.values(PagesEnum);

        pagesToPrefetch.forEach((page) => {
            router.prefetch(page);
        });
    }, []);
};
