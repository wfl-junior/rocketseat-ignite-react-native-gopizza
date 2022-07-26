import { OrderNavigationParams } from "~/screens/Order";
import { ProductNavigationParams } from "~/screens/Product";

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
