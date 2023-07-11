import './App.css';
import React, { useState } from 'react';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import { PrivateRoutes } from './auth/PrivateRoutes';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import { mockedAuthorsList, mockedCoursesList } from './constants';

function App() {
	const [userN, setUserN] = useState('');
	const [authorList, setAuthorList] = useState(mockedAuthorsList);
	const [courseList, setCourseList] = useState(mockedCoursesList);

	function addCourseToList(obj) {
		setCourseList([...courseList, obj]);
	}

	function getAuthorsList() {
		return authorList;
	}

	function getCourseList() {
		return courseList;
	}

	function addAuthorTo(obj) {
		console.log(obj);
		let existingAuthNames = authorList.map((x) => x.name);
		let newAuthors = obj.filter((x) => !existingAuthNames.includes(x.name));
		if (newAuthors) {
			setAuthorList([...authorList, ...newAuthors]);
		}
	}
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
						<Route
							path='courses'
							element={
								<Courses authors={getAuthorsList()} courses={getCourseList()} />
							}
						/>
						<Route path='courses/:courseId' element={<CourseInfo />}></Route>
						<Route
							path='courses/add'
							element={
								<CreateCourse
									callbackSaveAuthors={(e) => addAuthorTo(e)}
									callbackSaveCourses={(e) => addCourseToList(e)}
								/>
							}
						></Route>
					</Route>

					<Route path='registration' element={<Registration />} />
					<Route path='login' element={<Login parentCallback={callback} />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
