"use client";

import "tldraw/tldraw.css";
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
} from "tldraw";
import { useStorageStore } from "./useStorageStore";
import { useSelf } from "@liveblocks/react/suspense";
import { Avatars } from "@/components/Avatars";
import { Badge } from "@/components/Badge";

/**
 * IMPORTANT: LICENSE REQUIRED
 * To remove the watermark, you must first purchase a license
 * Learn more: https://tldraw.dev/community/license
 */

export function StorageTldraw() {
  // Getting authenticated user info. Doing this using selectors instead
  // of just `useSelf()` to prevent re-renders on Presence changes
  const id = useSelf((me) => me.id);
  const info = useSelf((me) => me.info);

  const store = useStorageStore({
    user: { id, color: info.color, name: info.name },
  });

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
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
            </DefaultToolbar>
          ),
          HelpMenu: () => null,
        }}
        autoFocus
      />
    </div>
  );
}
