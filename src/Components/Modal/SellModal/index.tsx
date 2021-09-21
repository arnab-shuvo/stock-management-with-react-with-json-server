import Modal, { IProps } from '../../Modal';
import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { requestSellStock } from '../../../Store/actions/userAction';
import { Wrapper } from '../BuyModal/styled';

interface SellModalProps extends IProps {
	modalData: IStock | null;
	wallet: number;
}
const SellModal: React.FC<SellModalProps> = ({ onClose, title, open, modalData, wallet }) => {
	const [amount, setAmount] = useState<number>(0);
	const { stockOnData } = useSelector((state: any) => state.stockStore);
	const dispatch = useDispatch();
	const onSell = () => {
		if (modalData) {
			if (amount < 0) {
				toast.error('Select Volume to delete', {});
			} else {
				dispatch(requestSellStock(modalData, amount));
			}
		}
		onClose();
		setAmount(1);
	};
	return (
		<Modal onClose={onClose} open={open} title={title}>
			<Wrapper container spacing={2} alignItems={'center'}>
				<Grid item md={2}>
					<p>
						<strong>Date:</strong> {modalData?.date}
					</p>
				</Grid>
				<Grid item md={2}>
					<p>
						<strong>Heighest Price:</strong> ${modalData?.high}
					</p>
				</Grid>
				<Grid item md={2}>
					<p>
						<strong>Remaining Volume:</strong> {stockOnData?.volume}
					</p>
				</Grid>
				<Grid item md={2}>
					<p>
						<strong>Lowest Price:</strong> ${modalData?.low}
					</p>
				</Grid>
				<Grid item md={2}>
					<p>
						<strong>Buying Price:</strong> ${modalData?.open}
					</p>
				</Grid>
				<Grid item md={2}>
					<p>
						<strong>Selling Price:</strong> ${modalData?.close}
					</p>
				</Grid>
				<Grid item md={6}>
					<input
						value={amount}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							if (parseInt(modalData?.volume ?? '1') >= parseInt(e.target.value)) {
								setAmount(parseInt(e.target.value));
							}
						}}
						type='number'
						max={modalData?.volume}
						min={0}
					/>
				</Grid>
				<Grid item md={6}>
					<Button color='secondary' variant={'contained'} onClick={onSell}>
						Sell
					</Button>
				</Grid>
			</Wrapper>
		</Modal>
	);
};

export default SellModal;
