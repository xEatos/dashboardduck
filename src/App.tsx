import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { searchLoader, SearchPage } from './pages/searchpage/SearchPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DetailPage, mediumLoader } from './pages/detailpage/DetailPage';
import { AppPage } from './AppPage';
import { TestPage } from './pages/testpage/TestPage';
import { ImportPage } from './pages/importpage/ImportPage';
import { IntegrationPage } from './pages/integrationpage/IntegrationPage';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

const ErrorPage = () => {
  return <p>{"Couldn't find page the <id>"}</p>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'search',
        element: <SearchPage />,
        loader: searchLoader
      },
      {
        path: 'import',
        element: <ImportPage />
      },
      {
        path: 'medium/:mediumId',
        element: <DetailPage offset={64} />,
        loader: mediumLoader
      },
      {
        path: 'integration/',
        element: <IntegrationPage />
      }
    ]
  }
]);

const App = () => {
  return <ApolloProvider client={client}>{<RouterProvider router={router} />}</ApolloProvider>;
};

export default App;
