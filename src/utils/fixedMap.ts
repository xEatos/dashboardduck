export class FixedMap<Key,Value>{
  private map = new Map<Key, Value>()

  static of<T,V>(): FixedMap<T,V> {
    return new FixedMap<T,V>(new Map<T,V>())
  }

  private constructor(map: Map<Key, Value>){
    this.map = map;
  }

  set(key: Key, value: Value): FixedMap<Key, Value>{
    this.map.set(key, value);
    return new FixedMap(this.map);
  }

  setBatch(batch: Iterable<[Key, Value]>): FixedMap<Key, Value> {
    for (let entry of batch) {
      this.map.set(entry[0], entry[1]);
    }
    return new FixedMap(this.map)
  }

  get(key: Key): Value | undefined{
    return this.map.get(key)
  }

  mapToArray<R>(callback: (key: Key, value: Value, index: number) => R): Array<R> {
    let i=0
    const res = Array<R>(this.map.size);
    this.map.forEach((v, k) => {
      res[i] = callback(k, v, i);
      i++;
    })
    return res
  }

  mapValues<TValue>(callback: (key: Key, value: Value, index: number) => TValue): FixedMap<Key, TValue> {
    let i=0
    const nMap = new FixedMap<Key, TValue>(new Map());
    this.map.forEach((v, k) => {
      nMap.set(k, callback(k, v, i));
      i++;
    })
    return nMap
  }

  filter(callback: (key: Key, value: Value, index: number) => boolean): FixedMap<Key,Value> {
    let i=0
    const nMap = new Map<Key, Value>();
    this.map.forEach((v, k) => {
      if(callback(k, v, i)){ nMap.set(k, v);}
      i++;
    })
    return new FixedMap(nMap)
  }

  clear(): FixedMap<Key,Value> {
    this.map.clear()
    return new FixedMap(this.map)
  }

}