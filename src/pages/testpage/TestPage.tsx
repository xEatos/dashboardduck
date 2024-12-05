import { Suspense, useDeferredValue, useEffect, useState } from 'react';
import { LoaderFunction, Path, useLocation, useNavigate } from 'react-router-dom';
import { useGetMedia } from '../../queries/useGetMedia';

export const testLoader: LoaderFunction = (context): Partial<Path> => {
  const url = new URL(context.request.url);
  return {
    pathname: url.pathname,
    search: url.search
  };
};

interface Album {
  id: number;
  title: string;
  year: number;
}

// https://react.dev/reference/react/useTransition

export const SearchResults: React.FC<{ query: string }> = ({ query }) => {
  if (query === '') {
    return null;
  }

  const result = useGetMedia(10, '0', []);
  const deferredQuery = useDeferredValue(result);
  const isStale = result[0].title !== deferredQuery[0].title;

  if (result.length === 0) {
    return (
      <p>
        No matches for <i>"{query}"</i>
      </p>
    );
  }
  return (
    <div
      style={{
        opacity: isStale ? 0.5 : 1
      }}>
      <ul>
        {result.map((medium, index) => (
          <li key={index}>{medium.title}</li>
        ))}
      </ul>
    </div>
  );
};

export const TestPage: React.FC = () => {
  //const currentLocation = useLocation();
  const [query, setQuery] = useState<string>('');
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  console.log('isStale', isStale);

  const nextURL = 'http://localhost:3000/test';
  const nextTitle = 'My new page title';
  const nextState = { additionalInformation: 'Updated the URL with JS' };

  /*
  const navigate = useNavigate();

  useEffect(() => {
    if (!isStale) {
      navigate({ search: query });
    }
  }, [query, isStale]);
*/
  return (
    <div>
      <label>
        Search albums:
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </label>
      <button
        onClick={() => {
          window.history.pushState(nextURL + query, nextTitle, nextURL + query);
        }}>
        Bal
      </button>
      <Suspense fallback={<h2>Loading...</h2>}>
        <div
          style={{
            opacity: isStale ? 0.5 : 1
          }}>
          <SearchResults query={deferredQuery} />
        </div>
      </Suspense>
    </div>
  );
};

function getSearchResults(query: string) {
  const allAlbums = [
    {
      id: 13,
      title: 'Let It Be',
      year: 1970
    },
    {
      id: 12,
      title: 'Abbey Road',
      year: 1969
    },
    {
      id: 11,
      title: 'Yellow Submarine',
      year: 1969
    },
    {
      id: 10,
      title: 'The Beatles',
      year: 1968
    },
    {
      id: 9,
      title: 'Magical Mystery Tour',
      year: 1967
    },
    {
      id: 8,
      title: "Sgt. Pepper's Lonely Hearts Club Band",
      year: 1967
    },
    {
      id: 7,
      title: 'Revolver',
      year: 1966
    },
    {
      id: 6,
      title: 'Rubber Soul',
      year: 1965
    },
    {
      id: 5,
      title: 'Help!',
      year: 1965
    },
    {
      id: 4,
      title: 'Beatles For Sale',
      year: 1964
    },
    {
      id: 3,
      title: "A Hard Day's Night",
      year: 1964
    },
    {
      id: 2,
      title: 'With The Beatles',
      year: 1963
    },
    {
      id: 1,
      title: 'Please Please Me',
      year: 1963
    }
  ];

  const lowerQuery = query.trim().toLowerCase();
  return allAlbums.filter((album) => {
    const lowerTitle = album.title.toLowerCase();
    return lowerTitle.startsWith(lowerQuery) || lowerTitle.indexOf(' ' + lowerQuery) !== -1;
  });
}
