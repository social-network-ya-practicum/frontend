import { Outlet, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/main-layout/main-layout';

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
				<Route path="/login" element={<div>path = '/login'</div>} />
				<Route path="/register" element={<div>path = '/register'</div>} />
			</Route>
			<Route path="*" element={<div>Page 404</div>} />
		</Routes>
	);
}

export default App;
