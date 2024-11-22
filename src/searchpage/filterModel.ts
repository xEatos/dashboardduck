import { FixedMap } from '../utils/fixedMap';

export type WikiDataResource = {
  iri: URL; // Q or P Number
  label: string; // label of the Q or P Number
};

export type WikiDataLiteral = {
  iri: URL; // e.g. iri="xsd:integer"
  value: string; // "42"
};

export interface WikiData {
  iri: URL;
  label?: string;
  value?: string;
}

interface Filter<T> {
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

type Option<T> = {
  value: T;
  isSelected: boolean;
};


class FilterOptSingleSelect<T> implements Filter<T> {
  label;
  options;
  mapValue;
  selectType;
  evaluate;

  currentSelected?: T = undefined;

  private constructor(
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

  static of<T>(
    label: string,
    values: T[],
    mapValue = (value: T) => `${value}`,
    evaluate = (_: Filter<T>) => true,
  ): Filter<T> {
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

//class FilterOptMultiSelect<T> implements Filter<T> {}

//class FilterRangeSelect<T> implements Filter<T> {}
