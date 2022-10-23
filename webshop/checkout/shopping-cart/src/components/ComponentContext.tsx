import React from 'react';

import { ClientLogger } from '../utils/clientLogger';
import { GetDataFunc } from '../interfaces';

export type ComponentContext = {
  logger: ClientLogger;
  getData: GetDataFunc;
};

export const ComponentContext = React.createContext<ComponentContext>({
  logger: new ClientLogger(undefined, 'dummy'),
  getData: () => {}
});
