export const INITIAL_STATE = {
	isValid: {
		title: true,
		date: true,
		text: true
	},
	values: {
		title: '',
		date: '',
		text: '',
		tag: ''
	},
	isFormRedyToSubmit: false
};

export function formReducer(state, action) {
	switch (action.type) {
	case 'SET_VALUE':
		return {...state, values: {...state.values, ...action.payload}};
	case 'CLEAR':
		return {...state, values: INITIAL_STATE.values, isFormRedyToSubmit: false};
	case 'RESET_VALIDITY':
		return {...state, isValid: INITIAL_STATE.isValid};
	case 'SUBMIT': {
		const titleValidity = state.values.title.trim().length > 0;
		const textValidity = state.values.text.trim().length > 0;
		const dateValidity = state.values.date;
		return {
			...state,
			isValid: {
				title: titleValidity,
				date: dateValidity,
				text: textValidity
			},
			isFormRedyToSubmit: titleValidity && dateValidity && textValidity
		};
	}
	}
}

