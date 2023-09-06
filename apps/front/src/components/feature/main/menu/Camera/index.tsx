import React from 'react';

import { OrbitControls } from '@react-three/drei';

export const MenuCamera: React.FC = () => {
    return (
        <OrbitControls
            enableZoom={false}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={-Math.PI / 6}
        />
    );
};
