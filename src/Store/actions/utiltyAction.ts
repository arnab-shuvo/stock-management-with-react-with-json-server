import { ActionTypes } from '../actionsTypes';

export const setSelectedDate = (date: Date) => ({
	type: ActionTypes.SET_DATE_FILTER,
	payload: date,
});
export const setLoader = (loader: boolean) => ({
	type: ActionTypes.SET_LOADER,
	payload: loader,
});
export const setStockFilter = (filter: string) => ({
	type: ActionTypes.SET_STOCK_FILTER,
	payload: filter,
});
