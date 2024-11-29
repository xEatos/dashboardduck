import React, { Fragment, ReactNode, useContext } from 'react';
import { FilterOption, WikiData } from '../__generated__/graphql';
import { AccordionItem } from '../components/AccordionItem';
import { SearchQueryContext } from '../App';
import { filterToInputFactory } from './InputFactory';
import { WikiDataItem } from '../components/WikiDataItem';
import {
  compare,
  compareWikiData,
  isSame,
  wikiDataToStringWithId
} from '../utils/wikiDataFunctions';
import { Chip, Typography } from '@mui/material';
import { existsMoreThanOnce } from '../utils/functions';

export interface FilterGroupProps {
  header: ReactNode;
  filterOptions: FilterOption[];
}

export const FitlerGroup: React.FC<FilterGroupProps> = ({ header, filterOptions }) => {
  const query = useContext(SearchQueryContext);
  const selectedOptions = query.filterInputs;
  const filterIds = filterOptions.map((fopt) => fopt.filterId);
  const selectionWithIds = Object.entries(selectedOptions)
    .filter(([fId]) => filterIds.includes(fId))
    .flatMap(([filterId, selection]) => {
      return selection.map((wikidata) => ({ filterId, data: wikidata }));
    });

  return (
    <AccordionItem
      header={header}
      children={filterOptions.map((fopt, index) => (
        <div
          key={fopt.filterId}
          style={{
            borderTop: index > 0 ? '1px solid grey' : undefined
          }}>
          {filterToInputFactory(fopt)}
        </div>
      ))}
      childrenWhenClosed={selectionWithIds.map(({ filterId, data }, index, ary) => {
        const dup = existsMoreThanOnce({ filterId, data }, ary, (a, b) => isSame(a.data, b.data));
        return (
          <WikiDataChip
            key={wikiDataToStringWithId(data) + filterId}
            wikiData={data}
            subLabel={dup ? filterId : undefined}
            height='48px'
            onDelete={() => {
              const newSelection = selectedOptions[filterId].filter(
                (otherData) => !isSame(data, otherData)
              );
              query.updateFilter(filterId, newSelection);
            }}
          />
        );
      })}
    />
  );
};

export interface WikiDataChipProps {
  wikiData: WikiData;
  subLabel?: string;
  onDelete?: () => void;
  height?: string;
}

export const WikiDataChip: React.FC<WikiDataChipProps> = ({
  wikiData,
  subLabel,
  height,
  onDelete
}) => {
  return (
    <Chip
      sx={{ height: height, padding: '2px 4px 2px 4' }}
      variant='outlined'
      label={
        subLabel ? (
          <span>
            <WikiDataItem {...wikiData} />
            {subLabel ? (
              <Typography variant='body2' sx={{ color: '#606060' }}>
                {subLabel}
              </Typography>
            ) : null}
          </span>
        ) : (
          <WikiDataItem {...wikiData} />
        )
      }
      {...(onDelete ? { onDelete: onDelete } : {})}
    />
  );
};
