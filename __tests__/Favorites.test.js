import React  from 'react';
import { cleanup, render, waitFor } from '@testing-library/react-native';
import fetchMock from "jest-fetch-mock"
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Favorites from '../screens/Favourites'

fetchMock.enableMocks();
afterEach(cleanup);

describe('Testing FavoritesPage', () => {
    it('should render the favorite page correctly', () => {
      const tree = render(<Provider store={store}><Favorites /></Provider>)
      expect(tree).toMatchSnapshot();
    }),
    it('should render a list of favorite cats', async() => {
      fetch.mockResponseOnce(
        JSON.stringify([
          { name: 'bengal', image: 'https://cdn2.thecatapi.com/images/ozEvzdVM-.jpg', id: 'beng' },
          { name: 'Aegean', image: 'https://cdn2.thecatapi.com/images/ozEvzdVM-.jpg', id: 'aege' },
        ])
      )
  
      const {getByTestId } = render(<Provider store={store}><Favorites /></Provider>)
      expect(getByTestId('favorite-row-0'));
    })   
  })