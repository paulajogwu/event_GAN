import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';


interface SkeletonLoaderProps {
    count: number;
    containerStyle: string;
    loaderStyle: string;
}
const SkeletonLoader = ({
    count = 1,
    containerStyle = "grid",
    loaderStyle = 'rounded-md bg-gray-300'
}: SkeletonLoaderProps) => {
    return (
        <div
            className={`flex ${containerStyle}`}
        >
            {[...Array(count)].map((_, index) => (
                <Skeleton
                    key={index}
                    className={`${loaderStyle}`}
                />
            ))}
        </div>
    );
};

export default SkeletonLoader;
