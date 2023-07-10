import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';
import { useState } from 'react';
import './searchBar.css';
import { BUTTON_LABEL_SEARCH } from '../../../../constants';

export default SearchBar;

function SearchBar({ onSearch }) {
	const [title, setTitle] = useState('');

	const handleInputChange = (event) => {
		setTitle(event.target.value);
		if (event.target.value.length === 0) {
			onSearch('');
		}
	};

	const searchText = () => {
		onSearch(title);
	};

	return (
		<>
			<nav className='container'>
				<div className='row'>
					<div className='col-5 course-text'>
						<Input
							placeholderText='Enter Course Name'
							labelText='Enter Course Name'
							onChange={handleInputChange}
							type='text'
						/>
					</div>

					<div className='col btn-search'>
						<Button
							buttonText={BUTTON_LABEL_SEARCH}
							onClick={searchText}
							btnLook='btn btn-outline-info'
						/>
					</div>

					<div className='col-5'></div>
				</div>
			</nav>
		</>
	);
}
