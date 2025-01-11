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

export type AuthenticationAnswer = {
  __typename?: 'AuthenticationAnswer';
  id: Scalars['ID']['output'];
  status: AuthenticationStatus;
};

export type AuthenticationConsumerLink = {
  __typename?: 'AuthenticationConsumerLink';
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
};

export enum AuthenticationStatus {
  Authenticated = 'AUTHENTICATED',
  Pending = 'PENDING',
  Unauthenticated = 'UNAUTHENTICATED'
}

export type Caption = {
  __typename?: 'Caption';
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
};

export type FilterOption = {
  __typename?: 'FilterOption';
  /** e.g. minDate, language (unique) -> rename to filterID: String!, then use Label as actual */
  filterId: Scalars['String']['output'];
  /** e.g. Datepicker, Slider, FreeSolo, LabelSearch, Radio */
  filterType: Scalars['String']['output'];
  /** group to associate this filter */
  group?: Maybe<Scalars['String']['output']>;
  /** label that should be used for the input widget */
  label: Scalars['String']['output'];
  /** e.g. for language: en, de. for Datepicker: interval [date A, date B] */
  options: Array<WikiData>;
};

export type FilterSelectionInput = {
  /** e.g. minDate, language */
  filterId: Scalars['String']['input'];
  /** selected literal values, e.g. minDate: 2024-01-01 */
  literals?: InputMaybe<Array<WikiDataLiteralInput>>;
  /** selected resources e.g. Q6 */
  resources?: InputMaybe<Array<WikiDataResourceInput>>;
};

export type HasConsumerAnswer = NoConsumerRegistered | UserConsumer;

export type HasYouTubeKeyAnswer = NoYouTubeKeyRegistered | UserYouTubeKey;

export type LeanMedium = {
  __typename?: 'LeanMedium';
  channel?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  publication?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<MediumType>;
};

export type Medium = {
  __typename?: 'Medium';
  caption?: Maybe<Caption>;
  categories: Array<WikiData>;
  channel?: Maybe<WikiData>;
  duration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  languages?: Maybe<Array<Scalars['String']['output']>>;
  publication?: Maybe<Scalars['String']['output']>;
  subtitleLanguages?: Maybe<Array<Scalars['String']['output']>>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  transcripts?: Maybe<Array<Transcript>>;
  type?: Maybe<MediumType>;
};

export type MediumConnection = {
  __typename?: 'MediumConnection';
  edges?: Maybe<Array<MediumEdge>>;
  pageInfo: PageInfo;
};

export type MediumEdge = {
  __typename?: 'MediumEdge';
  cursor: Scalars['String']['output'];
  node: LeanMedium;
};

/**
 * Note: everything is optional, if medium is from Youtube we fetch data ourself.
 * Otherwise we return an error if provide optional data is missing.
 */
export type MediumInput = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  language?: InputMaybe<Array<Scalars['String']['input']>>;
  publicationDate?: InputMaybe<Scalars['String']['input']>;
  references: Array<MediumReferenceInput>;
  subtitleLanguage?: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  transcript?: InputMaybe<Array<MediumTranscriptInput>>;
  type: MediumType;
};

export type MediumReferenceInput = {
  hostedBy?: InputMaybe<Scalars['String']['input']>;
  publishedBy?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export type MediumTranscriptInput = {
  chapters?: InputMaybe<Array<TranscriptChaptersInput>>;
  language: Scalars['String']['input'];
};

export enum MediumType {
  Podcast = 'Podcast',
  Video = 'Video'
}

export type Mutation = {
  __typename?: 'Mutation';
  addMedia?: Maybe<MediumConnection>;
  createOrUpdateConsumer: UserConsumer;
  createOrUpdateYoutubeKey: UserYouTubeKey;
  createUser: User;
  startWlpVideosImport: UploadAnswer;
  verifyUploadWlpVideosToWiki: AuthenticationConsumerLink;
};


export type MutationAddMediaArgs = {
  media: Array<MediumInput>;
};


export type MutationCreateOrUpdateConsumerArgs = {
  consumerInput: UserConsumerInput;
};


export type MutationCreateOrUpdateYoutubeKeyArgs = {
  keyInput: UserYouTubeInput;
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
};


export type MutationStartWlpVideosImportArgs = {
  userId: Scalars['String']['input'];
};


export type MutationVerifyUploadWlpVideosToWikiArgs = {
  wlpImport: WlpImportInput;
};

export type NoConsumerRegistered = {
  __typename?: 'NoConsumerRegistered';
  id: Scalars['ID']['output'];
};

export type NoYouTubeKeyRegistered = {
  __typename?: 'NoYouTubeKeyRegistered';
  id: Scalars['ID']['output'];
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
  getAuthenticationLink: AuthenticationConsumerLink;
  getConsumerToken: HasConsumerAnswer;
  getUploadStatus: UploadAnswer;
  getUser: User;
  getYouTubeVideosData?: Maybe<Array<LeanMedium>>;
  getYoutubeKey: HasYouTubeKeyAnswer;
  isAuthenticated: AuthenticationAnswer;
  mediaConnections?: Maybe<MediumConnection>;
  medium?: Maybe<Medium>;
  transcriptChapters?: Maybe<Array<TranscriptText>>;
};


export type QueryGetAuthenticationLinkArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetConsumerTokenArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetUploadStatusArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  email: Scalars['String']['input'];
};


export type QueryGetYouTubeVideosDataArgs = {
  key: Scalars['String']['input'];
  watchIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryGetYoutubeKeyArgs = {
  userId: Scalars['String']['input'];
};


export type QueryIsAuthenticatedArgs = {
  userId: Scalars['String']['input'];
};


export type QueryMediaConnectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Array<FilterSelectionInput>>;
  first: Scalars['Int']['input'];
};


export type QueryMediumArgs = {
  mediumId: Scalars['ID']['input'];
};


export type QueryTranscriptChaptersArgs = {
  transcriptIds: Array<Scalars['ID']['input']>;
};

export type Transcript = {
  __typename?: 'Transcript';
  chapters?: Maybe<Array<TranscriptChapter>>;
  language: Scalars['String']['output'];
};

export type TranscriptChapter = {
  __typename?: 'TranscriptChapter';
  endTimestamp?: Maybe<Scalars['Int']['output']>;
  heading?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  startTimestamp?: Maybe<Scalars['Int']['output']>;
};

export type TranscriptChaptersInput = {
  endTimestamp: Scalars['Int']['input'];
  heading: Scalars['String']['input'];
  startTimestamp: Scalars['Int']['input'];
  text: Scalars['String']['input'];
};

export type TranscriptId = {
  id: Scalars['ID']['input'];
};

export type TranscriptText = {
  __typename?: 'TranscriptText';
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
};

export type UploadAnswer = {
  __typename?: 'UploadAnswer';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type UserConsumer = {
  __typename?: 'UserConsumer';
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  secret: Scalars['String']['output'];
};

export type UserConsumerInput = {
  id: Scalars['String']['input'];
  key: Scalars['String']['input'];
  secret: Scalars['String']['input'];
};

export type UserYouTubeInput = {
  id: Scalars['ID']['input'];
  youTubeKey: Scalars['String']['input'];
};

export type UserYouTubeKey = {
  __typename?: 'UserYouTubeKey';
  id: Scalars['ID']['output'];
  youTubeKey: Scalars['String']['output'];
};

export enum ValueType {
  Boolean = 'Boolean',
  Date = 'Date',
  Duration = 'Duration',
  Iso639 = 'ISO639',
  Number = 'Number',
  String = 'String'
}

export type WlpImportInput = {
  userId: Scalars['ID']['input'];
  wlpVideos: Array<WlpVideoInput>;
};

export type WlpVideoInput = {
  categories: Array<Scalars['String']['input']>;
  watchId: Scalars['ID']['input'];
};

export type WikiData = WikiDataLiteral | WikiDataResource;

export type WikiDataLiteral = {
  __typename?: 'WikiDataLiteral';
  /** language tag (ISO639) of the Literal if it is a text */
  lang?: Maybe<Scalars['String']['output']>;
  /** Datatype of the value */
  type: ValueType;
  /** " Text that represents the actual value */
  value: Scalars['String']['output'];
};

export type WikiDataLiteralInput = {
  /** language tag (ISO639) of the Literal if it is a text */
  lang?: InputMaybe<Scalars['String']['input']>;
  /** Datatype of the value */
  type: ValueType;
  /** " Text that represents the actual value */
  value: Scalars['String']['input'];
};

export type WikiDataResource = {
  __typename?: 'WikiDataResource';
  /** " IRI with Q or P-Number */
  id: Scalars['ID']['output'];
  /** label of the Q or P-Number */
  label: Scalars['String']['output'];
};

export type WikiDataResourceInput = {
  /** " IRI with Q or P-Number */
  id: Scalars['ID']['input'];
  /** label of the Q or P-Number */
  label: Scalars['String']['input'];
};

export type CreateOrUpdateConsumerMutationVariables = Exact<{
  consumerInput: UserConsumerInput;
}>;


export type CreateOrUpdateConsumerMutation = { __typename?: 'Mutation', createOrUpdateConsumer: { __typename?: 'UserConsumer', id: string, key: string, secret: string } };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', email: string, id: string } };

export type SetYouTubeKeyMutationVariables = Exact<{
  keyInput: UserYouTubeInput;
}>;


export type SetYouTubeKeyMutation = { __typename?: 'Mutation', createOrUpdateYoutubeKey: { __typename?: 'UserYouTubeKey', id: string, youTubeKey: string } };

export type VerifyUploadMutationVariables = Exact<{
  wlpImport: WlpImportInput;
}>;


export type VerifyUploadMutation = { __typename?: 'Mutation', verifyUploadWlpVideosToWiki: { __typename?: 'AuthenticationConsumerLink', id: string, url: string } };

export type MediaQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Array<FilterSelectionInput> | FilterSelectionInput>;
}>;


export type MediaQuery = { __typename?: 'Query', mediaConnections?: { __typename?: 'MediumConnection', edges?: Array<{ __typename?: 'MediumEdge', cursor: string, node: { __typename?: 'LeanMedium', id: string, title?: string | null, thumbnail?: string | null, publication?: string | null, duration?: number | null, channel?: string | null } }> | null } | null };

export type FilterOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type FilterOptionsQuery = { __typename?: 'Query', filterOptions: Array<{ __typename?: 'FilterOption', filterId: string, filterType: string, label: string, group?: string | null, options: Array<{ __typename: 'WikiDataLiteral', lang?: string | null, type: ValueType, value: string } | { __typename: 'WikiDataResource', id: string, label: string }> }> };

export type SingleMediumQueryVariables = Exact<{
  mediumId: Scalars['ID']['input'];
}>;


export type SingleMediumQuery = { __typename?: 'Query', medium?: { __typename?: 'Medium', id: string, type?: MediumType | null, title?: string | null, publication?: string | null, languages?: Array<string> | null, thumbnail?: string | null, subtitleLanguages?: Array<string> | null, duration?: number | null, channel?: { __typename?: 'WikiDataLiteral', value: string, type: ValueType, lang?: string | null } | { __typename?: 'WikiDataResource', id: string, label: string } | null, categories: Array<{ __typename?: 'WikiDataLiteral', value: string, type: ValueType, lang?: string | null } | { __typename?: 'WikiDataResource', id: string, label: string }>, transcripts?: Array<{ __typename?: 'Transcript', language: string, chapters?: Array<{ __typename?: 'TranscriptChapter', id?: string | null, heading?: string | null, startTimestamp?: number | null, endTimestamp?: number | null }> | null }> | null, caption?: { __typename?: 'Caption', id: string, text: string } | null } | null };

export type TranscriptChaptersQueryVariables = Exact<{
  transcriptIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type TranscriptChaptersQuery = { __typename?: 'Query', transcriptChapters?: Array<{ __typename?: 'TranscriptText', id: string, text: string }> | null };

export type GetUploadStatusQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetUploadStatusQuery = { __typename?: 'Query', getUploadStatus: { __typename?: 'UploadAnswer', id: string, message: string } };

export type GetYoutubeKeyQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetYoutubeKeyQuery = { __typename?: 'Query', getYoutubeKey: { __typename?: 'NoYouTubeKeyRegistered', id: string } | { __typename?: 'UserYouTubeKey', id: string, youTubeKey: string } };

export type GetUserQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', email: string, id: string } };

export type GetYouTubeVideosDataQueryVariables = Exact<{
  key: Scalars['String']['input'];
  watchIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type GetYouTubeVideosDataQuery = { __typename?: 'Query', getYouTubeVideosData?: Array<{ __typename?: 'LeanMedium', id: string, type?: MediumType | null, title?: string | null, publication?: string | null, channel?: string | null, thumbnail?: string | null, duration?: number | null }> | null };

export type UserConsumerQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type UserConsumerQuery = { __typename?: 'Query', getConsumerToken: { __typename?: 'NoConsumerRegistered', id: string } | { __typename?: 'UserConsumer', id: string, key: string, secret: string } };

export type IsAuthenticatedQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type IsAuthenticatedQuery = { __typename?: 'Query', isAuthenticated: { __typename?: 'AuthenticationAnswer', id: string, status: AuthenticationStatus } };


export const CreateOrUpdateConsumerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrUpdateConsumer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"consumerInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserConsumerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrUpdateConsumer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"consumerInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"consumerInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"secret"}}]}}]}}]} as unknown as DocumentNode<CreateOrUpdateConsumerMutation, CreateOrUpdateConsumerMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const SetYouTubeKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetYouTubeKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"keyInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserYouTubeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrUpdateYoutubeKey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"keyInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"keyInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"youTubeKey"}}]}}]}}]} as unknown as DocumentNode<SetYouTubeKeyMutation, SetYouTubeKeyMutationVariables>;
export const VerifyUploadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"verifyUpload"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"wlpImport"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WLPImportInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyUploadWlpVideosToWiki"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"wlpImport"},"value":{"kind":"Variable","name":{"kind":"Name","value":"wlpImport"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<VerifyUploadMutation, VerifyUploadMutationVariables>;
export const MediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Media"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterSelectionInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mediaConnections"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"publication"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"channel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}}]}}]}}]} as unknown as DocumentNode<MediaQuery, MediaQueryVariables>;
export const FilterOptionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FilterOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filterOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filterId"}},{"kind":"Field","name":{"kind":"Name","value":"filterType"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"group"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WikiDataResource"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WikiDataLiteral"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FilterOptionsQuery, FilterOptionsQueryVariables>;
export const SingleMediumDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SingleMedium"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mediumId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mediumId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mediumId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"publication"}},{"kind":"Field","name":{"kind":"Name","value":"languages"}},{"kind":"Field","name":{"kind":"Name","value":"channel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WikiDataResource"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WikiDataLiteral"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WikiDataResource"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WikiDataLiteral"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"subtitleLanguages"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"transcripts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chapters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"startTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"endTimestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"language"}}]}},{"kind":"Field","name":{"kind":"Name","value":"caption"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}}]} as unknown as DocumentNode<SingleMediumQuery, SingleMediumQueryVariables>;
export const TranscriptChaptersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TranscriptChapters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transcriptIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transcriptChapters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"transcriptIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transcriptIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]} as unknown as DocumentNode<TranscriptChaptersQuery, TranscriptChaptersQueryVariables>;
export const GetUploadStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUploadStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUploadStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<GetUploadStatusQuery, GetUploadStatusQueryVariables>;
export const GetYoutubeKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetYoutubeKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getYoutubeKey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserYouTubeKey"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"youTubeKey"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NoYouTubeKeyRegistered"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetYoutubeKeyQuery, GetYoutubeKeyQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetYouTubeVideosDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetYouTubeVideosData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"watchIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getYouTubeVideosData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}},{"kind":"Argument","name":{"kind":"Name","value":"watchIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"watchIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"publication"}},{"kind":"Field","name":{"kind":"Name","value":"channel"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}}]} as unknown as DocumentNode<GetYouTubeVideosDataQuery, GetYouTubeVideosDataQueryVariables>;
export const UserConsumerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserConsumer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getConsumerToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserConsumer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"secret"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NoConsumerRegistered"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UserConsumerQuery, UserConsumerQueryVariables>;
export const IsAuthenticatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsAuthenticated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isAuthenticated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>;