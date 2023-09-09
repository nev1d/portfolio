import React from 'react';

import { MainPageLayout } from '@/components/feature/main/layout';
import { Menu } from '@/components/feature/main/menu';

import '@assets/styles/__global.css';
import '@assets/styles/__reset.css';
import '@assets/styles/__variables.css';

export default function Home() {
    return (
        <>
            <Menu />
            <MainPageLayout />
        </>
    );
}
