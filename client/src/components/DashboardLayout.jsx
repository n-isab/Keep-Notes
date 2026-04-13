import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, PlusSquare, LogOut, Moon, Sun } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const DashboardLayout = () => {
  const { handleLogout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    setDarkMode(saved === "true");
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  console.log("LAYOUT RENDERED");

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5 dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6">Notes App</h2>

        <ul className="space-y-3">
          <li
            onClick={toggleDarkMode}
            className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-700"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </li>

          <Link
            to="/dashboard"
            className={`block  p-2 rounded transition-all duration-200 ${
              location.pathname === "/dashboard"
                ? "bg-gray-700"
                : "hover:bg-gray-800"
            }`}
          >
            <LayoutDashboard size={18} className="text-gray-300" />
            Dashboard
          </Link>

          <Link
            to="/add-note"
            className={`block p-2 rounded 
              transition-all duration-200
              ${
                location.pathname === "/add-note"
                  ? "bg-gray-700"
                  : "hover:bg-gray-800"
              }`}
          >
            <PlusSquare size={18} className="text-gray-300" />
            Add Note
          </Link>

          <li
            onClick={handleLogout}
            className="block  p-2 rounded hover:bg-red-600"
          >
            <LogOut size={18} className="text-gray-300" />
            Logout
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gray-100 p-6">
        <div className="w-full max-w-3xl mx-auto bg-white shadow rounded p-6">
          <Outlet /> {/*  THIS changes per route */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
