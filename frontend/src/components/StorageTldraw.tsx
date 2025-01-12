'use client';

import 'tldraw/tldraw.css';
import {
    Tldraw,
    DefaultStylePanel,
    DefaultStylePanelContent,
    DefaultToolbar,
    SelectToolbarItem,
    AssetToolbarItem,
    TextToolbarItem,
    EraserToolbarItem,
    HandToolbarItem,
    useEditor,
} from 'tldraw';
import { useStorageStore } from './useStorageStore';
import { useSelf } from '@liveblocks/react/suspense';
import TldrawChild from './TldrawChild';
import { useState } from 'react';

/**
 * IMPORTANT: LICENSE REQUIRED
 * To remove the watermark, you must first purchase a license
 * Learn more: https://tldraw.dev/community/license
 */

export function StorageTldraw({ sendPictures }: any) {
    // Getting authenticated user info. Doing this using selectors instead
    // of just `useSelf()` to prevent re-renders on Presence changes
    const id = useSelf((me) => me.id);
    const info = useSelf((me) => me.info);

    const store = useStorageStore({
        user: { id, color: info.color, name: info.name },
    });

    const [temp, setTemp] = useState(false);

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <Tldraw
                store={store}
                components={{
                    // Render a live avatar stack at the top-right
                    StylePanel: () => null,
                    ActionsMenu: () => null,
                    Brush: () => null,
                    PageMenu: () => null,
                    ZoomMenu: () => null,
                    DebugMenu: () => null,
                    MainMenu: () => null,
                    Toolbar: () => (
                        <DefaultToolbar>
                            <SelectToolbarItem />
                            <HandToolbarItem />
                            <EraserToolbarItem />
                            <TextToolbarItem />
                            <AssetToolbarItem />
                            <button
                                onClick={() => setTemp(!temp)}
                                className="px-2 py-2 mr-2 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 
                                text-white rounded-lg font-medium shadow-lg hover:shadow-xl 
                                transition-all duration-300 hover:scale-105 
                                animate-gradient-x
                                border border-purple-300/30"
                            >
                                ✨ Curate Shopping List
                            </button>
                        </DefaultToolbar>
                    ),
                    HelpMenu: () => null,
                }}
                autoFocus
            >
                <TldrawChild
                    temp={temp}
                    sendPictures={sendPictures}
                ></TldrawChild>
            </Tldraw>
        </div>
    );
}
