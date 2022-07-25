import { ProductNavigationParams } from "~/screens/Product";

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
