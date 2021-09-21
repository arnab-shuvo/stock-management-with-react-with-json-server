import { ActionTypes } from '../../actionsTypes';

const initialState: IUserStore = {
	wallet: 0,
	portfolio: [],
};

const userReducer = (state = initialState, action: any): IUserStore => {
	switch (action.type) {
		case ActionTypes.SET_BALANCE:
			return {
				...state,
				wallet: action.payload,
			};
		case ActionTypes.SET_PORTFOLIO:
			return {
				...state,
				portfolio: action.payload,
			};
		default:
			return state;
	}
};

export default userReducer;
