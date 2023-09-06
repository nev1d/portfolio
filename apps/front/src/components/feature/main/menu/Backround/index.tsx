import React from 'react';

type MenuBackgroundProps = {
    backgroundColor: string;
};
export const MenuBackground: React.FC<MenuBackgroundProps> = ({ backgroundColor }) => {
    return (
        <>
            <fog attach='fog' args={[backgroundColor, 45, 95]} />
            <color attach='background' args={[backgroundColor]} />
        </>
    );
};
