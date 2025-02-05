import { Typography } from '@mui/material';
import { WikiData } from '../__generated__/graphql';
import { wikiDataToString } from '../utils/wikiDataFunctions';
import { clip } from '../utils/clipString';

export const BaseWikiDataItem: React.FC<WikiData> = (props) => {
  if (props.__typename === 'WikiDataResource') {
    return (
      <span>
        <Typography component={'span'} variant='body1' sx={{ paddingRight: 0.5 }}>
          {props.label}
        </Typography>
        <Typography component={'span'} variant='body2' sx={{ color: '#606060' }}>
          ({props.id.split('/').pop()})
        </Typography>
      </span>
    );
  } else {
    return <Typography>{wikiDataToString(props)}</Typography>;
  }
};

export const WikiDataItemWitoutClip: React.FC<WikiData> = BaseWikiDataItem;

export const WikiDataItem: React.FC<WikiData> = (props) =>
  props.__typename === 'WikiDataResource' ? (
    <BaseWikiDataItem {...{ ...props, label: clip(props.label, '…', 30) }} />
  ) : (
    <BaseWikiDataItem {...props} />
  );
