import styles from './SelectUser.module.css';
import {useContext} from 'react';
import {UserContext} from '../../context/user.context.jsx';

function SelectUser() {
	const {userId, setUserId} = useContext(UserContext);

	const changeUser = (event) => {
		setUserId(Number(event.target.value));
	};

	return (
		<select className={styles['select']} name="user" id="user" value={userId} onChange={changeUser}>
			<option value="1">Пользователь 1</option>
			<option value="2">Пользователь 2</option>
			<option value="3">Пользователь 3</option>
		</select>
	);
}

export default SelectUser;