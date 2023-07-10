import Button from '../../../../common/Button/Button';
import './courseCard.css';
import { convertMinutesToHours as timeConverter } from '../../../../util';

import { BUTTON_LABEL_SHOW_COURSE } from '../../../../constants';
import { useNavigate } from 'react-router-dom';
export default CourseCard;

function CourseCard({
	title,
	duration,
	creationDate,
	authors,
	description,
	id,
}) {
	let navigate = useNavigate();
	function formatAuthors(authors) {
		const MAX_LENGTH = 40;
		let len = 0;
		let val = '';
		authors.forEach((author) => {
			if (author.length + len < MAX_LENGTH) {
				if (val.length !== 0) {
					val += ', ';
				}
				val += author;
				len += author.length;
			} else {
				val += '...';
			}
		});
		return val;
	}

	function showCourse() {
		navigate(`${id}`);
	}

	return (
		<div className='course-card'>
			<div className='container'>
				<div className='row'>
					<div className='col-8'>
						<h1>{title}</h1>
						<p>{description}</p>
					</div>
					<div className='col-4'>
						<br />
						<br />
						<p>
							<strong>Authors :</strong> {formatAuthors(authors)}
						</p>
						<p>
							<strong>Duration:</strong> {timeConverter(duration)} hours
						</p>
						<p>
							<strong>Created:</strong> {creationDate}
						</p>

						<Button
							className='show-course-btn'
							buttonText={BUTTON_LABEL_SHOW_COURSE}
							btnLook='btn btn-outline-secondary'
							onClick={showCourse}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
