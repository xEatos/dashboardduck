import React from 'react';
import { Filter } from './filterModel';

export interface FilterPanelProps {
  filter: Filter<unknown>[]; // maybe use a filtermap? and lift the state from LabelSearchInput?
}

export const FilterPanel: React.FC<FilterPanelProps> = (props) => {
  // map filterModel to input widgets view,
  // may request new fetch based on filters
  // delay request
  // hook on change events -> cache local
  // aggregate filter state based on changed on the filters
  // reset

  return <></>;
};
