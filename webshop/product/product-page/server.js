import * as db from '../db.json';

export const data = (context, callback) => {
  const { productId } = context.params;
  const { staticPath } = context;

  const product = db.products[productId];

  callback(null, {
    productId,
    product,
    staticPath,
    baseUrl: context.baseUrl
  });
};
