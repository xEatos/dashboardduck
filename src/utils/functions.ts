import React from 'react';

export const existsMoreThanOnce = <T>(
  i: T,
  data: T[],
  compare: (a: T, b: T) => boolean
): boolean => {
  let count = 0;
  for (const value of data) {
    if (compare(value, i)) {
      ++count;
    }
    if (count === 2) {
      return true;
    }
  }
  return false;
};

export const reactoNodeIsEmpty = (node: React.ReactNode): boolean => {
  return node === undefined || node === null || (Array.isArray(node) ? node.length === 0 : false);
};

export const splitAtNth = (
  str: string,
  sequence: string,
  matchIndex: number
): [left: string, right: string] => {
  const stepLength = sequence.length;
  if (stepLength === 0 || str.length === 0) {
    return [str, ''];
  }
  let matchCount = 0;
  let index = 0;
  while (str.length > index) {
    if (str.slice(index, index + stepLength) === sequence) {
      matchCount++;
    }
    if (matchCount === matchIndex + 1) {
      return [str.slice(0, index), str.slice(index + sequence.length)];
    }
    index++;
  }
  return [str, ''];
};

export const splitAtLast = (str: string, sequence: string): [left: string, right: string] => {
  const stepLength = sequence.length;
  if (stepLength === 0 || str.length === 0) {
    return [str, ''];
  }
  let latestMatchedIndex = 0;
  let index = 0;
  while (str.length > index) {
    if (str.slice(index, index + stepLength) === sequence) {
      latestMatchedIndex = index;
    }
    index++;
  }
  return [str.slice(0, latestMatchedIndex), str.slice(latestMatchedIndex + sequence.length)];
};

interface ListLike<T> {
  [index: number]: T;
  readonly length: number;
}

export const convertDownLevelIteration = <T>(list: ListLike<T>): Array<T> => {
  const array = new Array<T>(list.length);
  for (let i = 0; i < list.length; ++i) {
    array[i] = list[i];
  }
  return array;
};

export const union = <T>(
  setA: Array<T>,
  setB: Array<T>,
  equals?: (a: T, b: T) => Boolean
): Array<T> => {
  const eq = equals ?? ((a: T, b: T) => a === b);
  return setA.filter((a) => !setB.find((b) => eq(a, b))).concat(setB);
};
