/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type FilterOption = {
  __typename?: 'FilterOption';
  /**  e.g. minDate, language (unique) -> rename to filterID: String!, then use Label as actual */
  filterId: Scalars['String']['output'];
  /**  e.g. Datepicker, Slider, FreeSolo, LabelSearch, Radio  */
  filterType: Scalars['String']['output'];
  /** group to associate this filter */
  group?: Maybe<Scalars['String']['output']>;
  /** label that should be used for the input widget */
  label: Scalars['String']['output'];
  /**  e.g. for language: en, de. for Datepicker: interval [date A, date B]  */
  options: Array<WikiData>;
};

export type FilterSelectionInput = {
  /**  e.g. minDate, language  */
  filterId: Scalars['String']['input'];
  /**  selected literal values, e.g. minDate: 2024-01-01  */
  literals: Array<WikiDataLiteralInput>;
  /**  selected resources e.g. Q6  */
  resources: Array<WikiDataResourceInput>;
};

export type Medium = {
  __typename?: 'Medium';
  channel?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  publication?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type MediumConnection = {
  __typename?: 'MediumConnection';
  edges?: Maybe<Array<MediumEdge>>;
  pageInfo: PageInfo;
};

export type MediumEdge = {
  __typename?: 'MediumEdge';
  cursor: Scalars['String']['output'];
  node: Medium;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  filterOptions: Array<FilterOption>;
  mediaConnections?: Maybe<MediumConnection>;
};


export type QueryMediaConnectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};

export enum ValueType {
  Date = 'Date',
  Duration = 'Duration',
  Iso639 = 'ISO639',
  Number = 'Number',
  String = 'String'
}

export type WikiData = WikiDataLiteral | WikiDataResource;

export type WikiDataLiteral = {
  __typename?: 'WikiDataLiteral';
  /**  language tag (ISO639) of the Literal if it is a text  */
  lang?: Maybe<Scalars['String']['output']>;
  /**  Datatype of the value */
  type: ValueType;
  /** " Text that represents the actual value  */
  value: Scalars['String']['output'];
};

export type WikiDataLiteralInput = {
  /**  language tag (ISO639) of the Literal if it is a text  */
  lang?: InputMaybe<Scalars['String']['input']>;
  /**  Datatype of the value */
  type: ValueType;
  /** " Text that represents the actual value  */
  value: Scalars['String']['input'];
};

export type WikiDataResource = {
  __typename?: 'WikiDataResource';
  /** " IRI with Q or P-Number  */
  id: Scalars['ID']['output'];
  /**  label of the Q or P-Number  */
  label: Scalars['String']['output'];
};

export type WikiDataResourceInput = {
  /** " IRI with Q or P-Number  */
  id: Scalars['ID']['input'];
  /**  label of the Q or P-Number  */
  label: Scalars['String']['input'];
};

export type FilterOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type FilterOptionsQuery = { __typename?: 'Query', filterOptions: Array<{ __typename?: 'FilterOption', filterId: string, filterType: string, label: string, group?: string | null, options: Array<{ __typename: 'WikiDataLiteral', lang?: string | null, type: ValueType, value: string } | { __typename: 'WikiDataResource', id: string, label: string }> }> };

export type MediaQueryVariables = Exact<{
  first: Scalars['Int']['input'];
}>;


export type MediaQuery = { __typename?: 'Query', mediaConnections?: { __typename?: 'MediumConnection', edges?: Array<{ __typename?: 'MediumEdge', cursor: string, node: { __typename?: 'Medium', id: string, title?: string | null, thumbnail?: string | null, publication?: string | null, duration?: number | null, channel?: string | null } }> | null } | null };


export const FilterOptionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FilterOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filterOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filterId"}},{"kind":"Field","name":{"kind":"Name","value":"filterType"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"group"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WikiDataResource"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WikiDataLiteral"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FilterOptionsQuery, FilterOptionsQueryVariables>;
export const MediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Media"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mediaConnections"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"publication"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"channel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}}]}}]}}]} as unknown as DocumentNode<MediaQuery, MediaQueryVariables>;