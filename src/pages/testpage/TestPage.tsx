import { Suspense, useDeferredValue, useState } from 'react';
import { LoaderFunction, Path } from 'react-router-dom';
import { useGetMedia } from '../../queries/useGetMedia';

export const testLoader: LoaderFunction = (context): Partial<Path> => {
  const url = new URL(context.request.url);
  return {
    pathname: url.pathname,
    search: url.search
  };
};

// https://react.dev/reference/react/useTransition

export const TestSearchResult: React.FC<{ query: string; first: number }> = ({ query, first }) => {
  if (query === '') {
    return null;
  }

  const result = useGetMedia(first, '0', []);

  if (result.length === 0) {
    return (
      <p>
        No matches for <i>"{query}"</i>
      </p>
    );
  }
  return (
    <ul>
      {result.map((medium, index) => (
        <li key={index}>{medium.title}</li>
      ))}
    </ul>
  );
};

export const TestPage: React.FC = () => {
  const [queryAmount, setQueryAmount] = useState({
    amount: Math.ceil((Math.random() + 1) * 100),
    query: ''
  });
  const deferredQueryAmount = useDeferredValue(queryAmount);
  const isStale =
    queryAmount.amount !== deferredQueryAmount.amount ||
    queryAmount.query !== deferredQueryAmount.query;
  console.log('isStale', isStale);

  return (
    <div>
      <label>
        Search albums:
        <input
          value={queryAmount.query}
          onChange={(e) => {
            setQueryAmount({ query: e.target.value, amount: Math.ceil((Math.random() + 1) * 100) });
          }}
        />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <div
          style={{
            opacity: isStale ? 0.5 : 1
          }}>
          <TestSearchResult query={deferredQueryAmount.query} first={deferredQueryAmount.amount} />
        </div>
      </Suspense>
    </div>
  );
};
