import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import { BUTTON_LABEL_ADD_COURSE } from '../../constants';
import './courses.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default Courses;

function Courses({ authors, courses }) {
	const navigate = useNavigate();
	const [searchText, setSearchText] = useState('');

	function getAuthors(course) {
		let authorNames = [];
		course.authors.forEach((authorId) => {
			authors.forEach((author) => {
				if (author.id === authorId) {
					authorNames.push(author.name);
				}
			});
		});
		return authorNames;
	}
	const search = (text) => {
		setSearchText(text);
	};

	const navigateToAddCourse = () => {
		navigate('/courses/add', {
			state: { authors },
		});
	};
	return (
		<>
			<div className='container course-create'>
				<div className='row'>
					<div className='col-6'>
						<SearchBar onSearch={search} />
					</div>
					<div className='col-6 add-btn'>
						<Button
							buttonText={BUTTON_LABEL_ADD_COURSE}
							btnLook='btn btn-outline-dark'
							onClick={navigateToAddCourse}
						/>
					</div>
				</div>
			</div>

			<div className='cards course-create'>
				{courses
					.filter((course) => {
						return (
							course.title.toLowerCase().includes(searchText.toLowerCase()) ||
							course.id.toLowerCase().includes(searchText.toLowerCase())
						);
					})
					.map((course) => (
						<CourseCard
							creationDate={course.creationDate}
							description={course.description}
							duration={course.duration}
							title={course.title}
							key={course.id}
							id={course.id}
							authors={getAuthors(course)}
						/>
					))}
			</div>
		</>
	);
}
