import React, { Fragment, ReactNode, useContext } from 'react';
import { FilterOption } from '../__generated__/graphql';
import { AccordionItem } from '../components/AccordionItem';
import { SearchQueryContext } from '../App';
import { filterToInputFactory } from './InputFactory';
import { WikiDataItem } from '../components/WikiDataItem';
import { isSame, mapToWikiData, wikiDataToStringWithId } from '../utils/wikiDataFunctions';
import { Chip } from '@mui/material';

export interface FilterGroupProps {
  header: ReactNode;
  filterOptions: FilterOption[];
}

export const FitlerGroup: React.FC<FilterGroupProps> = ({ header, filterOptions }) => {
  const query = useContext(SearchQueryContext);
  const selectedOptions = query.filterInputs;
  const filterIds = filterOptions.map((fopt) => fopt.filterId);

  return (
    <AccordionItem
      header={header}
      children={filterOptions.map((fopt) => (
        <Fragment key={fopt.filterId}>{filterToInputFactory(fopt)}</Fragment>
      ))}
      childrenWhenClosed={Object.entries(selectedOptions)
        .filter(([fId]) => filterIds.includes(fId))
        .flatMap(([filterId, selection]) => {
          return selection.map((wikidata) => ({ filterId, data: wikidata }));
        })
        .map(({ filterId, data }) => {
          return (
            <Chip
              key={wikiDataToStringWithId(data)}
              variant='outlined'
              label={<WikiDataItem {...data} />}
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

/* 
<Chip
  key={getOptionLabel(value)}
  variant='outlined'
  label={renderChip(value)}
  onDelete={() => {
    const newSelections = selectedOptions.filter((option) => option != value);
    const [resources, literals] = mapToWikiDataInput(newSelections);
    queryValues.updateFilter({
      filterId,
      literals,
      resources
    });
    //onChange?.(newSelections);
  }}
/>


Object.entries(selections)
        .filter(([fId]) => filterIds.includes(fId))
        .flatMap(([_, selection]) => [
          ...(selection.resources?.map(({ id, label }) => (
            <WikiDataItem __typename='WikiDataResource' id={id} label={label} />
          )) ?? []),
          ...(selection.literals?.map(({ value, type, lang }) => (
            <WikiDataItem __typename='WikiDataLiteral' value={value} type={type} lang={lang} />
          )) ?? [])
        ])

*/
