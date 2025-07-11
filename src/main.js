import { Router } from "./router/index.js";
import { routes } from "./router/routes.js";
import { isTestEnvironment } from "./utils/isTestEnvironment.js";
import { NotFoundPage } from "./pages/NotFoundPage.js";

const enableMocking = () =>
  import("./mocks/browser.js").then(({ worker }) =>
    worker.start({
      onUnhandledRequest: "bypass",
    }),
  );

export const router = Router();

function main() {
  routes.forEach((route) => {
    router.registerRoute(route.path, route.component, route.initializer);
  });

  // 404 페이지 설정
  router.setNotFoundComponent(NotFoundPage);

  router.router();
}

// 애플리케이션 시작
if (!isTestEnvironment()) {
  enableMocking().then(main);
} else {
  main();
}
