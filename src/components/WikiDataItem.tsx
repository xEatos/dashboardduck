import { Typography } from '@mui/material';
import { WikiData } from '../__generated__/graphql';
import { wikiDataToString } from '../searchpage/wikiDataFunctions';
import { clip } from '../utils/clipString';

export const WikiDataItem: React.FC<WikiData> = (props) => {
  if (props.__typename === 'WikiDataResource') {
    return (
      <span>
        <Typography
          component={'span'}
          variant='body1'
          sx={{ paddingRight: 0.5 }}
        >
          {clip(props.label, '…', 30)}
        </Typography>
        <Typography
          component={'span'}
          variant='body2'
          sx={{ color: '#606060' }}
        >
          ({props.id.split('/').pop()})
        </Typography>
      </span>
    );
  } else {
    return <Typography>{wikiDataToString(props)}</Typography>;
  }
};
