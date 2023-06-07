import { Outlet, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/main-layout/main-layout';
import LoginPage from '../../pages/login-page/login-page';
import RergisterPage from '../../pages/register-page/register-page';

function App() {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<Outlet />}>
					<Route index element={<div>path = '/'</div>} />
					<Route path="contacts" element={<div>path = '/contacts'</div>} />
					<Route
						path="contacts/:contactId"
						element={<div>path = '/contacts/:contactId'</div>}
					/>
					<Route path=":user" element={<div>path = '/:user'</div>} />
					<Route path=":user/edit" element={<div>path = '/:user/edit'</div>} />
				</Route>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RergisterPage />} />
			</Route>
			<Route path="*" element={<div>Page 404</div>} />
		</Routes>
	);
}

export default App;
