import { Liveblocks } from '@liveblocks/node';
import { NextRequest } from 'next/server';
import { getRandomUser } from '@/database';

// Authenticating your Liveblocks application
// https://liveblocks.io/docs/authentication

const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY as string,
});

export async function POST(request: NextRequest) {
    // Get the current user's unique id and info from your database
    var user = getRandomUser();

    const url = request.nextUrl;

    // Get a query parameter by name (e.g., "id")
    const name = url.searchParams.get('name');

    // Create a session for the current user
    // userInfo is made available in Liveblocks presence hooks, e.g. useOthers
    const session = liveblocks.prepareSession(`${Math.random()}`, {
        userInfo: { ...user.info, name: name as string },
    });

    // Use a naming pattern to allow access to rooms with a wildcard
    session.allow(`liveblocks:examples:*`, session.FULL_ACCESS);

    // Authorize the user and return the result
    const { body, status } = await session.authorize();
    return new Response(body, { status });
}
