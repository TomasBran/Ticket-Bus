import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <>
      HEADER
      <Outlet />
      FOOTER
    </>
  );
}

export default MainLayout;
