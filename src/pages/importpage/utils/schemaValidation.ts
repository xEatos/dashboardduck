import { LocalDate } from '@js-joda/core';
import { ISO639 } from '../../../utils/iso639';

export type JsonProperty = {
  label: string;
  children?: JsonProperty[];
  isRequired: boolean;
  isValidValue: (v: any) => any | ParseError;
};

export type PropertyConstraint = {
  propsToMatch: JsonProperty[];
  isValid: (values: any) => boolean | ParseError;
};

class ParseError {
  reason: string;

  constructor(reason: string) {
    this.reason = reason;
  }
}

const parseURL = (v: any): URL | ParseError => {
  try {
    return new URL(v);
  } catch (error: any) {
    return new ParseError(error.message);
  }
};

const parseMediumType = (v: any): 'Video' | 'Podcast' | ParseError => {
  if (typeof v === 'string') {
    switch (v) {
      case 'Video':
        return 'Video';
      case 'Podcast':
        return 'Podcast';
      default:
        return new ParseError("Value is not a 'Video' or 'Podcast'.");
    }
  } else {
    return new ParseError("Value is not a string and also not a 'Video' or 'Podcast'.");
  }
};

const parsePositiveNumbersWithZero = (v: any): number | ParseError => {
  const num = Number(v);
  if (!Number.isNaN(num) && num >= 0) {
    return num;
  } else {
    return new ParseError('Duration is either not a number or is smaller than 1 sec');
  }
};

const parsePositiveNumber = (v: any): number | ParseError => {
  const num = Number(v);
  if (!Number.isNaN(num) && num > 0) {
    return num;
  } else {
    return new ParseError('Duration is either not a number or is smaller than 1 sec');
  }
};

const parseISO639_1 = (v: any): ISO639 | ParseError => {
  if (typeof v === 'string') {
    const iso639 = ISO639.of(v);
    return iso639
      ? iso639
      : new ParseError(`String "${v}" is not a valid language codes from the ISO639 Set 1`);
  }
  return new ParseError(
    'Value is not a string and also not a valid language codes from the ISO639 Set 1'
  );
};

const parseISO8601 = (v: any): LocalDate | ParseError => {
  try {
    return LocalDate.parse(v);
  } catch (error) {
    return new ParseError('Value is not a Date in ISO8601 format');
  }
};

const parseString = (v: any): string | ParseError =>
  typeof v === 'string' ? v : new ParseError('Value is not a string');

// TODO cross validation
const validTimeStamps = (props: any): boolean | ParseError => {
  //we can assume here that the object only contains valid props
  if (props.startTimestamp && props.endTimestamp) {
    return props.startTimestamp < props.endTimestamp
      ? true
      : new ParseError('Start timestamp is after end timestamp');
  } else {
    return new ParseError('timestamps is not valid');
  }
};

const parseObject = (v: any): Object | ParseError =>
  typeof v === 'object' && !Array.isArray(v) && v !== null
    ? v
    : new ParseError('Value is not a object');

const parseArray = (v: any): Array<any> | ParseError =>
  Array.isArray(v) ? v : new ParseError('Value is not an array');

const isEmpty = (obj: Record<string, any>): boolean => {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
};

const importMediumTranscriptSchema: JsonProperty[] = [
  {
    label: 'language',
    isRequired: true,
    isValidValue: parseISO639_1
  },
  {
    label: 'sections',
    isRequired: false,
    isValidValue: parseArray,
    children: [
      {
        label: 'heading',
        isRequired: true,
        isValidValue: parseString
      },
      {
        label: 'startTimestamp',
        isRequired: false,
        isValidValue: parsePositiveNumbersWithZero
      },
      {
        label: 'endTimestamp',
        isRequired: false,
        isValidValue: parsePositiveNumber
      },
      {
        label: 'text',
        isRequired: true,
        isValidValue: parseString
      }
    ]
  }
];

const importMediumSchema: JsonProperty[] = [
  {
    label: 'type',
    isRequired: true,
    isValidValue: parseMediumType
  },
  {
    label: 'title',
    isRequired: true,
    isValidValue: parseString
  },
  {
    label: 'publicationDate',
    isRequired: false,
    isValidValue: parseISO8601
  },
  {
    label: 'language',
    isRequired: false,
    isValidValue: parseISO639_1
  },
  {
    label: 'thumbnailURL',
    isRequired: true,
    isValidValue: parseURL
  },
  {
    label: 'reference',
    isRequired: true,
    isValidValue: parseArray,
    children: [
      {
        label: 'URL',
        isRequired: true,
        isValidValue: parseURL
      },
      {
        label: 'publishedBy',
        isRequired: false,
        isValidValue: parseString
      },
      {
        label: 'hostedBy',
        isRequired: false,
        isValidValue: parseString
      }
    ]
  },
  {
    label: 'categories',
    isRequired: false,
    isValidValue: parseString
  },
  {
    label: 'transcript',
    isRequired: false,
    isValidValue: parseArray,
    children: importMediumTranscriptSchema
  },
  {
    label: 'subtitleLanguage',
    isRequired: false,
    isValidValue: parseISO639_1
  },
  {
    label: 'duration',
    isRequired: true,
    isValidValue: parsePositiveNumber
  }
];

// how to support arrays?  -> idea: just apply children on every element array?
export const importMediaSchema: JsonProperty = {
  isRequired: true,
  label: 'media',
  isValidValue: parseArray,
  children: importMediumSchema
};

class ValidateProperty {
  value: any;
  schema: JsonProperty;
  logger: Logger;

  private constructor(value: any, schema: JsonProperty, logger: Logger) {
    this.value = value;
    this.schema = schema;
    this.logger = logger;
  }

  static of(obj: any, schema: JsonProperty, logger: Logger) {
    return new ValidateProperty(obj, schema, logger);
  }

  isValid(): boolean {
    const res = this.schema.isValidValue(this.value);
    if (res instanceof ParseError) {
      this.logger.log(
        `Value "${this.value}" for the schema: ${this.schema}. Reason: ${res.reason}`
      );
      return false;
    } else {
      return true;
    }
  }
}

export class ValidateObject {
  obj: Record<string, any>;
  schemas: JsonProperty[];
  logger: Logger;

  private constructor(obj: Object, schema: JsonProperty[], logger?: Logger) {
    this.obj = obj;
    this.schemas = schema;
    this.logger = logger ?? new ErrorLogger(self.crypto.randomUUID());
  }

  static of(obj: Record<string, any>, schema: JsonProperty[], logger?: Logger) {
    return new ValidateObject(obj, schema, logger);
  }

  private isValidCheckObject(value: any, schemas: JsonProperty[]): boolean {
    if (Array.isArray(value)) {
      const res = value.reduce(
        (accu: boolean, v) => ValidateObject.of(v, schemas, this.logger).isValid() && accu,
        true
      );
      return res;
    } else {
      const res = ValidateObject.of(value, schemas, this.logger).isValid();
      return res;
    }
  }

  private isValidCheckValue(value: any, schema: JsonProperty): boolean {
    if (Array.isArray(value)) {
      const res = value.reduce(
        (accu: boolean, v) => ValidateProperty.of(v, schema, this.logger).isValid() && accu,
        true
      );
      return res;
    } else {
      const res = ValidateProperty.of(value, schema, this.logger).isValid();
      return res;
    }
  }

  private isValidCheck(value: any, schema: JsonProperty) {
    if (schema.children !== undefined) {
      const validObject = schema.isValidValue(value);
      if (validObject instanceof ParseError) {
        this.logger.log(
          `Value "${value}" for the schema: ${schema}. Reason: ${validObject.reason}`
        );
        return false;
      } else {
        return this.isValidCheckObject(value, schema.children);
      }
    } else {
      return this.isValidCheckValue(value, schema);
    }
  }

  isValid(): boolean {
    const valid = this.schemas.reduce((accu: boolean, schema) => {
      const value: any = this.obj[schema.label];

      if (value !== undefined) {
        return this.isValidCheck(value, schema) && accu;
      } else {
        return schema.isRequired ? false : true;
      }
    }, true);

    return valid;
  }
}

export const logger = new Map<string, Logger>();

interface Logger {
  log(msg: string): void;
  get(): string[];
}

export class ErrorLogger implements Logger {
  logs: string[] = [];

  constructor(id: string) {
    logger.set(id, this);
  }

  log(msg: string): void {
    this.logs.push(msg);
  }

  get(): string[] {
    return this.logs;
  }
}
