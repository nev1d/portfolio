import React from 'react';

import { Word } from '@/components/feature/main/menu/Word';
import { useMenuStore } from '@/store/menu/menuStore';

export const MenuList: React.FC = () => {
    const menuItems = useMenuStore((state) => state.menuItems);

    return menuItems.toReversed().map((word, index) => {
        return <Word text={word} pos={index} key={word} />;
    });
};
