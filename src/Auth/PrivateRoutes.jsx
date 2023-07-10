import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRoutes = () => {
	const token = window.localStorage.getItem('token');

	if (!token) return <Navigate to='/login' />;

	return <Outlet />;
	// <Route path="/" element={<Navigate to="/todos" replace />} />
};
