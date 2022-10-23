import { GenericContext } from './OCContext';
import { ClientLogger } from './utils/clientLogger';

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

/**
 * @summary props that go to App.tsx component
 */
export type AppProps = {
  aiInstrumentationKey: string;
  name: string;
};

/**
 * @summary public parameters passed via component URL
 */
export type PublicParameters = {
  name: string;
};

export type Command = 'get-data' | 'set-data';
export type ServerCommand = {
  command?: Command;
  payload?: {};
};

export type CommandResponse =
  | { command: 'get-data'; additonalData: string }
  | { command: 'set-data' };

export type ErrorResponse = { originalError?: unknown } | string | unknown;
export type ServerResponse = AppProps | CommandResponse;

export type Context = GenericContext<PublicParameters & ServerCommand>;

export type Callback = (err: ErrorResponse | null, commandResponse: ServerResponse | null) => void;

export type CommandCallback = (
  command: ServerCommand['command'],
  payload: {},
  callback: Callback
) => void;

export type GetDataFunc = (
  request: ServerCommand,
  callback: (err: ErrorResponse | null, data: CommandResponse | null) => void
) => void;

export interface GetData {
  getData: GetDataFunc;
}

export function assertUnreachable(x: never, msg: string): never {
  throw new Error(msg);
}
