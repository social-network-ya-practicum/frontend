import { useEffect } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import MainLayout from '../layouts/main-layout/main-layout';
import LoginPage from '../../pages/login-page/login-page';
import MainPageShell from '../layouts/main-page-shell/main-page-shell';
import MainPageContent from '../layouts/main-page-content/main-page-content';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import { useStore } from '../../contexts/RootStoreContext';
import ProtectedRoute from '../protected-route/protected-route';
import MainAvatar from '../main-avatar/main-avatar';

const App = observer(() => {
  const { userStore } = useStore();
  const { getUser, wasUserRequest } = userStore;

  useEffect(() => {
    if (wasUserRequest) return;
    getUser();
  }, [getUser, wasUserRequest]);

  if (!wasUserRequest) return null;

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute to="/login">
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route element={<MainPageShell />}>
            <Route index element={<MainPageContent />} />
            <Route path="contacts" element={<ContactsPage />} />
          </Route>
          <Route
            path="contacts/:contactId"
            element={<div>path = '/contacts/:contactId'</div>}
          />
          <Route path=":user" element={<div>path = '/:user'</div>} />
          <Route
            path=":user/edit"
            element={
              <div>
                <MainAvatar onSubmit={() => undefined} />
              </div>
            }
          />
        </Route>
        <Route
          path="/login"
          element={
            <ProtectedRoute to="/">
              <LoginPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<div>Page 404</div>} />
    </Routes>
  );
});

export default App;
