import { useEffect, useRef } from 'react';

import { useFrame, useThree } from '@react-three/fiber';

import { Group, Intersection, Raycaster, Vector2 } from 'three';

type UseObjectRotationDefaultProps = Partial<{
    velocity: number;
    rotationSide: 'y' | 'x' | 'all';
}>;

type UseObjectAutoRotationProps = UseObjectRotationDefaultProps & {
    autoRotation: true;
    autoRotationSpeed?: number;
};

type UseObjectAutoRotationDisabledProps = UseObjectRotationDefaultProps & {
    autoRotation: false;
    autoRotationSpeed: never;
};

export const useObjectRotation = <T extends Group>({
    velocity = 0.2,
    rotationSide = 'all',
    autoRotation = false,
    autoRotationSpeed = 0.01,
}: UseObjectAutoRotationProps | UseObjectAutoRotationDisabledProps) => {
    const objectRef = useRef<T>(null);
    const isDragging = useRef(false);
    const previousMousePosition = useRef({ x: 0, y: 0 });
    const rotationVelocity = useRef({ x: 0, y: 0 });

    const { camera } = useThree();

    useFrame(() => {
        const object = objectRef.current;

        if (!object) return;

        if (autoRotation && !isDragging.current) {
            if (rotationSide !== 'x') object.rotation.y += autoRotationSpeed;
            if (rotationSide !== 'y') object.rotation.x += autoRotationSpeed;
        }

        if (isDragging.current) {
            if (rotationSide !== 'x') object.rotation.y += rotationVelocity.current.y * velocity;
            if (rotationSide !== 'y') object.rotation.x += rotationVelocity.current.x * velocity;
        }
    });

    useEffect(() => {
        const object = objectRef.current;

        if (!object || !camera) return;

        const handleMouseUp = () => {
            isDragging.current = false;
            rotationVelocity.current = { x: 0, y: 0 };
        };

        const handleMouseMove = (event: MouseEvent) => {
            const { movementX, movementY } = event;

            if (isDragging.current) {
                if (rotationSide !== 'x') rotationVelocity.current.y += movementX * 0.01;
                if (rotationSide !== 'y') rotationVelocity.current.x += movementY * 0.01;
            }

            previousMousePosition.current = { x: event.clientX, y: event.clientY };
        };

        const handleClick = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            const mouse = new Vector2((clientX / window.innerWidth) * 2 - 1, -(clientY / window.innerHeight) * 2 + 1);

            if (camera) {
                const raycaster = new Raycaster();

                raycaster.setFromCamera(mouse, camera);

                const intersects: Intersection[] = raycaster.intersectObject(object, true);

                if (intersects.length > 0) {
                    isDragging.current = true;
                }
            }
        };

        const updateRotation = () => {
            if (!isDragging.current) {
                if (rotationSide !== 'y') object.rotation.y += rotationVelocity.current.y * velocity;
                if (rotationSide !== 'x') object.rotation.x += rotationVelocity.current.x * velocity;
            }
        };

        const animate = () => {
            updateRotation();
            requestAnimationFrame(animate);
        };

        document.addEventListener('mousedown', handleClick);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        animate();

        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [rotationSide, velocity, camera]);

    return { ref: objectRef, isDragging };
};
