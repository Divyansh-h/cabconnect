import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="w-full h-screen bg-white text-gray-900 overflow-hidden">
      <Outlet />
    </div>
  );
}
