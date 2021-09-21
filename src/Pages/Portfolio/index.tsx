import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DataTable from '../../Components/Table';
import BuyModal from '../../Components/Modal/BuyModal';
import SellModal from '../../Components/Modal/SellModal';
import ViewModal from '../../Components/Modal/ViewModal';
import Grid from '@material-ui/core/Grid/Grid';

const Portfolio: React.FC = () => {
	const { wallet, portfolio } = useSelector((state: any) => state.userStore);
	const [showBuy, setShowBuy] = useState<boolean>(false);
	const [showSell, setShowSell] = useState<boolean>(false);
	const [showView, setShowView] = useState<boolean>(false);
	const [modalType, setModalType] = useState<string>('Buy');
	const [modalData, setModalData] = useState<IStock | null>(null);

	const onBuy = (stock: IStock) => {
		setModalData(stock);
		setModalType('Buy');
		setShowBuy(true);
	};
	const onSell = (stock: IStock) => {
		setShowSell(true);
		setModalData(stock);
		setModalType('Sell');
	};
	const onView = (stock: IStock) => {
		setModalData(stock);
		setModalType('View');
		setShowView(true);
	};
	const onCloseModal = () => {
		setModalData(null);
		setShowView(false);
		setShowBuy(false);
		setShowSell(false);
	};
	return (
		<Grid container justifyContent={'center'}>
			<Grid container item md={9} xs={11} justifyContent={'center'}>
				{portfolio.length ? (
					<>
						<DataTable
							data={portfolio}
							showSell={true}
							onBuy={onBuy}
							onSell={onSell}
							onView={onView}
						/>
						<BuyModal
							modalData={modalData}
							wallet={wallet}
							onClose={onCloseModal}
							open={showBuy}
							title={modalType}
						/>
						<SellModal
							modalData={modalData}
							wallet={wallet}
							onClose={onCloseModal}
							open={showSell}
							title={modalType}
						/>
						<ViewModal
							modalData={modalData}
							onClose={onCloseModal}
							open={showView}
							title={modalType}
						/>
					</>
				) : (
					'No Data Found'
				)}
			</Grid>
		</Grid>
	);
};

export default Portfolio;
