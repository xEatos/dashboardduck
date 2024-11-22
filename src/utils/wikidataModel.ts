export type WikiDataResource = {
  iri: URL; // Q or P Number
  label: string; // label of the Q or P Number
};

export type WikiDataLiteral = {
  iri: URL; // e.g. "xsd:integer"
  value: string; // "42"
  lang: ISO639
};

export interface WikiData {
  iri: URL;
  label?: string;
  value?: string;
  lang?: string;
}