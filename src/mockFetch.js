import { Response } from 'cross-fetch';
import { getAllProperties, getProperties } from '../server/service/properties';

export const mockFetch = async (url) => {
    const { searchParams, pathname } = new URL(url);

    if (pathname !== '/api/properties') {
        return new Response(null, { status: 404 });
    }

    if (searchParams.size === 0) {
        const body = JSON.stringify(await getAllProperties());

        return new Response(body);
    }

    const query = Object.fromEntries(searchParams.entries());

    const body = JSON.stringify(await getProperties(query));

    return new Response(body);
};
