import React  from 'react';
import { cleanup, render, waitFor, fireEvent } from '@testing-library/react-native';
import fetchMock from "jest-fetch-mock"
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Homepage from '../screens/Homepage';

fetchMock.enableMocks();
afterEach(cleanup);

describe('Testing Homepage', () => {
  it('should render the homepage correctly', () => {
    const tree = render(<Provider store={store}><Homepage /></Provider>)
    expect(tree).toMatchSnapshot();
  }),

  it('should render a list of cats', async() => {
    fetch.mockResponseOnce(
      JSON.stringify([
        { name: 'bengal', image: 'https://cdn2.thecatapi.com/images/ozEvzdVM-.jpg', id: 'beng' },
        { name: 'Aegean', image: 'https://cdn2.thecatapi.com/images/ozEvzdVM-.jpg', id: 'aege' },
      ])
    )

    const {queryByTestId, getByTestId } = render(<Provider store={store}><Homepage /></Provider>)
    expect(queryByTestId('cat-row-0')).toBeNull();

    await waitFor(() => {
      return queryByTestId('cat-row-0');
    });

    expect(getByTestId('cat-row-0'));
  }),

  it('should render a message if data from API is empty', async () => {
    fetch.mockResponseOnce(JSON.stringify([]));
    const { getByTestId } = render(<Provider store={store}><Homepage /></Provider>)
    
    await waitFor(() => {
      return getByTestId('no-results');
    });

    expect(getByTestId('no-results'));
  });
})