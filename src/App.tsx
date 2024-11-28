import './App.css';
import { BNAppBar } from './appbar/AppBar';
import { MediumCard, MediumCardProp } from './components/MediumCard';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { SearchPage } from './searchpage/SearchPage';
import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { createContext, useContext, useState } from 'react';
import { FilterSelectionInput, WikiData } from './__generated__/graphql';
import { AccordionItem } from './components/AccordionItem';

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

const App = () => {
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
    <ApolloProvider client={client}>
      <SearchQueryContext.Provider value={{ ...searchQuery, updateFilter, updateFreeSolo }}>
        <div className='content'>
          <BNAppBar />
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
    </ApolloProvider>
  );
};

export default App;
