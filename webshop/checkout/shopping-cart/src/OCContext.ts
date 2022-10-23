export interface AcceptLanguage {
  code: string;
  script?: unknown;
  region: string;
  quality: number;
}

export type EnvName = 'prod' | 'stage' | 'ci' | 'local' | 'test';

export interface Env {
  name: EnvName;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Plugins {
  [key: string]: () => unknown;
}

export interface RequestHeaders {
  host: string;
  connection: string;
  accept: string;
  'user-agent': string;
  'content-type': string;
  referer: string;
  'accept-encoding': string;
  'accept-language': string;
}

export interface External {
  global: string;
  url: string;
  name: string;
}

export interface Template {
  type: string;
  version: string;
  externals: External[];
}

export interface BaseContext {
  acceptLanguage: AcceptLanguage[];
  baseUrl: string;
  env: Env;
  plugins: Plugins;
  requestHeaders: RequestHeaders;
  staticPath: string;
  templates: Template[];
}
export interface GenericContext<TParams> extends BaseContext {
  params: TParams;
}
