import React from 'react';

import { PagesEnum } from '@/constants/pages';
import { useCurrentPathname } from '@/hooks/useCurrentPathname';
import { useMenuStore } from '@/store/menu/menuStore';

import { MenuItem } from '../MenuItem';

export const MenuList: React.FC = () => {
    const menuItems = useMenuStore((store) => store.menuItems);
    const pathName = useCurrentPathname();

    if (pathName !== PagesEnum.MAIN) return null;

    return menuItems.toReversed().map((item, index) => {
        return <MenuItem {...item} pos={index} key={item.label} />;
    });
};
