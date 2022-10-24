import React from 'react';
import { ComponentContext } from './components/ComponentContext';
import { ShoppingCart } from './components/ShoppingCart';
import { AppProps, GetData } from './interfaces';
import { ClientLogger } from './utils/clientLogger';

const App: React.FC<AppProps & GetData> = (props: AppProps & GetData) => {
  const { aiInstrumentationKey, name, getData } = props;
  const logger = new ClientLogger(aiInstrumentationKey, 'sites-dashboard');

  return (
    <ComponentContext.Provider value={{ logger, getData }}>
      <ShoppingCart></ShoppingCart>
    </ComponentContext.Provider>
  );
};

export default App;
