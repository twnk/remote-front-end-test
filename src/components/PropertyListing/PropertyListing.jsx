import React from 'react';
import PropertyCard from '../PropertyCard';
import './PropertyListing.scss';
import useFetchProperties from '../../hooks/useFetchProperties';

const PropertyListing = () => {
    const [properties] = useFetchProperties();

    return (
        <ul className="PropertyListing">
            {properties.map((property) => (
                <li key={property.id}>
                    <PropertyCard {...property} />
                </li>
            ))}
        </ul>
    );
};

export default PropertyListing;
