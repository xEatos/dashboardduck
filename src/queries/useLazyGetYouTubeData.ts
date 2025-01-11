import { gql } from '../__generated__';

export const LAZY_GET_YOUTUBE_DATA = gql(`
  query GetYouTubeVideosData($key: String!, $watchIds: [ID!]) {
  getYouTubeVideosData(key: $key, watchIds: $watchIds) {
    id
    type
    title
    publication
    channel
    thumbnail
    duration
  }
}
  `);
