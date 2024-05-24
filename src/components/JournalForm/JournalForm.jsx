import styles from './JournalForm.module.css';
import Button from '../Button/Button.jsx';
import {useEffect, useReducer, useRef, useContext} from 'react';
import cn from 'classnames';
import {INITIAL_STATE, formReducer} from './JournalForm.state';
import Input from '../Input/Input.jsx';
import {UserContext} from '../../context/user.context.jsx';


function JournalForm({onSubmit, data, onDelete}) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormRedyToSubmit, values} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();
	const {userId} = useContext(UserContext);

	const focusError = (isValid) => {
		switch (true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.text:
			textRef.current.focus();
			break;
		}
	};


	useEffect(() => {
		if (!data) {
			dispatchForm({ type: 'CLEAR' });
			dispatchForm({type: 'SET_VALUE', payload: {userId}});
		}
		dispatchForm({type: 'SET_VALUE', payload: data});
	}, [data]);

	useEffect(() => {
		let timerId;
		if (!isValid.title || !isValid.date || !isValid.text) {
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({type: 'RESET_VALIDITY'});
			},2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormRedyToSubmit) {
			onSubmit(values);
			dispatchForm({ type: 'CLEAR' });
			dispatchForm({type: 'SET_VALUE', payload: {userId}});
		}
	}, [isFormRedyToSubmit, values, onSubmit, userId]);

	useEffect(() => {
		dispatchForm({type: 'SET_VALUE', payload: {userId}});
	}, [userId]);

	const onChange = (event) => {
		dispatchForm({type: 'SET_VALUE', payload: {[event.target.name]: event.target.value}});
	};

	const addJournalItem = (event) => {
		event.preventDefault();
		dispatchForm({type: 'SUBMIT' });
	};

	const deleteJournalItem = () => {
		onDelete(data.id);
		dispatchForm({ type: 'CLEAR' });
		dispatchForm({type: 'SET_VALUE', payload: {userId}});
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['form-row']}>
				<Input type='text' name='title' ref={titleRef} isValid={isValid.title} onChange={onChange} value={values.title} appearance='title'/>
				{data?.id && <button className={styles['delete']} type="button" onClick={deleteJournalItem}>
					<img src='/archive.svg' alt='Иконка корзины'/>
				</button>}
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='date' className={styles['form-label']}>
					<img src='/calendar.svg' alt='Иконка календаря'/>
					<span>Дата</span>
				</label>
				<Input type='date' name='date' ref={dateRef} isValid={isValid.date} onChange={onChange} value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''} id='date'/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='tag' className={styles['form-label']}>
					<img src='/folder.svg' alt='Иконка папки'/>
					<span>Метки</span>
				</label>
				<Input type='text' name='tag' onChange={onChange} value={values.tag} id='tag'/>
			</div>


			<textarea name='text' ref={textRef} onChange={onChange} value={values.text}  cols='30' rows='10'
				className={cn(styles['input'], {[styles['invalid']]: !isValid.text})}></textarea>
			<Button>Сохранить</Button>
		</form>
	);
}

export default JournalForm;