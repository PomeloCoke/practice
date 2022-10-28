import { defaultRoutes } from "@/routes";
import blogRoutes from "@/routes/configs/blog";
import { MenuListData } from "../types";

const getMenuList = (type: string):MenuListData[] => {
  let routes = defaultRoutes
  switch (type) {
    case 'blog':
      routes = [...routes,...blogRoutes]
      break;
  
    default:
      routes = [...routes,...blogRoutes]
      break;
  }

  const menus = getMenuItem(routes)
  return menus
}

const getMenuItem = (routes:ROUTER[],isChild=false) => {
  let list:MenuListData[] = []
  routes.filter(item=>item.menu.is_show).map((item, idx) => {
    let listItem = {
      id: idx + 1,
      name_c: item.menu.name_c || '',
      name_e: item.menu.name_e || '',
      icon: item.menu.icon || '',
      route: item.menu.route || '',
      children: [] as MenuListData[]
    }
    if (item.children && item.children.length > 0) {
      const children:MenuListData[] = getMenuItem(item.children,true)
      listItem = {...listItem, children}
    }
    list.push(listItem)
  })
  return list
}

export default getMenuList