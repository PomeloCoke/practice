import { defaultRoutes } from "@/routes";
import blogRoutes from "@/routes/configs/blog";

import { PRODUCT } from "@/settings/enums/basic";
import { menuListType } from "../types";

/**
 * 获取菜单列表
 * @description 根据产品id生成对应菜单列表
 * @param product_id 产品id
 * @returns 菜单列表
 */
const getMenuList = (product_id: number): menuListType[] => {
  let routes = defaultRoutes;
  switch (product_id) {
    case PRODUCT.Blog:
      routes = [...routes, ...blogRoutes];
      break;
    case PRODUCT.TimeManagement:
      routes = [...blogRoutes];
      break;
    default:
      routes = [...routes, ...blogRoutes];
      break;
  }

  const menus = createMenuList(routes);
  return menus;
};

/**
 * 创建菜单列表
 * @description 根据路由配置生成菜单
 * @param routes 路由列表
 * @param isChild 是否为子路由，默认为否
 * @returns 菜单列表
 */
const createMenuList = (routes: ROUTER[], isChild = false) => {
  let list: menuListType[] = [];
  routes
    .filter((item) => item.menu.is_show)
    .map((item, idx) => {
      let listItem = {
        id: idx + 1,
        name_c: item.menu.name_c || "",
        name_e: item.menu.name_e || "",
        icon: item.menu.icon || "",
        route: item.menu.route || "",
        children: [] as menuListType[],
      };
      if (item.children && item.children.length > 0) {
        const children: menuListType[] = createMenuList(item.children, true);
        listItem = { ...listItem, children };
      }
      list.push(listItem);
    });
  return list;
};

export default getMenuList;
