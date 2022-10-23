type Callback<T> = (error: Error | null, data: T) => void;

export interface OcParameters {
  productId: string;
}

export interface ClientProps {
  price: number;
}

export interface AdditionalData {
  hobbies: string[];
  age: number;
}

export interface GetData {
  (input: OcParameters & { getMoreData: true }, callback: Callback<AdditionalData>): void;
  (input: { getMoreData?: false }, callback: Callback<ClientProps>): void;
}
