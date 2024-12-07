import { LocalDate } from '@js-joda/core';
import {
  FilterSelectionInput,
  ValueType,
  WikiData,
  WikiDataLiteral,
  WikiDataLiteralInput,
  WikiDataResource,
  WikiDataResourceInput
} from '../__generated__/graphql';
import { ISO639 } from './iso639';
import { splitAtLast, splitAtNth } from './functions';
import { Duration } from './duration';

export const mapWikiDataToValue = (
  wikiData: WikiData
): string | number | LocalDate | Duration | ISO639 => {
  if (wikiData.__typename === 'WikiDataResource') {
    return wikiData.label;
  } else {
    const wikiLiteral = wikiData as WikiDataLiteral;
    switch (wikiLiteral.type) {
      case ValueType.String:
        return wikiLiteral.value;
      case ValueType.Date:
        return LocalDate.parse(wikiLiteral.value.slice(0, 10));
      case ValueType.Number:
        return Number(wikiLiteral.value);
      case ValueType.Duration:
        return Duration.of(wikiLiteral.value);
      case ValueType.Iso639:
        return ISO639.of(wikiLiteral.value)!;
      default:
        return wikiLiteral.value;
    }
  }
};

const isString = (value: unknown): value is string => typeof value === 'string';
const isNumber = (value: unknown): value is number => typeof value === 'number';
const isISO639 = (value: unknown): value is ISO639 => value instanceof ISO639;
const isDate = (value: unknown): value is LocalDate => value instanceof LocalDate;

export const compare = (equal: boolean, negative: boolean): 1 | 0 | -1 => {
  if (equal) {
    return 0;
  } else if (negative) {
    return -1;
  } else {
    return 1;
  }
};

const compareResource = (a: WikiDataResource, b: WikiDataResource): 1 | 0 | -1 => {
  const res1 = a.label.localeCompare(b.label);
  if (res1 === 0) {
    const res2 = a.id.localeCompare(b.id);
    return compare(res2 === 0, res2 < 0);
  } else if (res1 < 0) {
    return -1;
  } else {
    return 1;
  }
};

const compareLiteral = (a: WikiDataLiteral, b: WikiDataLiteral): 1 | 0 | -1 => {
  const valueA = mapWikiDataToValue(a);
  const valueB = mapWikiDataToValue(b);
  if (isString(valueA) && isString(valueB)) {
    return compareString(valueA, valueB);
  } else if (isNumber(valueA) && isNumber(valueB)) {
    return compareNumber(valueA, valueB);
  } else if (isISO639(valueA) && isISO639(valueB)) {
    return compareISO639(valueA, valueB);
  } else if (Duration.isDuration(valueA) && Duration.isDuration(valueB)) {
    return compareDuration(valueA, valueB);
  } else if (isDate(valueA) && isDate(valueB)) {
    return compareDate(valueA, valueB);
  } else {
    return compareString(a.value, b.value);
  }
};

const compareString = (a: string, b: string): 1 | 0 | -1 => {
  const res = a.localeCompare(b);
  return compare(res === 0, res < 0);
};

const compareDate = (a: LocalDate, b: LocalDate): 1 | 0 | -1 => compare(a.equals(b), a.isAfter(b));

const compareNumber = (a: number, b: number): 1 | 0 | -1 => compare(a === b, a < b);

const compareISO639 = (a: ISO639, b: ISO639) => compareString(a.id, b.id);

// TODO make own class SecDuration then overwrite toString
const compareDuration = (a: Duration, b: Duration) => a.compare(b);

export const compareWikiData = (a: WikiData, b: WikiData): 1 | 0 | -1 => {
  if (
    a.__typename === b.__typename &&
    a.__typename === 'WikiDataResource' &&
    b.__typename === 'WikiDataResource'
  ) {
    return compareResource(a, b);
  } else if (
    a.__typename === b.__typename &&
    a.__typename === 'WikiDataLiteral' &&
    b.__typename === 'WikiDataLiteral'
  ) {
    return compareLiteral(a, b);
  } else {
    if (a.__typename === 'WikiDataLiteral' && b.__typename === 'WikiDataResource') {
      return compareString(a.value, b.label);
    } else {
      return compareString((a as WikiDataResource).label, (b as WikiDataLiteral).value);
    }
  }
};

export const isSame = (a: WikiData, b: WikiData): boolean => {
  const res = compareWikiData(a, b) === 0;
  return res;
};

export const isSameWithUndef = (a: WikiData | undefined, b: WikiData | undefined) => {
  if (a === undefined && b === undefined) {
    return true;
  } else if (a !== undefined && b !== undefined) {
    return isSame(a, b);
  }
  return false;
};

export const wikiDataToString = (wikiData: WikiData): string => {
  if (wikiData.__typename === 'WikiDataResource') {
    return wikiData.label;
  } else {
    return mapWikiDataToValue(wikiData as WikiDataLiteral).toString();
  }
};

export const wikiDataToStringWithId = (wikiData: WikiData): string => {
  if (wikiData.__typename === 'WikiDataResource') {
    return `${wikiData.label} - (${wikiData.id})`;
  } else {
    return mapWikiDataToValue(wikiData as WikiDataLiteral).toString();
  }
};

export const mapToWikiData = (selection: FilterSelectionInput): WikiData[] => {
  return [
    ...(selection.resources?.map(({ id, label }) => ({
      __typename: 'WikiDataResource',
      id,
      label
    })) ?? []),
    ...(selection.literals?.map(({ value, type, lang }) => ({
      __typename: 'WikiDataLiteral',
      value,
      type,
      lang
    })) ?? [])
  ] as WikiData[];
};

export const mapToWikiDataInput = (
  wikiDatas: WikiData[]
): [WikiDataResourceInput[], WikiDataLiteralInput[]] => {
  const resources: WikiDataResourceInput[] = [];
  const literals: WikiDataLiteralInput[] = [];
  wikiDatas.forEach((opt) => {
    switch (opt.__typename) {
      case 'WikiDataResource': {
        resources.push({ id: opt.id, label: opt.label });
        break;
      }
      case 'WikiDataLiteral': {
        literals.push({ value: opt.value, type: opt.type, lang: opt.lang });
        break;
      }
    }
  });
  return [resources, literals];
};

export const mapWikiDataToURLValue = (wikidata: WikiData): string | undefined => {
  switch (wikidata.__typename) {
    case 'WikiDataResource':
      return `${encodeURIComponent(wikidata.id)}^${encodeURIComponent(wikidata.label)}`;
    case 'WikiDataLiteral':
      return `"${encodeURIComponent(wikidata.value)}"^^${encodeURIComponent(wikidata.type)}`;
  }
};

const mapToValueType = (t: string): ValueType => {
  switch (t) {
    case 'Boolean':
      return ValueType.Boolean;
    case 'Date':
      return ValueType.Date;
    case 'Duration':
      return ValueType.Duration;
    case 'ISO639':
      return ValueType.Iso639;
    case 'Number':
      return ValueType.Boolean;
    default:
      return ValueType.String;
  }
};

export const mapURLValueToWikidata = (_value: string): WikiData => {
  const value = decodeURIComponent(_value);
  if (value.startsWith('"')) {
    const literalParts = splitAtLast(value, '^^');
    return {
      __typename: 'WikiDataLiteral',
      value: literalParts[0].slice(1, -1),
      type: mapToValueType(literalParts[1])
    };
  } else {
    const resourceParts = splitAtNth(value, '^', 0);
    return {
      __typename: 'WikiDataResource',
      id: resourceParts[0],
      label: resourceParts.slice(1).join('')
    };
  }
};

export const tryCastToWikiDataLiteral = (wikiData: WikiData): WikiDataLiteral | undefined => {
  if (wikiData.__typename === 'WikiDataLiteral') {
    return wikiData;
  } else {
    return undefined;
  }
};
