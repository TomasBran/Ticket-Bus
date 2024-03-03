// import { RouterProvider } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import router from './router.jsx';
// import store from './store/store.js';
// import { QueryClient, QueryClientProvider } from 'react-query';

import SideBarAdmin from './components/SideBarAdmin/SideBarAdmin.jsx';

// // Create a client
// const queryClient = new QueryClient();

function App() {
  return (
    <SideBarAdmin />
    // <QueryClientProvider client={queryClient}>
    //   <Provider store={store}>
    //     <RouterProvider router={router} />
    //   </Provider>
    // </QueryClientProvider>
  );
}
export default App;
