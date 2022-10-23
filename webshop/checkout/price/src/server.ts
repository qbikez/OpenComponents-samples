import { Context } from "oc-template-typescript-react-compiler";
import { AdditionalData, ClientProps, OcParameters } from "./types";

import * as db from "../../db.json";

export async function data(
  context: Context<OcParameters>,
  callback: (error: any, data: ClientProps | AdditionalData) => void
) {
  const { productId } = context.params;
  const product = db.prices.find((p) => p.productId === productId);

  return callback(null, { price: product!.price });
}
