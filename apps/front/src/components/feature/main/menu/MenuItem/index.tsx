import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion-3d';
import { Color } from 'three';

import { Letter } from '@/components/feature/main/menu/Letter';
import { WordPlatform } from '@/components/feature/main/menu/MenuItem/platform';
import { MARGIN, OFFSET, PLATFORM_DISABLE_DELAY } from '@/constants/menu';
import { PagesEnum } from '@/constants/pages';
import { useForceUpdate } from '@/hooks/useForceUpdate';
import { useThreeHoverPointer } from '@/hooks/useThreeHoverPointer';
import { MenuStoreItem, useMenuStore } from '@/store/menu/menuStore';
import { toDecimals } from '@/utils/math/toDecimals';
import { Triplet } from '@react-three/cannon';
import { Center } from '@react-three/drei';

type MenuItemProps = {
    pos: number;
} & MenuStoreItem;

const color = {
    from: new Color('#ffffff'),
    to: new Color('#ffffff'),
};

export const MenuItem: React.FC<MenuItemProps> = ({ label, route, pos }) => {
    const isPlatformsVisible = useMenuStore((store) => store.isPlatformsVisible);
    const chooseMenuItem = useMenuStore((store) => store.chooseMenuItem);

    const router = useRouter();
    const pathName = usePathname() as PagesEnum;

    const [isPlatformActivated, setIsPlatformActivated] = useState(false);
    const [shouldShowPlatform, setShouldShowPlatform] = useState(false);

    const pointerProps = useThreeHoverPointer();

    useEffect(() => {
        setTimeout(() => {
            setShouldShowPlatform(isPlatformActivated && isPlatformsVisible);
        }, PLATFORM_DISABLE_DELAY * pos);
    }, [isPlatformsVisible]);

    useEffect(() => {
        setShouldShowPlatform(isPlatformActivated && isPlatformsVisible);
    }, [isPlatformActivated]);

    /* Updating center after positioning change in Letter component's */
    const [cacheKey, forceUpdate] = useForceUpdate();

    useEffect(() => {
        if (pathName === PagesEnum.MAIN) {
            forceUpdate();
        }
    }, [pathName]);
    /* */

    const onItemClick = () => {
        chooseMenuItem(() => {
            router.push(route);
        });
    };

    const planePosition: Triplet = [0, toDecimals(pos * MARGIN - OFFSET), 100];

    return (
        <Center disableY={true} disableZ={true} cacheKey={cacheKey}>
            <motion.group onClick={onItemClick} {...pointerProps}>
                {Array.from(label).reduceRight(
                    (acc, item, index) => {
                        return (
                            <Letter
                                key={`${item}-${pathName}`}
                                color={color}
                                text={item}
                                length={label.length}
                                pos={index}
                                wordPos={pos}
                                toggleCurrentPlatform={setIsPlatformActivated}
                                planePosition={planePosition}
                            >
                                {acc}
                            </Letter>
                        );
                    },
                    <></>,
                )}
                {shouldShowPlatform && <WordPlatform position={planePosition} />}
            </motion.group>
        </Center>
    );
};
