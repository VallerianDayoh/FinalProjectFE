import { NavLink as RouterNavLink } from "react-router-dom";
import { forwardRef } from "react";

// Utility className merger (pengganti cn bawaan)
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Component NavLink kompatibel React Router 6
const NavLink = forwardRef(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        // Section: Handle active & pending class
        className={({ isActive, isPending }) =>
          cn(
            className,
            isActive && activeClassName,
            isPending && pendingClassName
          )
        }
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
