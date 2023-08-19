import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router-dom";


const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
};

export default RootLayout;