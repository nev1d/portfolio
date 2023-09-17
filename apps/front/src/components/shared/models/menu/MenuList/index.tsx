import { usePathname } from 'next/navigation';
import React from 'react';

import { PagesEnum } from '@/constants/pages';
import { useMenuStore } from '@/store/menu/menuStore';

import { MenuItem } from '../MenuItem';

export const MenuList: React.FC = () => {
    const menuItems = useMenuStore((store) => store.menuItems);
    const pathName = usePathname() as PagesEnum;

    if (pathName !== PagesEnum.MAIN) return null;

    return menuItems.toReversed().map((item, index) => {
        return <MenuItem {...item} pos={index} key={item.label} />;
    });
};
