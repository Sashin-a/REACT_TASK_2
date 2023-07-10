const Button = ({ buttonText, onClick, btnLook, disableCondition, type }) => {
	return (
		<>
			<button
				type={type}
				disabled={disableCondition}
				className={
					btnLook == null || btnLook === ''
						? 'btn btn-outline-primary'
						: btnLook
				}
				onClick={onClick}
			>
				{buttonText}
			</button>
		</>
	);
};

export default Button;
