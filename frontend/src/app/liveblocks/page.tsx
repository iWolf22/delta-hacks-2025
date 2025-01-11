// 'use client';

// import { useOthers } from '@liveblocks/react/suspense';
// import {
//     LiveblocksProvider,
//     RoomProvider,
//     ClientSideSuspense,
// } from '@liveblocks/react/suspense';

// export default function LiveBlocks() {
//     const others = useOthers();
//     const userCount = others.length;

//     return (
//         <LiveblocksProvider publicApiKey={'pk_prod_xxxxxxxxxxxxxxxxxxxxxxxx'}>
//             <RoomProvider id="my-room">
//                 <ClientSideSuspense fallback={<div>Loading…</div>}>
//                     <div>There are {userCount} other user(s) online</div>
//                 </ClientSideSuspense>
//             </RoomProvider>
//         </LiveblocksProvider>
//     );
// }
