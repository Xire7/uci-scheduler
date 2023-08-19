import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router-dom";
import { Spinner } from '@chakra-ui/react'



const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      {navigation.state === 'loading' ? <Spinner size='xl' color='teal'/> : <Outlet />}
    </>
  );
};

export default RootLayout;