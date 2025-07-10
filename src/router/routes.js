import { ProductListPage, initializeProductListPage } from "../pages/ProductListPage";
import { ProductDetailPage, initializeProductDetailPage } from "../pages/ProductDetailPage";

export const routes = [
  {
    path: "/",
    component: ProductListPage,
    initializer: initializeProductListPage,
  },
  {
    path: "/product/:productId",
    component: ProductDetailPage,
    initializer: initializeProductDetailPage,
  },
];
