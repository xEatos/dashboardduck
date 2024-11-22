import { FixedMap } from '../utils/fixedMap';

// unhappy with this model
// TODOs:
// label of a Filer should be a Generic to use is with e.g. WikiData
// Filter should be immutable
// hard to support local date
//    e.g. use of datepicker instead of some sort of slider 
// does not include how the data should be represented in the input widget 
//    e.g. duration P13M7S -> 13min 7sec or 13:07
// some sort of FilterResult obejct that is create by filter if something changes
// to easier process for request calls

export interface Filter<T> {
  label: string;
  options: FixedMap<string, Option<T>>;
  mapValue: (value: T) => string;
  selectType: 'single' | 'multi' | 'range';
  evaluate: (
    filter: Filter<T>,
  ) => { hasConflict: boolean; reason?: string } | boolean;
  select(values: T[]): void;
  unselect(values: T[]): void;
}

export type Option<T> = {
  value: T;
  isSelected: boolean;
};

export class FilterModel<T> implements Filter<T> {
  label;
  options;
  mapValue;
  selectType;
  evaluate;

  constructor(
    label: string,
    options: FixedMap<string, Option<T>>,
    mapValue: (value: T) => string,
    selectType: 'single' | 'multi' | 'range',
    evaluate: (
      filter: Filter<T>,
    ) => { hasConflict: boolean; reason?: string } | boolean,
  ) {
    this.label = label;
    this.options = options;
    this.selectType = selectType;
    this.mapValue = mapValue;
    this.evaluate = evaluate;
  }

  select(_: T[]): void {}

  unselect(_: T[]): void {}

}

export class FilterOptSingleSelect<T> extends FilterModel<T> implements Filter<T> {
  currentSelected?: T = undefined;

  static of<T>(
    label: string,
    values: T[],
    mapValue = (value: T) => `${value}`,
    evaluate = (_: Filter<T>) => true,
  ): FilterOptSingleSelect<T> {
    const a = FixedMap.of<string, Option<T>>().setBatch(
      values.map((value) => [mapValue(value), { value, isSelected: false }]),
    );
    return new FilterOptSingleSelect(label, a, mapValue, 'single', evaluate);
  }

  select(values: T[]) {
    if(values.length === 1){
      const value = values[0]
      this.unselect(values);
      this.options.set(this.mapValue(value), { value, isSelected: true });
      this.currentSelected = value;
    }
  }

  unselect(_: T[]) {
    if (this.currentSelected) {
      this.options.set(this.mapValue(this.currentSelected), {
        value: this.currentSelected,
        isSelected: false,
      });
    }
    this.currentSelected = undefined;
    
  }
}

export class FilterSingleSelect<T> extends FilterModel<T> implements Filter<T> {
  currentSelected: T;

  constructor(
    label: string,
    values: FixedMap<string, Option<T>>,
    initSelect: T,
    mapValue = (value: T) => `${value}`,
    evaluate = (_: Filter<T>) => true,){
      super(label, values, mapValue, 'single', evaluate)
      this.currentSelected = initSelect
    }

  static of<T>(
    label: string,
    values: T[],
    initSelect: T,
    mapValue = (value: T) => `${value}`,
    evaluate = (_: Filter<T>) => true,
  ): FilterSingleSelect<T> {
    const a = FixedMap.of<string, Option<T>>().setBatch(
      values.map((value) => [mapValue(value), { value, isSelected: false }]),
    );
    return new FilterSingleSelect(label, a, initSelect, mapValue, evaluate);
  }

  select(values: T[]) {
    if(values.length === 1){
      const value = values[0]
      this.options.set(this.mapValue(this.currentSelected), {
        value: this.currentSelected,
        isSelected: false,
      });
      this.options.set(this.mapValue(value), { value, isSelected: true });
      this.currentSelected = value;
    }
  }

  unselect(_: T[]) {}
}


export class FilterOptMultiSelect<T> extends FilterModel<T> implements Filter<T> {

  static of<T>(
    label: string,
    values: T[],
    mapValue = (value: T) => `${value}`,
    evaluate = (_: Filter<T>) => true,
  ): FilterOptMultiSelect<T> {
    const a = FixedMap.of<string, Option<T>>().setBatch(
      values.map((value) => [mapValue(value), { value, isSelected: false }]),
    );
    return new FilterOptMultiSelect(label, a, mapValue, 'single', evaluate);
  }

  select(values: T[]) {
    this.options.setBatch(values.map((value) => [this.mapValue(value), {value, isSelected: true}]))
  }

  unselect(values: T[]) {
    this.options.setBatch(values.map((value) => [this.mapValue(value), {value, isSelected: false}]))
  }

}

export class FilterRangeSelect<T> extends FilterModel<T> implements Filter<T> {
  // options repesent the interval of the range
  start?: T
  inclusiveEnd?: T

  static of<T>(
    label: string,
    start: T,
    inclusiveEnd: T,
    mapValue = (value: T) => `${value}`,
    evaluate = (_: Filter<T>) => true,
  ): FilterRangeSelect<T> {
    const a = FixedMap.of<string, Option<T>>().setBatch(
      [start, inclusiveEnd].map((value) => [mapValue(value), { value, isSelected: false }]),
    );
    return new FilterRangeSelect(label, a, mapValue, 'single', evaluate);
  }

  select(values: T[]) {
    if(values.length === 2){
      this.options.clear().setBatch(values.map((value) => [this.mapValue(value), {value, isSelected: true}]))
    }
  }

  unselect(_: T[]) {}
}
