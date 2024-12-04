import './App.css';
import { DashboardAppBar } from './appbar/AppBar';
import { MediumCard, MediumCardProp } from './components/MediumCard';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { SearchPage } from './pages/searchpage/SearchPage';
import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { createContext, useContext, useState } from 'react';
import { FilterSelectionInput, WikiData } from './__generated__/graphql';
import { AccordionItem } from './components/AccordionItem';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DetailPage, mediumLoader } from './pages/detailpage/DetailPage';
import { AppPage } from './AppPage';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

export interface SearchQueryValues {
  filterInputs: Record<string, WikiData[]>;
  freeSolo?: string;
}

export interface SearchQuery extends SearchQueryValues {
  updateFilter: (filterId: string, data: WikiData[]) => void;
  updateFreeSolo: (input: string) => void;
}
export const SearchQueryContext = createContext<SearchQuery>({
  filterInputs: {},
  updateFilter: (_) => {},
  updateFreeSolo: (_) => {}
});

const ActualSearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<SearchQueryValues>({
    filterInputs: {},
    freeSolo: undefined
  });

  const updateFilter = (filterId: string, data: WikiData[]) => {
    const filterInputs = { ...searchQuery.filterInputs };
    filterInputs[filterId] = data;
    setSearchQuery({ ...searchQuery, filterInputs });
  };

  const updateFreeSolo = (input: string) => {
    setSearchQuery({ ...searchQuery, freeSolo: input });
  };

  return (
    <SearchQueryContext.Provider value={{ ...searchQuery, updateFilter, updateFreeSolo }}>
      <div className='content'>
        <DashboardAppBar />
        <SearchPage />
        <Box
          sx={{
            border: '2px solid black',
            height: '64px',
            boxSizing: 'border-box'
          }}>
          Pagination
        </Box>
      </div>
    </SearchQueryContext.Provider>
  );
};

const ErrorPage = () => {
  return <p>{"Couldn't find video or podcast with the <id>"}</p>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppPage />,
    errorElement: <ErrorPage />
  },
  {
    path: 'medium/:mediumId',
    element: <DetailPage />,
    loader: mediumLoader
  }
]);

const App = () => {
  // move to SearchPage

  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
};

export default App;
