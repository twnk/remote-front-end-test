import React from 'react';
import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import PropertyListing from '../PropertyListing';

jest.mock('cross-fetch', () => {
    const crossFetch = jest.requireActual('cross-fetch');
    const { mockFetch } = jest.requireActual('../../../mockFetch');

    return {
        ...crossFetch,
        fetch: jest.fn(mockFetch),
    };
});

describe('PropertyListing', () => {
    it('should render 101 property cards', async () => {
        render(<PropertyListing />);
        const propertiesList = screen.getByRole('list');
        const propertyCards = await within(propertiesList).findAllByRole('listitem');
        expect(propertyCards).toHaveLength(101);
    });
});
