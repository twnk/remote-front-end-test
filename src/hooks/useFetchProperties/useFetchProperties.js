import { useEffect, useState } from 'react';
import { fetch } from 'cross-fetch';

// This is straightforwardly not how to do this in any real application
// but for a demo it's sufficient
const BASE_API_ORIGIN =
    window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://flight.faun-emperor.ts.net:10000';
const BASE_API_PATH = '/api/properties';

const useFetchProperties = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            const url = new URL(BASE_API_PATH, BASE_API_ORIGIN);
            const res = await fetch(url, { signal });

            if (!res.ok) {
                const err = new Error(`Failed to fetch data: [${res.status}] ${res.statusText ?? ''}`);
                throw err;
            }

            const json = await res.json();

            setProperties(json);
        };

        fetchData().catch((err) => console.log(err.message));

        return () => controller.abort();
    }, []);

    return [properties];
};

export default useFetchProperties;
