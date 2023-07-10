import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockedAuthorsList, mockedCoursesList } from '../../constants';
import Button from '../../common/Button/Button';

export default CourseInfo;

function CourseInfo() {
	let { courseId } = useParams();
	const [courseList] = useState(mockedCoursesList);
	const [authorList] = useState(mockedAuthorsList);
	const course = courseList.filter((course) => course.id === courseId)[0];
	let navigate = useNavigate();

	const backToCourses = () => {
		navigate('/courses');
	};
	return (
		<>
			<div className='container'>
				<div className='row'>
					<Button
						buttonText='< Back to Courses'
						onClick={backToCourses}
						btnLook='btn btn-link'
					/>
				</div>
				<div className='row'>
					<div className='col'>
						{' '}
						<h2>{course.title}</h2>
					</div>
					<div className='row'>
						<div className='col'>
							<label>{course.description}</label>
						</div>
						<div className='col'>
							<div className='row'>
								<label>{course.id}</label>
							</div>

							<div className='row'>
								<label>{course.creationDate}</label>
							</div>
							<div className='row'>
								<label>{course.duration}</label>
							</div>
							<div className='row'>
								{/* <label>{course.authors}</label> */}
								{authorList.filter((author) =>
									course.authors.map((c) => c.id).includes(author.id)
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
