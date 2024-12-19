import { Outlet } from "react-router-dom";

export function RootLayout() {
  return (
    <main className="flex flex-col h-screen w-full justify-start items-center text-blacky bg-white dark:bg-black dark:text-white">
      <Outlet />
    </main>
  );
}
