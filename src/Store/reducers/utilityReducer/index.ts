import { ActionTypes } from '../../actionsTypes';

const initialState: IUtility = {
	loading: false,
	selectedDate: null,
	selectedStock: '',
};

const utilityReducer = (state = initialState, action: any): IUtility => {
	switch (action.type) {
		case ActionTypes.SET_LOADER:
			return {
				...state,
				loading: action.payload,
			};
		case ActionTypes.SET_DATE_FILTER:
			return {
				...state,
				selectedDate: action.payload,
			};
		case ActionTypes.SET_STOCK_FILTER:
			return {
				...state,
				selectedStock: action.payload,
			};
		default:
			return state;
	}
};

export default utilityReducer;
