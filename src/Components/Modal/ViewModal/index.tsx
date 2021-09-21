import Modal, { IProps } from '../../Modal';
import React from 'react';
import LineChart from '../../Chart/LineChart';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { filterStockDetail } from '../../../Store/actions/stockAction';
import { Wrapper } from '../BuyModal/styled';
import { Grid } from '@material-ui/core';
interface ViewModalProps extends IProps {
	modalData: IStock | null | undefined;
}
const ViewModal: React.FC<ViewModalProps> = ({ onClose, title, open, modalData }) => {
	const { stockOnData } = useSelector((state: any) => state.stockStore);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(filterStockDetail(modalData?.Name ?? ''));
	}, [dispatch, modalData]);
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
			</Wrapper>

			<LineChart />
		</Modal>
	);
};

export default ViewModal;
