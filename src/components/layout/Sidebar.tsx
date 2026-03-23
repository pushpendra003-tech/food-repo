import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, List, Package, BarChart3, Settings } from "lucide-react";

const navItems = [
  { path: "/owner/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/owner/orders", label: "Orders", icon: Package },
  { path: "/owner/menu", label: "Menu", icon: List },
  { path: "/owner/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/owner/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <nav className="flex-1 p-4 space-y-2">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center gap-3 p-4 rounded-2xl transition-all duration-200 group
              ${
                isActive
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              }
            `}
          >
            <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"}`} />
            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

