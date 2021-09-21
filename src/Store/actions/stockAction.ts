import {
	requestStockList,
	requestStockListByName,
	requestStockOnDate,
} from '../../lib/network/stock';
import { ActionTypes } from '../actionsTypes';
import dayjs from 'dayjs';
import { setLoader } from './utiltyAction';

export const setStockList = (data: IStockList) => ({
	type: ActionTypes.SET_STOCK_LIST,
	payload: data,
});
export const setStockNameList = (data: string[]) => ({
	type: ActionTypes.SET_STOCK_NAME_LIST,
	payload: data,
});
export const setStockFiltered = (data: IStockList | []) => ({
	type: ActionTypes.SET_FILTERED_STOCK,
	payload: data,
});
export const setCurrentStock = (data: IStockList | []) => ({
	type: ActionTypes.SET_CURRENT_STOCK,
	payload: data,
});
export const setStockOnDate = (data: IStock) => ({
	type: ActionTypes.SET_STOCK_ON_DATE,
	payload: data,
});

export const fetchStockList = () => {
	return async (dispatch: any) => {
		try {
			dispatch(setLoader(true));
			const stocks = await requestStockList();
			const stockName: string[] = [];
			stocks.forEach((stock: IStock) => {
				if (!stockName.includes(stock.Name)) stockName.push(stock.Name);
			});

			dispatch(setStockList(stocks));
			dispatch(setStockNameList(stockName));
			dispatch(setLoader(false));
		} catch (error) {
			throw new Error('as');
		}
	};
};
export const filterStockByDate = (name: string, date: Date) => {
	return async (dispatch: any, getStore: any) => {
		try {
			const stocks = await requestStockListByName(name);
			const filteredByDate: IStockList | [] = stocks.filter((stock: IStock) =>
				dayjs(stock.date).isAfter(dayjs(date), 'day'),
			);
			dispatch(setStockFiltered(filteredByDate));
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
};
export const filterStockDetail = (name: string) => {
	return async (dispatch: any, getStore: any) => {
		try {
			const stocks = await requestStockListByName(name);
			dispatch(setCurrentStock(stocks));
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
};

export const fetchStockOnDate = (data: IStock) => {
	return async (dispatch: any, getStore: any) => {
		try {
			const stocks = await requestStockOnDate(data);
			dispatch(setStockOnDate(stocks[0]));
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
};
