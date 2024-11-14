"use client";

import { ChildrenProps } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

function GoBack({ children }: {children: ({back} : {back: () => void}) => ReactNode }) {
    const router = useRouter();

    // The back function that triggers router.back()
    const back = () => {
        router.back();
    };

    // Render the child component as a function, passing the back function
    return children({ back });
}

export default GoBack;