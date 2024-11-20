import { MediumCard, MediumCardProp } from './components/MediumCard';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

const App = () => {
  const mockMediumProp: MediumCardProp = {
    id: 'https://bnwiki.wikibase.cloud/entity/Q6',
    title: `32% aller Erwachsenen haben diese Krankheit. Du auch?`,
    thumbnail: new URL(
      'https://i.ytimg.com/vi_webp/neZg7jGjfJg/mqdefault.webp',
    ),
    channel: 'DoktorWhatson',
    date: '2023-11-19',
    duration: 13 * 60 + 7,
    type: 'Video',
  };

  return (
    <ApolloProvider client={client}>
      <MediumCard {...mockMediumProp} />
    </ApolloProvider>
  );
};

export default App;
