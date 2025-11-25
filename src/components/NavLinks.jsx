import { NavLink as RouterNavLink } from "react-router-dom";
import { forwardRef } from "react";

// Utility to merge class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

const NavLink = forwardRef(({ className, activeClassName, pendingClassName, ...props }, ref) => (
  <RouterNavLink
    ref={ref}
    {...props}
    className={({ isActive, isPending }) =>
      cn(className, isActive && activeClassName, isPending && pendingClassName)
    }
  />
));

NavLink.displayName = "NavLink";

export { NavLink };
