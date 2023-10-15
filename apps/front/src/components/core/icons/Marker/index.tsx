import cn from './style.module.css';
export const Marker = () => {
    return (
        <div className={cn.marker}>
            <div className={cn.markerInner} />
        </div>
    );
};
