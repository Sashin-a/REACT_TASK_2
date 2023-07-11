import Input from '../../common/Input/Input';
import { useState } from 'react';
import Button from '../../common/Button/Button';
import { convertMinutesToHours as timeConverter } from '../../util';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import './createCourse.css';
import {
	BUTTON_LABEL_CREATE_COURSE,
	BUTTON_LABEL_CREATE_AUTHOR,
	BUTTON_LABEL_ADD_AUTHOR,
	BUTTON_LABEL_DELETE_AUTHOR,
} from '../../constants';
import { useNavigate } from 'react-router-dom';
export default CreateCourse;

function CreateCourse({ callbackSaveCourses, callbackSaveAuthors }) {
	const location = useLocation();
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [author, setAuthor] = useState('');
	const [minutes, setMinutes] = useState(0);
	const [time, setTime] = useState('00:00');
	const [selectedAuthorList, setSelectedAuthorList] = useState([]);
	const [displayAuthorsList, setDisplayAuthorsList] = useState(
		location.state.authors
	);

	const handleDescriptionChange = (event) => {
		setDescription(event.target.value);
	};

	function handleSetAuthorName(event) {
		setAuthor(event.target.value);
	}
	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	};

	const calculateTime = (min) => {
		let val = timeConverter(min);
		setTime(val);
	};

	function createAuthor() {
		if (author === '' || author.length === 0) {
			alert('Invalid Author');
			return;
		}
		let authorObj = { id: uuidv4(), name: author };

		setDisplayAuthorsList([...displayAuthorsList, authorObj]);
		setAuthor('');
	}

	function handleDurationEvent(event) {
		setMinutes(event.target.value);
		calculateTime(event.target.value);
	}
	function addAuthorToList(authorObj) {
		setSelectedAuthorList([...selectedAuthorList, authorObj]);
		setDisplayAuthorsList(
			displayAuthorsList.filter((author) => author.id !== authorObj.id)
		);

		// console.log(authorObj);
	}

	function deleteAuthorsFromList(authorObj) {
		setDisplayAuthorsList([...displayAuthorsList, authorObj]);
		setSelectedAuthorList(
			selectedAuthorList.filter((author) => author.id !== authorObj.id)
		);
	}

	function createCourse() {
		if (title != null && title.length < 2) {
			alert('Invalid Title, Minimum length 2 is expected');
			return;
		}

		if (description != null && description.length < 10) {
			alert('Invalid description, Minimum length 10 is expected');
			return;
		}

		if (minutes != null && minutes < 1) {
			alert('Invalid course duration, Minimum duration expected is 1');
			return;
		}

		let courseObj = {
			id: uuidv4(),
			title,
			description,
			duration: minutes,
			creationDate: new Date().toDateString(),
			authors: selectedAuthorList.map((author) => author.id),
		};

		callbackSaveCourses(courseObj);
		callbackSaveAuthors(selectedAuthorList);
		navigate('/courses');
	}

	return (
		<div className='mb-3 course-create'>
			<div className='container'>
				<div className='row'>
					<div className='col-4'>
						<label for='title'>Title</label>
						<Input
							id='title'
							placeholderText='Enter Title'
							onChange={handleTitleChange}
							type='text'
							value={title}
						/>
					</div>
					<div className='col'></div>

					<div className='col-3'>
						<Button
							buttonText={BUTTON_LABEL_CREATE_COURSE}
							btnLook='btn btn-outline-success'
							onClick={createCourse}
						/>
					</div>
				</div>
				<br />

				<div className='mb-3'>
					<label for='desc'>Description</label>

					<textarea
						className='form-control'
						id='desc'
						rows='3'
						cols='50'
						onChange={handleDescriptionChange}
					/>
				</div>
			</div>
			<div className='container'>
				<div className='row'>
					<div className='col-6'>
						<div className='center-label-div'>
							<label className='center-label'>{BUTTON_LABEL_ADD_AUTHOR}</label>
						</div>

						<div className='row'>
							<div className='col'>
								<label for='authName'>Author Name</label>
								<Input
									id='authName'
									placeholderText='Author Name'
									onChange={handleSetAuthorName}
									type='text'
									value={author}
								/>
							</div>
						</div>
						<div className='row'>
							<div className='col-6'>
								<Button
									buttonText={BUTTON_LABEL_CREATE_AUTHOR}
									btnLook='btn btn-outline-secondary'
									onClick={createAuthor}
								/>
							</div>
						</div>
						<br />
						<br />
						<div className='row'>
							<div className='col align-self-center'>Duration</div>
						</div>
						<div className='row'>
							<Input
								id='duration'
								placeholderText='Enter Duration in minutes'
								onChange={handleDurationEvent}
								type='number'
								value={minutes}
							/>
						</div>
						<div className='row'>
							<label>
								Duration is <strong>{time}</strong> hours{' '}
							</label>
						</div>
					</div>

					<div className='col-6'>
						<div className='col-9'>
							<div className='center-label-div'>
								<label className='center-label'>Authors</label>
							</div>
						</div>
						<div className='container'>
							{displayAuthorsList.map((author) => (
								<div key={author.id} className='row'>
									<div className='col'>
										<label>{author.name}</label>
									</div>
									<div className='col'>
										<Button
											buttonText={BUTTON_LABEL_ADD_AUTHOR}
											btnLook='btn btn-outline-warning'
											onClick={addAuthorToList}
										></Button>
									</div>
									<br />
									<br />
								</div>
							))}
							<div className='col-9'>
								<label className='center-label'> Course Authors </label>
							</div>

							{selectedAuthorList.map((author) => (
								<div key={author.name} className='row'>
									<div className='col'>
										<label>{author.name}</label>
									</div>
									<div className='col'>
										<Button
											buttonText={BUTTON_LABEL_DELETE_AUTHOR}
											btnLook='btn btn-outline-danger'
											onClick={() => deleteAuthorsFromList(author)}
										></Button>
									</div>
									<br />
									<br />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
