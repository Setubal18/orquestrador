import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@seven/navbar-vue",
  app: () => System.import("@seven/navbar-vue"),
  activeWhen: ["/"],
});

registerApplication({
  name: "@seven/about-reactjs",
  app: () => System.import("@seven/about-reactjs"),
  activeWhen: ["/about"],
});

registerApplication({
  name: "@seven/main-angular",
  app: () => System.import("@seven/main-angular"),
  activeWhen: ["/main"],
});

start({
  urlRerouteOnly: true,
});
