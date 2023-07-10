import Input from '../../common/Input/Input';
import { useState } from 'react';
import Button from '../../common/Button/Button';
import { convertMinutesToHours as timeConverter } from '../../util';
import { v4 as uuidv4 } from 'uuid';
import './createCourse.css';
import {
	BUTTON_LABEL_CREATE_COURSE,
	BUTTON_LABEL_CREATE_AUTHOR,
	BUTTON_LABEL_ADD_AUTHOR,
	BUTTON_LABEL_DELETE_AUTHOR,
} from '../../constants';
export default CreateCourse;

function CreateCourse({ addCourseToList, addAuthorTo, authors }) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [author, setAuthor] = useState('');
	const [minutes, setMinutes] = useState(0);
	const [time, setTime] = useState('00:00');
	const [selectedAuthorList, setSelectedAuthorList] = useState([]);
	const [displayAuthorsList, setDisplayAuthorsList] = useState(authors);
	// const [selectedAuthorList, setSelectedAuthorList] = useState([]);

	// useEffect(() => {
	// 	// call api or anything
	// 	let { title, description } = readonlyObj;
	// 	setTitle(title);
	// 	setDescription(description);
	// }, [readonlyObj]);

	const handleDescriptionChange = (event) => {
		// if (event.target.value.length >= 10) {
		setDescription(event.target.value);
		// }
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

	function addAuthor() {
		let authorObj = { id: uuidv4(), name: author };

		setDisplayAuthorsList([...displayAuthorsList, authorObj]);
		setAuthor('');
		// } else {
		// 	alert('Author already exists');
		// }
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
	}

	function deleteAuthorsFromList(authorObj) {
		setDisplayAuthorsList([...displayAuthorsList, authorObj]);
		setSelectedAuthorList(
			selectedAuthorList.filter((author) => author.id !== authorObj.id)
		);
	}

	function createCourse() {
		let courseObj = {
			title,
			description,
			duration: minutes,
			creationDate: new Date().toDateString(),
			authors: selectedAuthorList.map((author) => author.id),
		};
		console.log(courseObj);
		console.log(selectedAuthorList);
		addCourseToList(courseObj);
		addAuthorTo(selectedAuthorList);
	}

	return (
		<div className='mb-3'>
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
							<label className='center-label'>Add Author</label>
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
									onClick={addAuthor}
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
											onClick={() => addAuthorToList(author)}
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
