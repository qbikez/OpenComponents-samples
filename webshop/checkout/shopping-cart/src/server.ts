import {
  AppProps,
  assertUnreachable,
  Command,
  CommandResponse,
  Context,
  ErrorResponse,
  PublicParameters,
  ServerResponse
} from './interfaces';
import envConfig from './env.json';

/**
 * @description handles the initial load of the component. Returned AppProps will be passed to client-side React component
 */
async function initialLoad(params: PublicParameters): Promise<AppProps> {
  return {
    aiInstrumentationKey: envConfig.APPINSIGHTS_INSTRUMENTATIONKEY,
    name: params.name
  };
}

/**
 * handles any additional communication between client and server
 */
async function handleCommand(command: Command): Promise<CommandResponse> {
  switch (command) {
    case 'get-data':
      // pretend we're doing some API call here to get data
      return { command, additonalData: 'here you go, some additional data!' };
    case 'set-data':
      // pretend we're doing some API call here to set data
      return { command };
    default:
      assertUnreachable(command, 'unrecognized command');
  }
}

async function dataAsync(context: Context): Promise<ServerResponse> {
  const { command } = context.params;
  if (!command) {
    return await initialLoad(context.params);
  } else {
    return await handleCommand(command);
  }
}

/**
 * @description just a convertion from callback to async style. add any logic in `initialLoad` or `handleCommand` functions
 */
export async function data(
  context: Context,
  callback: (error: ErrorResponse | null, data: ServerResponse | null) => void
) {
  try {
    const result = await dataAsync(context);
    return callback(null, result);
  } catch (err) {
    return callback(err, null);
  }
}
