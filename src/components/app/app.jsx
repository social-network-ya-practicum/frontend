import { Outlet, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<Routes>
			<Route
				element={
					<>
						<div>Layout</div>
						<Outlet />
					</>
				}
			>
				<Route path="/" element={<Outlet />}>
					<Route index element={<div>Route /</div>} />
					<Route path="contacts" element={<div>Route /contacts</div>} />
					<Route
						path="contacts/:contactId"
						element={<div>Route /contacts/:contactId</div>}
					/>
					<Route path="user" element={<div>Route /user</div>} />
					<Route path="user/edit" element={<div>Route /user/edit</div>} />
				</Route>
				<Route path="/login" element={<div>Route /login</div>} />
				<Route path="/register" element={<div>Route /register</div>} />
			</Route>
			<Route path="*" element={<div>Page 404</div>} />
		</Routes>
	);
}

export default App;
