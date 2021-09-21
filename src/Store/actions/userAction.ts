import { toast } from 'react-toastify';
import {
	requestWallet,
	requestPortfolio,
	reBuyStock,
	buyStock,
	sellStock,
	sellAllStock,
	updateWallet,
} from '../../lib/network/user';
import { ActionTypes } from '../actionsTypes';
import { setLoader } from './utiltyAction';

const setWallet = (wallet: number) => ({
	type: ActionTypes.SET_BALANCE,
	payload: wallet,
});
const setPortfolio = (data: IStockList) => ({
	type: ActionTypes.SET_PORTFOLIO,
	payload: data,
});

export const fetchUserWallet = () => {
	return async (dispatch: any) => {
		try {
			const wallet = await requestWallet();
			dispatch(setWallet(wallet.balance));
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
};
export const fetchUserPortfolio = () => {
	return async (dispatch: any) => {
		try {
			const portfolio = await requestPortfolio();
			dispatch(setPortfolio(portfolio));
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
};

export const requestBuyStock = (data: IStock) => {
	return async (dispatch: any, getStore: any) => {
		try {
			dispatch(setLoader(true));
			const { wallet } = getStore().userStore;
			const walletCalculation = parseFloat(
				(wallet - parseFloat(data.open) * parseInt(data.volume)).toFixed(2),
			);
			await buyStock(data);
			dispatch(fetchUserPortfolio());
			dispatch(requestUpdateWallet(walletCalculation));
			dispatch(setLoader(false));
			toast.success('Bought Successfully ', {});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
};

export const requestReBuyStock = (data: IStock) => {
	return async (dispatch: any, getStore: any) => {
		try {
			dispatch(setLoader(true));
			const { wallet } = getStore().userStore;
			const walletCalculation = parseFloat(
				(wallet - parseFloat(data.open) * parseInt(data.volume)).toFixed(2),
			);
			await reBuyStock(data);
			dispatch(fetchUserPortfolio());
			dispatch(requestUpdateWallet(walletCalculation));
			dispatch(setLoader(false));
			toast.success('Bought Successfully ', {});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
};

export const requestSellStock = (data: IStock, amount: number) => {
	return async (dispatch: any, getStore: any) => {
		try {
			dispatch(setLoader(true));
			const { wallet } = getStore().userStore;
			const walletCalculation = parseFloat(
				(wallet + parseFloat(data.close) * parseInt(data.volume)).toFixed(2),
			);
			if (parseInt(data.volume) === amount) {
				await sellAllStock(data.id ?? 1);
			} else {
				const newStock: IStock = {
					...data,
					volume: (parseInt(data.volume) - amount).toString(),
				};

				await sellStock(newStock, data.id ?? 1);
			}

			dispatch(fetchUserPortfolio());
			dispatch(requestUpdateWallet(walletCalculation));
			dispatch(setLoader(false));
			toast.success('Sold Successfully ', {});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
};
export const requestUpdateWallet = (wallet: number) => {
	return async (dispatch: any) => {
		try {
			const updatedWallet: IWallet = {
				balance: wallet,
			};
			const newWallet = await updateWallet(updatedWallet);
			dispatch(setWallet(newWallet.balance));
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
};
