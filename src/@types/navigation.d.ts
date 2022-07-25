export interface ProductNavigationParams {
  id?: string;
}

export interface OrderNavigationParams {
  id: string;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      product: ProductNavigationParams;
      order: OrderNavigationParams;
      orders: undefined;
    }
  }
}
