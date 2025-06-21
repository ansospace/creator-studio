import { LucideIcon } from "lucide-react";

/** Represents the user shown in the sidebar */
interface User {
  name: string;
  email: string;
  avatar: string;
}

/** Represents a team with a logo icon and plan */
interface Team {
  name: string;
  logo: LucideIcon;
  plan: string;
}

/** Common structure for all navigation items */
interface BaseNavItem {
  title: string;
  badge?: string;
  icon?: LucideIcon;
}

/** Child items inside a collapsible nav section (e.g., "Profile", "Account") */
export interface NavChildItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

/** Navigation item with a direct URL (e.g., Dashboard, Users) */
export interface NavLink extends BaseNavItem {
  url: string;
  items?: never;
}

/** Collapsible nav section (e.g., Settings with children) */
export interface NavCollapsible extends BaseNavItem {
  items: NavChildItem[];
  url?: never;
}

/** Union of possible sidebar item types */
export type NavItem = NavLink | NavCollapsible;

/** Groups multiple navigation items under a section title */
export interface NavGroup {
  title: string;
  items: NavItem[];
}

/** Main sidebar data structure */
export interface SidebarData {
  user: User;
  teams: Team[];
  navGroups: NavGroup[];
}
