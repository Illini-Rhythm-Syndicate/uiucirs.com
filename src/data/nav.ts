import { withBase } from "../utils/paths";

export const navLinks = [
  { title: "Home", href: withBase("/") },
  { title: "About", href: withBase("/about") },
  { title: "Freeplays", href: withBase("/freeplays") },
  { title: "Project Teams", href: withBase("/teams") },
];
