import Modal, { IProps } from '../../Modal';
import React, { useEffect } from 'react';
import { Button, Grid } from '@material-ui/core';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { requestBuyStock, requestReBuyStock } from '../../../Store/actions/userAction';
import { fetchStockOnDate } from '../../../Store/actions/stockAction';
import { Wrapper } from './styled';
import { useLocation } from 'react-router-dom';

interface BuyModalProps extends IProps {
	modalData: IStock | null;
	wallet: number;
}
const BuyModal: React.FC<BuyModalProps> = ({ onClose, title, open, modalData, wallet }) => {
	const location = useLocation();
	const [amount, setAmount] = useState<any>(1);
	const { stockOnData } = useSelector((state: any) => state.stockStore);
	const dispatch = useDispatch();
	const onBuy = () => {
		if (modalData) {
			if (wallet < parseFloat(modalData.open) * amount) {
				toast.error("You don't have Enough Cash to buy this amount. ", {});
			} else {
				if (location.pathname !== '/') {
					const buyData: IStock = {
						...modalData,
						volume: parseInt(modalData.volume) + amount,
					};
					dispatch(requestReBuyStock(buyData));
				} else {
					const buyData: IStock = { ...modalData, volume: amount };
					dispatch(requestBuyStock(buyData));
				}
			}
			onClose();
			setAmount(1);
		}
	};
	useEffect(() => {
		if (modalData) {
			dispatch(fetchStockOnDate(modalData));
		}
	}, [modalData, dispatch]);

	return (
		<Modal onClose={onClose} open={open} title={title}>
			<Wrapper container spacing={2} alignItems={'center'}>
				<Grid item md={3}>
					<p>
						<strong>Date:</strong> {modalData?.date}
					</p>
				</Grid>
				<Grid item md={3}>
					<p>
						<strong>Heighest Price:</strong> ${modalData?.high}
					</p>
				</Grid>
				<Grid item md={3}>
					<p>
						<strong>Remaining Volume:</strong> {stockOnData?.volume}
					</p>
				</Grid>
				<Grid item md={3}>
					<p>
						<strong>Lowest Price:</strong> ${modalData?.low}
					</p>
				</Grid>
				<Grid item md={3}>
					<p>
						<strong>Buying Price:</strong> ${modalData?.open}
					</p>
				</Grid>
				<Grid item md={3}>
					<p>
						<strong>Selling Price:</strong> ${modalData?.close}
					</p>
				</Grid>
				<Grid item md={3}>
					<p>
						<strong>Your Wallet:</strong> ${wallet}
					</p>
				</Grid>
				<Grid item md={6}>
					<input
						value={amount}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							if (parseInt(stockOnData?.volume ?? '1') >= parseInt(e.target.value)) {
								setAmount(parseInt(e.target.value));
							}
						}}
						type='number'
						max={stockOnData?.volume}
						min={1}
					/>
				</Grid>
				<Grid item md={6}>
					<Button color='secondary' variant={'contained'} onClick={onBuy}>
						Buy
					</Button>
				</Grid>
			</Wrapper>
		</Modal>
	);
};

export default BuyModal;
