import { MediumCard, MediumCardProp } from './components/MediumCard';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
} from '@apollo/client';
import { gql } from '../src/__generated__/gql';
import { MediaQuery } from './__generated__/graphql';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',

  cache: new InMemoryCache(),
});

const GET_MEDIA = gql(`
  query Media($first: Int!) {
  mediaConnections(first: $first) {
    edges {
      node {
        id
        title
        thumbnail
        publication
        duration
        channel
      }
    }
  }
}
`);

const toModel = (data: MediaQuery | undefined): MediumCardProp | undefined => {
  if (data?.mediaConnections?.edges && data.mediaConnections.edges[0].node) {
    const fe = data.mediaConnections.edges[0].node;
    return {
      id: fe.id,
      title: fe.title ?? '',
      channel: fe.channel ?? '',
      date: fe.publication ?? '',
      duration: fe.duration ?? NaN,
      thumbnail: new URL(fe.thumbnail ?? ''),
      type: 'Video',
    };
  }
  return undefined;
};

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

  const { loading, error, data } = useQuery(GET_MEDIA, {
    variables: {
      first: 10,
    },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  const modelData = toModel(data);
  return (
    <ApolloProvider client={client}>
      <div>{modelData && <MediumCard {...modelData} />}</div>
    </ApolloProvider>
  );
};

export default App;
