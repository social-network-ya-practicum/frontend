import { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import MainLayout from '../layouts/main-layout/main-layout';
import LoginPage from '../../pages/login-page/login-page';
import MainPageShell from '../layouts/main-page-shell/main-page-shell';
import MainPageContent from '../../pages/main-page/main-page-content';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import { useStore } from '../../contexts/RootStoreContext';
import ProtectedRoute from '../protected-route/protected-route';
import EditPage from '../../pages/edit-page/edit-page';
import UserPage from '../../pages/user-page/user-page';
import ContactPage from '../../pages/contact-page/contact-page';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import ProtectedUser from '../protected-user/protected-user';
import ProtectedContact from '../protected-contact/protected-contact';
import GroupsPage from '../../pages/groups-page/groups-page';
import EnterTheGroupPage from '../../pages/enter-the-group-page/enter-the-group-page';

const App = observer(() => {
  const { userStore } = useStore();
  const { getUser, wasUserRequest, user } = userStore;

  useEffect(() => {
    if (wasUserRequest) return;
    getUser();
  }, [getUser, wasUserRequest]);

  if (!wasUserRequest) return null;

  return (
    <Routes>
      <Route
        element={
          <ScrollToTop>
            <MainLayout />
          </ScrollToTop>
        }
      >
        <Route
          path="/"
          element={
            <ProtectedRoute to="/login">{user && <Outlet />}</ProtectedRoute>
          }
        >
          <Route element={<MainPageShell />}>
            <Route index element={<MainPageContent />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="groups" element={<GroupsPage />} />
            <Route path="groups/:groupId" element={<EnterTheGroupPage />} />
            <Route path="404" element={<PageNotFound />} />
          </Route>
          <Route
            path="contacts/:contactId"
            element={
              <ProtectedContact>
                <ContactPage />
              </ProtectedContact>
            }
          />
          <Route
            path=":userId"
            element={
              <ProtectedUser>
                <Outlet />
              </ProtectedUser>
            }
          >
            <Route index element={<UserPage />} />
            <Route path="edit" element={<EditPage />} />
          </Route>
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
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
});

export default App;
