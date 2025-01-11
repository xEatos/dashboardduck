import { gql } from '../__generated__';

export const SET_YOUTUBE_KEY = gql(`mutation SetYouTubeKey($keyInput: UserYouTubeInput!) {
  createOrUpdateYoutubeKey(keyInput: $keyInput) {
    id
    youTubeKey
  }
}`);
