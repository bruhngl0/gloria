export interface ShopifyImage {
  url: string;
  altText: string;
  width?: number;
  height?: number;
}

export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: MoneyV2;
  selectedOptions: SelectedOption[];
  image: ShopifyImage;
  product?: {
    title: string;
  };
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  variants: {
    edges: {
      node: ProductVariant;
    }[];
  };
  images: {
    edges: {
      node: ShopifyImage;
    }[];
  };
  metafield?: {
    value: string;
  } | null;
  options: ProductOption[];
  priceRange?: {
    minVariantPrice: MoneyV2;
  };
  tags?: string[];
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: ProductVariant;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: MoneyV2;
  };
  lines: {
    edges: {
      node: CartLine;
    }[];
  };
}

export interface CartCreateResponse {
  cartCreate: {
    cart: Cart;
  };
}

export interface CartLinesAddResponse {
  cartLinesAdd: {
    cart: Cart;
  };
}

export interface CartLinesUpdateResponse {
  cartLinesUpdate: {
    cart: Cart;
  };
}

export interface CartLinesRemoveResponse {
  cartLinesRemove: {
    cart: Cart;
  };
}

export interface CartGetResponse {
  cart: Cart;
}
