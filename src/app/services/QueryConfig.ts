export class QueryConfig {
  path: string;
  fields: FieldConfig[];
  filters: FilterConfig[];
  limit: number;
  prepend: boolean;
}

export class FieldConfig {
  field: string;
  direction: 'desc' | 'asc';
}

export class FilterConfig {
  field: string;
  compare: '<' | '<=' | '==' | '>' | '>=';
  value: any;
}
