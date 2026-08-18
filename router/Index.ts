import RouteConfig, { RouteObject } from "@goengine/vue/src/router/Config";
import List from "./List";

export default abstract class Route extends RouteConfig {
  public static get routes(): RouteObject[] {
    return List.map((item) => ({
      path: item.path,
      component: item.component,
    }));
  }
}
