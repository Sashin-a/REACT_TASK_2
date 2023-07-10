import Logo from './components/logo/Logo';
import Button from '../../common/Button/Button';
import './header.css';
import { BUTTON_LABEL_LOGOUT } from '../../constants';
import { useNavigate } from 'react-router-dom';
export default Header;

function Header({ userName }) {
	let navigate = useNavigate();
	const redirectToCourses = () => {
		navigate('/courses');
	};
	const doLogout = () => {
		window.localStorage.removeItem('token');
		navigate('/login');
	};
	if (window.localStorage.getItem('token') === null) {
		return (
			<nav className='navbar navbar-expand-lg bg-body-tertiary'>
				<div className='container'>
					<Logo />
				</div>
			</nav>
		);
	}
	return (
		<nav className='navbar navbar-expand-lg bg-body-tertiary'>
			<div className='container'>
				<Logo />

				<div className='navbar' id='navbarSupportedContent'>
					<div className='container'>
						<div className='row'>
							<div className='col'>
								<label className='nav-item' onClick={redirectToCourses}>
									Courses
								</label>
							</div>

							<div className='col'>
								<label className='nav-item'>{userName}</label>
							</div>

							<div className='col'>
								<Button
									buttonText={BUTTON_LABEL_LOGOUT}
									btnLook='btn btn-outline-danger'
									onClick={doLogout}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
