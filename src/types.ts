export interface Images {
  url_main: string;
  url_thumb: string;
}
export interface Image {
  url: string;
}

export interface Product {
  title: string;
  price: string;
  category: string;
  description: string;
  img: Image;
  createdOn: Date;
  expiresOn: Date;
}

export type Products = Product[];
