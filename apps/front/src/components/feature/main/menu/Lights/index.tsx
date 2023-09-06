import React from 'react';

export const MenuLights: React.FC = () => {
    return (
        <>
            <ambientLight color={'#CCCCCC'} />
            <directionalLight args={[0xffffff, 1]} position={[5, 5, 20]} castShadow={true} />
            <directionalLight args={[0xffffff, 0.5]} position={[-5, -5, -20]} castShadow={true} />
        </>
    );
};
