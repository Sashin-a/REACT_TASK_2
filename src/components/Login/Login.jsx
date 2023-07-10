import { useState } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';
// import { usePost } from '../../helpers/usePost';

export default Login;

function Login({ parentCallback }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// const [token, setToken] = useState();
	const [name, setName] = useState('Sashin');
	let navigate = useNavigate();

	const handleNavigationToRegistration = () => {
		navigate('/registration');
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const newUser = {
			name,
			password,
			email,
		};
		const response = await fetch('http://localhost:4000/login', {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		if (result.result) {
			window.localStorage.setItem('token', result.result);
			setName(result.user.name);
			console.log(name);
			parentCallback(name);
			navigate('/courses');
		}
	};
	return (
		<>
			<div className='container'>
				<div className='row'>
					<h1>Login</h1>
				</div>
				<br />
				<form onSubmit={handleSubmit}>
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
							type='submit'
							buttonText='Login'
							btnLook='btn btn-primary'
							disableCondition={!email || !password}
						/>
						{/* <button>Submit</button> */}
						<label>
							If you don't have an account
							<Button
								onClick={handleNavigationToRegistration}
								buttonText='SignUp Here'
								btnLook='btn btn-link'
							/>
						</label>
					</div>
				</form>
				{/* <div className="row">
                    <label htmlFor=""></label>
                </div> */}
			</div>
		</>
	);
}
