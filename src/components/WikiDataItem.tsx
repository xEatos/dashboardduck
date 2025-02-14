import { Typography } from '@mui/material';
import { ValueType, WikiData } from '../__generated__/graphql';
import { wikiDataToString } from '../utils/wikiDataFunctions';
import { clip } from '../utils/clipString';
import { ISO639 } from '../utils/iso639';

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
  } else if (props.__typename === 'WikiDataLiteral' && props.type === ValueType.Iso639) {
    return <Typography>{ISO639.idToLanguage(props.value)}</Typography>;
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
