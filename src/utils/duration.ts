import { compare as stdCompare } from './wikiDataFunctions';

const padNumber = (n: number): string => (n < 10 ? n.toString().padStart(2, '0') : n.toString());

export const convertDuration = (duration: number): string => {
  const totalSeconds = Math.ceil(duration);
  const seconds = totalSeconds % 60;
  const minutesInSeconds = (totalSeconds - seconds) % 3600;
  const minutes = minutesInSeconds / 60;
  const hoursInSeconds = totalSeconds - minutesInSeconds - seconds;
  const hours = hoursInSeconds / 3600;

  return hours > 0
    ? `${hours}:${padNumber(minutes)}:${padNumber(seconds)}`
    : `${minutes}:${padNumber(seconds)}`;
};

export class Duration {
  private seconds: number;

  private constructor(seconds: number) {
    this.seconds = seconds;
  }

  static of(value: number | string) {
    return new Duration(Math.ceil(Number(value)));
  }

  toString() {
    return convertDuration(this.seconds);
  }

  compare(other: Duration): -1 | 0 | 1 {
    return stdCompare(this.seconds === other.seconds, this.seconds < other.seconds);
  }

  static isDuration(value: unknown): value is Duration {
    return value instanceof Duration;
  }
}
