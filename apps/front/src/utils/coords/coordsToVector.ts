import { CoordsRecordPartial } from '@/typings/coords';
import { Vector3 } from '@react-three/fiber';

export const coordsToVector = (coords: CoordsRecordPartial = {}): Vector3 => {
    return [coords?.x || 0, coords?.y || 0, coords?.z || 0];
};
