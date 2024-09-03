import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

import App from './App.tsx';

import './index.css';
import SingIn from './pages/SingIn.tsx';
import SignUp from './pages/SignUp.tsx';
import Storage from './components/Storage/indext.tsx';
import Statistics from './components/Statistics/index.tsx';
import UserSettings from './components/UserSettings/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'storage',
        element: <Storage />,
      },
      {
        path: 'statistics',
        element: <Statistics />,
      },
      {
        path: 'setting',
        element: <UserSettings />,
      },
    ],
  },
  {
    path: '/signin',
    element: <SingIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
