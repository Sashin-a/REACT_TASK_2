import './Input.css';
export default Input;

function Input({ labelText, placeholderText, onChange, type, value }) {
	return (
		<div className='mb-3'>
			<label htmlFor='input'>{labelText}</label>
			<input
				className='form-control'
				value={value}
				type={type}
				id='input'
				placeholder={placeholderText}
				onChange={onChange}
			/>
		</div>
	);
}
