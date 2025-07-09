import { ProductListPage, initializeProductListPage } from "../pages/ProductListPage";

export const routes = [
  {
    path: "/",
    component: ProductListPage,
    initializer: initializeProductListPage,
  },
];
