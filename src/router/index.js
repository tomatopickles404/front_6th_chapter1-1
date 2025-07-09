export function Router() {
  const routes = {};
  let notFoundComponent = "";

  const registerRoute = (path, component, initializer = null) => {
    routes[path] = { component, initializer };
  };

  const setNotFoundComponent = (component) => {
    notFoundComponent = component;
  };

  const navigateTo = (path) => {
    window.history.pushState(null, null, path);
    router();
  };

  const router = () => {
    const path = window.location.pathname;
    const route = routes[path] || { component: notFoundComponent, initializer: null };
    if (route.component) {
      document.getElementById("root").innerHTML = route.component();

      if (route.initializer) {
        route.initializer();
      }
    }
  };

  window.addEventListener("popstate", router);
  document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
      if (e.target.matches("[data-link]")) {
        e.preventDefault();
        navigateTo(e.target.href);
      }
    });
    router();
  });

  return {
    registerRoute,
    setNotFoundComponent,
    navigateTo,
    router,
  };
}
