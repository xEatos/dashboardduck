import React from "react";

export const existsMoreThanOnce  = <T>(i: T, data: T[], compare: (a: T, b: T) => boolean): boolean => {
  let count = 0;
  for(const value of data){
    if(compare(value, i)){ ++count }
    if(count === 2){ return true }
  }
  return false
}

export const reactoNodeIsEmpty = (node: React.ReactNode): boolean => {
  return node === undefined || node === null || (Array.isArray(node) ? node.length === 0 : false)   
}