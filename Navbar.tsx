import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ShieldCheck, Moon, Sun } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/track-application", label: "Track Application" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-40">
      <div className="ashoka-thread" />
      <nav className="glass">
        <div className="container-max flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 font-display font-bold text-navy-900 dark:text-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-800 text-gold-400">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="flex flex-col items-start leading-tight">
              <span className="text-base tracking-wide">{BUSINESS.name}</span>
              <span className="text-[10px] font-normal uppercase tracking-widest text-navy-500 dark:text-navy-300">
                {BUSINESS.tagline}
              </span>
            </span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-100 dark:text-navy-100 dark:hover:bg-navy-800",
                    isActive && "bg-navy-800 text-white hover:bg-navy-800 dark:bg-navy-700"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink
              to="/admin-login"
              className="ml-2 rounded-lg border-2 border-navy-800 px-4 py-2 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-800 hover:text-white dark:border-white dark:text-white"
            >
              Admin Login
            </NavLink>
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle dark mode"
              className="ml-1 rounded-lg p-2 text-navy-700 hover:bg-navy-100 dark:text-navy-100 dark:hover:bg-navy-800"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>

          <button
            className="md:hidden rounded-lg p-2 text-navy-800 dark:text-white"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-navy-100 px-4 pb-4 dark:border-navy-800">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block rounded-lg px-4 py-3 text-sm font-medium text-navy-700 dark:text-navy-100",
                    isActive && "bg-navy-800 text-white dark:bg-navy-700"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink
              to="/admin-login"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm font-semibold text-navy-800 dark:text-white"
            >
              Admin Login
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
}
