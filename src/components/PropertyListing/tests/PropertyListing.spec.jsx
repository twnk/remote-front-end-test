import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import PropertyListing from '../PropertyListing';
import { fetch, Response } from 'cross-fetch';

jest.mock('cross-fetch', () => {
    const crossFetch = jest.requireActual('cross-fetch');
    const { mockFetch } = jest.requireActual('../../../mockFetch');

    return {
        ...crossFetch,
        fetch: jest.fn(mockFetch),
    };
});

describe('PropertyListing', () => {
    afterEach(() => jest.clearAllMocks());

    it('should render 101 property cards', async () => {
        render(<PropertyListing />);
        const propertiesList = screen.getByRole('list');
        const propertyCards = await within(propertiesList).findAllByRole('listitem');
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(propertyCards).toHaveLength(101);
    });

    it('should throw on an api error', async () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        fetch.mockResolvedValueOnce(new Response(null, { status: 500, statusText: 'mock error' }));

        render(<PropertyListing />);

        const propertiesList = await screen.findByRole('list');
        const propertyCards = within(propertiesList).queryAllByRole('listitem');
        expect(propertyCards).toHaveLength(0);
        expect(fetch).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch data: [500] mock error'));

        consoleSpy.mockRestore();
    });
});
