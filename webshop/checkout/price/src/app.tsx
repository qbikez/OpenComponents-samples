import React from 'react';
import styles from './styles.css';
import { ClientProps, GetData } from './types';

interface AppProps extends ClientProps {
  getData: GetData;
}

const App: React.FC<AppProps> = ({ price }) => {
 return (
    <div className={styles.container}>
      <button className={styles.button}>
        Price: {price}
      </button>
    </div>
  );
};

export default App;
