import React from 'react';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { WikiData } from '../../__generated__/graphql';
import { wikiDataToStringWithId } from '../../utils/wikiDataFunctions';

interface MediumLoaderData {
  params: { mediumId: string };
}

export const mediumLoader: LoaderFunction<MediumLoaderData> = (context) => {
  return { mediumId: { __typename: 'WikiDataResource', id: context.params.mediumId, label: '' } };
};

export interface DetailPageProps {
  mediumId: WikiData;
}
export const DetailPage: React.FC = () => {
  const mediumProps = useLoaderData();
  console.log(mediumProps);

  return <p>DetailPage: {wikiDataToStringWithId(mediumProps.mediumId)}</p>;
};
