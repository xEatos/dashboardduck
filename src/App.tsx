import './App.css';
import { BNAppBar } from './appbar/AppBar';
import { MediumCard, MediumCardProp } from './components/MediumCard';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { SearchPage } from './searchpage/Page';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="content">
        <BNAppBar />
        <SearchPage filterPanel={<Box>Content</Box>} />
        <Box
          sx={{
            border: '2px solid black',
            height: '64px',
            boxSizing: 'border-box',
          }}
        >
          Footer
        </Box>
      </div>
    </ApolloProvider>
  );
};

export default App;
