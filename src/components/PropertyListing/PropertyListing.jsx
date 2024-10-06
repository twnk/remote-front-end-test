import React, { useEffect, useState } from 'react';
import { fetch } from 'cross-fetch';
import PropertyCard from '../PropertyCard';
import './PropertyListing.scss';

const PropertyListing = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:3000/api/properties');

            if (!res.ok) {
                throw new Error('Failed to fetch data', { status: res.status, message: res.message });
            }

            const json = await res.json();

            return json;
        };

        fetchData().then((data) => setProperties(data));
    }, []);

    return (
        <ul className="PropertyListing">
            {properties.map((property, index) => (
                <li key={index}>
                    <PropertyCard {...property} />
                </li>
            ))}
        </ul>
    );
};

export default PropertyListing;
