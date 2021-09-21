import { get } from './api';

export const requestStockList = async () => {
	try {
		const response = await get('stockPrices');
		return response;
	} catch (err) {
		console.error(err);
	}
};
export const requestStockListByName = async (name: string) => {
	try {
		const response = await get(`stockPrices?Name=${name}`);
		return response;
	} catch (err) {
		console.error(err);
	}
};
export const requestStockOnDate = async (data: IStock) => {
	try {
		const response = await get(`stockPrices?Name=${data.Name}&date=${data.date}`);
		return response;
	} catch (err) {
		console.error(err);
	}
};
