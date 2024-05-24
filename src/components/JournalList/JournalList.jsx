import './JournalList.css';

import CardButton from '../CardButton/CardButton.jsx';
import JournalItem from '../JournalItem/JournalItem.jsx';
import {useContext, useMemo} from 'react';
import {UserContext} from '../../context/user.context.jsx';

function JournalList({items, setItem}) {
	const {userId} = useContext(UserContext);
	
	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else  {
			return -1;
		}
	};

	const filterItems = useMemo(() =>items
		.filter(item => item.userId === userId)
		.sort(sortItems), [items, userId]);

	if (items.length === 0) {
		return <p>Записей пока нет, но вы можете добавить</p>;
	}

	return <>
		{filterItems
			.map(element => (
				<CardButton key={element.id} onClick={() => setItem(element)}>
					<JournalItem
						title={element.title}
						date={element.date}
						text={element.text}
					/>
				</CardButton>
			))}
	</>;
}

export default JournalList;