import './App.css';
import React, { useState } from 'react';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import { PrivateRoutes } from './Auth/PrivateRoutes';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';

function App() {
	const [userN, setUserN] = useState('');
	const callback = (userName) => {
		setUserN(userName);
	};

	return (
		<>
			<BrowserRouter>
				<Header userName={userN} />
				<Routes>
					<Route element={<PrivateRoutes />}>
						<Route path='/' element={<Courses />} />
						<Route path='courses' element={<Courses />} />
						<Route path='courses/:courseId' element={<CourseInfo />}></Route>
						<Route path='courses/add' element={<CreateCourse />}></Route>
					</Route>

					<Route path='registration' element={<Registration />} />
					<Route path='login' element={<Login parentCallback={callback} />} />
				</Routes>
				{/* 
				<Courses /> */}
			</BrowserRouter>
			{/* <React.StrictMode>
				<RouterProvider router={router} />
			</React.StrictMode> */}
		</>
	);
}

export default App;
