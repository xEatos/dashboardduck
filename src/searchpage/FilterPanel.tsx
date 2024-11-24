import React, { useState } from 'react';
import {
  FilterOption,
  FilterSelectionInput,
  WikiData,
  WikiDataLiteral,
} from '../__generated__/graphql';
import { LabelSearchInput } from '../components/LabelSearchInput';
import { Typography } from '@mui/material';
import {
  compare,
  compareWikiData,
  isSame,
  wikiDataToString,
  wikiDataToStringWithId,
} from './wikiDataFunctions';
import { clip } from '../utils/clipString';

export interface FilterPanelProps {
  filters: FilterOption[];
}

const WikiDataComponent: React.FC<WikiData> = (props) => {
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

const createLabelSearchInput = (filter: FilterOption): React.ReactNode => (
  <LabelSearchInput
    label={filter.label}
    options={filter.options}
    isOptionEqualToValue={isSame}
    getOptionLabel={(option) => wikiDataToStringWithId(option)}
    renderOption={(option) => <WikiDataComponent {...option} />}
    renderChip={(option) => <WikiDataComponent {...option} />}
    sortOption={(a, b) => {
      const r = compareWikiData(a, b);
      return compare(r === 0, r === 1);
    }}
  />
);

export const FilterToInputFactory = (filter: FilterOption): React.ReactNode => {
  switch (filter.filterType) {
    case 'LabelSearchInput':
      return createLabelSearchInput(filter);
    default:
      return null;
  }
};

export const FilterPanel: React.FC<FilterPanelProps> = (props) => {
  const [filterSelections, setFilterSelection] = useState<
    FilterSelectionInput[]
  >([]);

  /* 
  useEffect(() => {
    // refetch 
  })
  */

  const updateFilter = (selected: FilterSelectionInput) => {
    setFilterSelection(
      filterSelections.map((selection) =>
        selected.filterId === selection.filterId ? selected : selection,
      ),
    );
  };

  return <></>;
};
