

import { NavItem, NavNode, NavigationType, HeaderItems } from "@/types";
export function groupNavItemsByType(items: NavItem[]): Record<NavigationType, NavItem[]> {
  return {
    navbar: items.filter((item) => item.type === "navbar"),
    footer: items.filter((item) => item.type === "footer"),
    sidebar: items.filter((item) => item.type === "sidebar"),
    header: items.filter((item) => item.type === "header"),
  }
}

export function buildNavTree(items: NavItem[]): NavNode[] {
  const map: Record<number, NavNode> = {}
  const roots: NavNode[] = []

  items.forEach((item) => {
    map[item.id] = { ...item, children: [] }
  })

  items.forEach((item) => {
    if (item.parentId === null) {
      roots.push(map[item.id])
    } else {
      map[item.parentId]?.children?.push(map[item.id])
    }
  })

  return roots
}
