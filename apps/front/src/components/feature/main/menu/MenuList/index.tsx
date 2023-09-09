import React from 'react';

import { Word } from '@/components/feature/main/menu/Word';
import { useMenuStore } from '@/store/menu/menuStore';

export const MenuList: React.FC = () => {
    const menuItems = useMenuStore((store) => store.menuItems);

    return menuItems.toReversed().map((word, index) => {
        return <Word text={word} pos={index} key={word} />;
    });
};
