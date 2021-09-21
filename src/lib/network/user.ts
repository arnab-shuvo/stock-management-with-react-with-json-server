import { get, patch, post, deleteRequest } from './api';

export const requestWallet = async () => {
	try {
		const response = await get('wallet');
		return response;
	} catch (err) {
		console.error(err);
	}
};
export const requestPortfolio = async () => {
	try {
		const response = await get('portfolio');
		return response;
	} catch (err) {
		console.error(err);
	}
};
export const buyStock = async (data: IStock) => {
	try {
		const response = await post('portfolio', JSON.stringify(data));
		return response;
	} catch (err) {
		console.error(err);
	}
};
export const reBuyStock = async (data: IStock) => {
	const updated: IStock = {
		Name: data.Name,
		close: data.close,
		date: data.date,
		open: data.open,
		high: data.high,
		low: data.low,
		volume: data.volume,
	};
	try {
		const response = await patch(`portfolio/${data.id}`, JSON.stringify(updated));
		return response;
	} catch (err) {
		console.error(err);
	}
};
export const sellAllStock = async (id: number) => {
	try {
		const response = await deleteRequest(`portfolio/${id}`);
		return response;
	} catch (err) {
		console.error(err);
	}
};
export const sellStock = async (data: IStock, id: number) => {
	try {
		const response = await patch(`portfolio/${id}`, JSON.stringify(data));
		return response;
	} catch (err) {
		console.error(err);
	}
};
export const updateWallet = async (data: IWallet) => {
	try {
		const response = await post('wallet', JSON.stringify(data));
		return response;
	} catch (err) {
		console.error(err);
	}
};
