import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Letter } from '@/components/feature/scene/models/menu/Letter';
import { WordPlatform } from '@/components/feature/scene/models/menu/MenuItem/platform';
import { MARGIN, OFFSET } from '@/constants/menu';
import { PagesEnum } from '@/constants/pages';
import { useCurrentPathname } from '@/hooks/useCurrentPathname';
import { useForceUpdate } from '@/hooks/useForceUpdate';
import { useThreeHoverPointer } from '@/hooks/useThreeHoverPointer';
import { MenuStoreItem, useMenuStore } from '@/store/menu/menuStore';
import { toDecimals } from '@/utils/math/toDecimals';
import { Triplet } from '@react-three/cannon';
import { Center } from '@react-three/drei';

import { motion } from 'framer-motion-3d';
import { Color } from 'three';

type MenuItemProps = {
    pos: number;
} & MenuStoreItem;

const color = {
    from: new Color('#ffffff'),
    to: new Color('#ffffff'),
};

export const MenuItem: React.FC<MenuItemProps> = ({ label, route, pos }) => {
    const hasBeenInitialized = useMenuStore((store) => store.hasBeenInitialized);
    const chooseMenuItem = useMenuStore((store) => store.chooseMenuItem);

    const router = useRouter();
    const pathName = useCurrentPathname();

    const [isPlatformActivated, setIsPlatformActivated] = useState(false);

    const pointerProps = useThreeHoverPointer();

    /* Updating center after positioning change in Letter component's */
    const [cacheKey, forceUpdate] = useForceUpdate();

    useEffect(() => {
        if (pathName === PagesEnum.MAIN) {
            forceUpdate();
        }
    }, [pathName]);
    /* */

    useEffect(() => {
        if (hasBeenInitialized) setIsPlatformActivated(true);
    }, [pathName]);

    const onItemClick = () => {
        chooseMenuItem(route, () => {
            router.push(route);
            pointerProps.onPointerOut();
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
                {isPlatformActivated && <WordPlatform position={planePosition} />}
            </motion.group>
        </Center>
    );
};
