// types/navigation.ts

export type NavigationType = "navbar" | "footer" | "sidebar" | "header"

export interface NavItem {
  id: number
  label: string
  href: string
  icon?: string
  parentId: number | null
  type: NavigationType
}

export interface NavNode extends NavItem {
  children?: NavNode[]
}

export interface HeaderItems {
  id: number
  label: string
  href: string
  icon?: string
  parentId: number | null
  children: HeaderItems[];
}
