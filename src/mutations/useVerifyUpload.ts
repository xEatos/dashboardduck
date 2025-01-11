import { gql } from '../__generated__';

export const VERIFY_IMPORT = gql(`
  mutation verifyUpload($wlpImport: WLPImportInput!) {
  verifyUploadWlpVideosToWiki(wlpImport: $wlpImport) {
    id
    url
  }
}
  `);
