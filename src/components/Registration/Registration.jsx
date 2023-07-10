import { useState } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';

export default Registration;

function Registration() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	let navigate = useNavigate();

	const handleNavigationToLogin = () => {
		navigate('/login');
	};
	const onRegistrationClicked = async () => {
		// alert('Login is not implemented yet');
		const newUser = {
			name,
			password,
			email,
		};
		const response = await fetch('http://localhost:4000/register', {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		if (result.result) {
			window.localStorage.setItem('token', result.result);
			navigate('/login');
		}
	};

	return (
		<>
			<div className='container'>
				<div className='row'>
					<h2>Registration</h2>
				</div>
				<br />
				<div className='row'>
					<div className='col-4'>
						<Input
							value={name}
							labelText='Name'
							placeholderText='Enter name'
							type='text'
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
				</div>
				<div className='row'>
					<div className='col-4'>
						<Input
							value={email}
							labelText='Email'
							placeholderText='Enter email'
							type='text'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
				</div>
				<div className='row'>
					<div className='col-4'>
						<Input
							labelText='Password'
							value={password}
							placeholderText='Enter password'
							type='password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</div>
				<div className='row col-4'>
					<Button
						buttonText='Register'
						btnLook='btn btn-primary'
						onClick={onRegistrationClicked}
						disableCondition={!email || !password}
						type='submit'
					/>

					<label>
						If you have an account you can
						<Button
							onClick={handleNavigationToLogin}
							buttonText='Login'
							btnLook='btn btn-link'
						/>
					</label>
				</div>
				{/* <div className="row">
                    <label htmlFor=""></label>
                </div> */}
			</div>
		</>
	);
}
