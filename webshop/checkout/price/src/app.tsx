import React from "react";
import styles from "./styles.css";
import { ClientProps, GetData } from "./types";

interface AppProps extends ClientProps {
  getData: GetData;
}

const App: React.FC<AppProps> = ({ price, productId }) => {
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => {
          console.log(`firing webshop:price-clicked:${productId}`);
          window.oc.events.fire(`webshop:price-clicked:${productId}`, { productId, price });
        }}
      >
        Price: {price}
      </button>
    </div>
  );
};

export default App;
