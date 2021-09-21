import { ActionTypes } from '../../actionsTypes';

const initialState: IStockList = {
	stockList: [],
	stockNameList: [],
	filteredStockByDate: [],
	currentStock: [],
};

const stockReducer = (state = initialState, action: any): IStockList => {
	switch (action.type) {
		case ActionTypes.SET_STOCK_LIST:
			return {
				...state,
				stockList: action.payload,
			};
		case ActionTypes.SET_STOCK_NAME_LIST:
			return {
				...state,
				stockNameList: action.payload,
			};
		case ActionTypes.SET_FILTERED_STOCK:
			return {
				...state,
				filteredStockByDate: action.payload,
			};
		case ActionTypes.SET_CURRENT_STOCK:
			return {
				...state,
				currentStock: action.payload,
			};
		case ActionTypes.SET_STOCK_ON_DATE:
			return {
				...state,
				stockOnData: action.payload,
			};
		default:
			return state;
	}
};

export default stockReducer;
