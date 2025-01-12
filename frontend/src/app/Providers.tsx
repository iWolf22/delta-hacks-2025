'use client';

import { LiveblocksProvider } from '@liveblocks/react';
import { PropsWithChildren } from 'react';

export function Providers({ children, name }: any) {
    return (
        <LiveblocksProvider
            authEndpoint={'/api/liveblocks-auth?name=' + name}
            throttle={16}
        >
            {children}
        </LiveblocksProvider>
    );
}
