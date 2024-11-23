import { Duration, LocalDate } from "@js-joda/core";
import { ValueType, WikiData, WikiDataLiteral, WikiDataResource } from "../__generated__/graphql";
import { ISO639 } from "../utils/iso639";

export const mapWikiDataToValue = (
  wikiData: WikiData,
): string | number | LocalDate | Duration | ISO639 => {
  if (wikiData.__typename === 'WikiDataResource') {
    return wikiData.label;
  } else {
    const wikiLiteral = wikiData as WikiDataLiteral;
    switch (wikiLiteral.type) {
      case ValueType.String:
        return wikiLiteral.value;
      case ValueType.Date:
        return LocalDate.parse(wikiLiteral.value);
      case ValueType.Number:
        return Number(wikiLiteral.value);
      case ValueType.Duration:
        return Duration.parse(wikiLiteral.value);
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
const isDuration = (value: unknown): value is Duration =>
  value instanceof Duration;
const isDate = (value: unknown): value is LocalDate =>
  value instanceof LocalDate;


const compare = (equal: boolean, negative: boolean): 1 | 0 | -1 => {
  if (equal) {
    return 0;
  } else if (negative) {
    return -1;
  } else {
    return 1;
  }
}

const compareResource = (a: WikiDataResource, b: WikiDataResource): 1 | 0 | -1 => {
  const res1 = a.label.localeCompare(b.label);
  if (res1 === 0) {
    const res2 = a.id.localeCompare(b.id);
    return compare(res2 === 0, res2 < 0)
  } else if (res1 < 0) {
    return -1;
  } else {
    return 1;
  }
};

const compareLiteral = (a: WikiDataLiteral, b: WikiDataLiteral): 1 | 0 | -1 => {
  const valueA = mapWikiDataToValue(a);
    const valueB = mapWikiDataToValue(b)
    if(isString(valueA) && isString(valueB)){
      return compareString(valueA, valueB)
    } else if(isNumber(valueA) && isNumber(valueB)){
      return compareNumber(valueA, valueB)
    } else if(isISO639(valueA) && isISO639(valueB)){
      return compareISO639(valueA, valueB)
    } else if(isDuration(valueA) && isDuration(valueB)){
      return compareDuration(valueA, valueB)
    } else if(isDate(valueA) && isDate(valueB)){
      return compareDate(valueA, valueB)
    } else {
      return compareString(a.value, b.value)
    }
}

const compareString = (a: string, b: string): 1 | 0 | -1 => {
  const res = a.localeCompare(b);
  return compare(res === 0, res < 0)
};

const compareDate = (a: LocalDate, b: LocalDate): 1 | 0 | -1 => compare(a.equals(b), a.isAfter(b));

const compareNumber = (a: Number, b: Number): 1 | 0 | -1 => compare(a === b, a < b);

const compareISO639 = (a: ISO639, b: ISO639) => compareString(a.id, b.id);

const compareDuration = (a: Duration, b: Duration) =>
  compareNumber(a.seconds(), b.seconds());

export const compareWikiData = (a: WikiData, b: WikiData): 1 | 0 | -1 => {
  if (
    a.__typename === b.__typename &&
    a.__typename === 'WikiDataResource' &&
    b.__typename === 'WikiDataResource'
  ) {
    return compareResource(a, b);
  }
  else if (
    a.__typename === b.__typename &&
    a.__typename === 'WikiDataLiteral' &&
    b.__typename === 'WikiDataLiteral'
  ) {
    return compareLiteral(a, b)
  } else {
    if(a.__typename === 'WikiDataLiteral' &&
      b.__typename === 'WikiDataResource') {
        return compareString(a.value, b.label)
      } else {
        return compareString((a as WikiDataResource).label, (b as WikiDataLiteral).value)
      }
  }
};

export const isSame = (a: WikiData, b: WikiData): boolean => {
  const res = (compareWikiData(a, b) === 0)
  return res;
}

export const wikiDataToString = (wikiData: WikiData): string => {
  if(wikiData.__typename === "WikiDataResource"){
    return wikiData.label;
  } else {
    return mapWikiDataToValue(wikiData as WikiDataLiteral).toString()
  }
}

export const wikiDataToStringWithId = (wikiData: WikiData): string => {
  if(wikiData.__typename === "WikiDataResource"){
    return `${wikiData.label} - (${wikiData.id})`;
  } else {
    return mapWikiDataToValue(wikiData as WikiDataLiteral).toString()
  }
}