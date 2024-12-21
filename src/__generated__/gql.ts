/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query Media($first: Int!, $after: String, $filter: [FilterSelectionInput!],) {\n  mediaConnections(first: $first, after: $after, filter: $filter) {\n    edges {\n      node {\n        id\n        title\n        thumbnail\n        publication\n        duration\n        channel\n      }\n      cursor\n    }\n  }\n}\n": types.MediaDocument,
    "\n  query FilterOptions {\n  filterOptions {\n    filterId\n    filterType\n    label\n    group\n    options {\n      ... on WikiDataResource {\n        __typename\n        id\n        label\n      }\n      ... on WikiDataLiteral {\n        __typename\n        lang\n        type\n        value\n      }\n    }\n  }\n}\n": types.FilterOptionsDocument,
    "\n  query SingleMedium($mediumId: ID!) {\n  medium(mediumId: $mediumId) {\n    id\n    type\n    title\n    publication\n    languages\n    channel {\n      ... on WikiDataResource {\n        id\n        label\n      }\n      ... on WikiDataLiteral {\n        value\n        type\n        lang\n      }\n    }\n    thumbnail\n    categories {\n      ... on WikiDataResource {\n        id\n        label\n      }\n      ... on WikiDataLiteral {\n        value\n        type\n        lang\n      }\n    }\n    subtitleLanguages\n    duration\n    transcripts {\n      chapters {\n        id\n        heading\n        startTimestamp\n        endTimestamp\n      }\n      language\n    }\n    caption {\n      id\n      text\n    }\n  }\n}\n": types.SingleMediumDocument,
    "\n  query TranscriptChapters($transcriptIds: [ID!]!) {\n  transcriptChapters(transcriptIds: $transcriptIds) {\n    id\n    text\n  }\n}\n": types.TranscriptChaptersDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Media($first: Int!, $after: String, $filter: [FilterSelectionInput!],) {\n  mediaConnections(first: $first, after: $after, filter: $filter) {\n    edges {\n      node {\n        id\n        title\n        thumbnail\n        publication\n        duration\n        channel\n      }\n      cursor\n    }\n  }\n}\n"): (typeof documents)["\n  query Media($first: Int!, $after: String, $filter: [FilterSelectionInput!],) {\n  mediaConnections(first: $first, after: $after, filter: $filter) {\n    edges {\n      node {\n        id\n        title\n        thumbnail\n        publication\n        duration\n        channel\n      }\n      cursor\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FilterOptions {\n  filterOptions {\n    filterId\n    filterType\n    label\n    group\n    options {\n      ... on WikiDataResource {\n        __typename\n        id\n        label\n      }\n      ... on WikiDataLiteral {\n        __typename\n        lang\n        type\n        value\n      }\n    }\n  }\n}\n"): (typeof documents)["\n  query FilterOptions {\n  filterOptions {\n    filterId\n    filterType\n    label\n    group\n    options {\n      ... on WikiDataResource {\n        __typename\n        id\n        label\n      }\n      ... on WikiDataLiteral {\n        __typename\n        lang\n        type\n        value\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SingleMedium($mediumId: ID!) {\n  medium(mediumId: $mediumId) {\n    id\n    type\n    title\n    publication\n    languages\n    channel {\n      ... on WikiDataResource {\n        id\n        label\n      }\n      ... on WikiDataLiteral {\n        value\n        type\n        lang\n      }\n    }\n    thumbnail\n    categories {\n      ... on WikiDataResource {\n        id\n        label\n      }\n      ... on WikiDataLiteral {\n        value\n        type\n        lang\n      }\n    }\n    subtitleLanguages\n    duration\n    transcripts {\n      chapters {\n        id\n        heading\n        startTimestamp\n        endTimestamp\n      }\n      language\n    }\n    caption {\n      id\n      text\n    }\n  }\n}\n"): (typeof documents)["\n  query SingleMedium($mediumId: ID!) {\n  medium(mediumId: $mediumId) {\n    id\n    type\n    title\n    publication\n    languages\n    channel {\n      ... on WikiDataResource {\n        id\n        label\n      }\n      ... on WikiDataLiteral {\n        value\n        type\n        lang\n      }\n    }\n    thumbnail\n    categories {\n      ... on WikiDataResource {\n        id\n        label\n      }\n      ... on WikiDataLiteral {\n        value\n        type\n        lang\n      }\n    }\n    subtitleLanguages\n    duration\n    transcripts {\n      chapters {\n        id\n        heading\n        startTimestamp\n        endTimestamp\n      }\n      language\n    }\n    caption {\n      id\n      text\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TranscriptChapters($transcriptIds: [ID!]!) {\n  transcriptChapters(transcriptIds: $transcriptIds) {\n    id\n    text\n  }\n}\n"): (typeof documents)["\n  query TranscriptChapters($transcriptIds: [ID!]!) {\n  transcriptChapters(transcriptIds: $transcriptIds) {\n    id\n    text\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;