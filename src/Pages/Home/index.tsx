import * as React from 'react';
import { Grid } from '@material-ui/core';
import { HomeWrapper } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import dayjs from 'dayjs';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import utils from '@date-io/dayjs';
import { useEffect, useState } from 'react';
import { filterStockByDate } from '../../Store/actions/stockAction';
import { setSelectedDate, setStockFilter } from '../../Store/actions/utiltyAction';
import DataTable from '../../Components/Table';
import BuyModal from '../../Components/Modal/BuyModal';
import ViewModal from '../../Components/Modal/ViewModal';

const Home: React.FC = () => {
	const { stockNameList, filteredStockByDate } = useSelector((state: any) => state.stockStore);
	const { selectedDate, selectedStock } = useSelector((state: any) => state.utilityStore);
	const { wallet } = useSelector((state: any) => state.userStore);
	const [showBuy, setShowBuy] = useState<boolean>(false);
	const [showView, setShowView] = useState<boolean>(false);
	const [modalType, setModalType] = useState<string>('Buy');
	const [modalData, setModalData] = useState<IStock | null>(null);
	const dispatch = useDispatch();

	const onBuy = (stock: IStock) => {
		setModalData(stock);
		setShowBuy(true);
		setModalType('Buy');
	};
	const onSell = (stock: IStock) => {
		setModalData(stock);
		setShowBuy(true);
		setModalType('Sell');
	};
	const onView = (stock: IStock) => {
		setModalData(stock);
		setShowView(true);
		setModalType('View');
	};
	const onCloseModal = () => {
		setModalData(null);
		setShowView(false);
		setShowBuy(false);
	};

	useEffect(() => {}, []);

	useEffect(() => {
		if (selectedDate && selectedStock !== '') {
			dispatch(filterStockByDate(selectedStock, selectedDate));
		}
	}, [selectedStock, selectedDate, dispatch]);

	return (
		<HomeWrapper container justifyContent={'center'}>
			<Grid container item md={9} xs={11} justifyContent={'center'} alignItems={'center'}>
				<Grid item md={3} xs={11}>
					<MuiPickersUtilsProvider utils={utils}>
						<KeyboardDatePicker
							disableToolbar
							variant='inline'
							format='MM/DD/YYYY'
							margin='normal'
							id='date-picker-inline'
							label='Select Start Date'
							value={selectedDate}
							minDate={dayjs('01/01/2017')}
							maxDate={dayjs('12/31/2017')}
							onChange={(e: any) => {
								dispatch(setSelectedDate(e));
							}}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
					</MuiPickersUtilsProvider>
				</Grid>
				<Grid item md={3} xs={11}>
					<Autocomplete
						id='combo-box-demo'
						options={stockNameList}
						getOptionLabel={(option: string) => option}
						style={{ width: 300 }}
						onInputChange={(event, newInputValue) => {
							dispatch(setStockFilter(newInputValue));
						}}
						defaultValue={selectedStock}
						renderInput={(params) => {
							return (
								<TextField
									{...params}
									value={selectedStock}
									label='Select Stock Name'
									variant='standard'
								/>
							);
						}}
					/>
				</Grid>
				<Grid item md={12}>
					{filteredStockByDate.length ? (
						<DataTable
							onBuy={onBuy}
							onSell={onSell}
							onView={onView}
							data={filteredStockByDate}
							column={[
								'Name',
								'Date',
								'Quantity',
								'Buying Price',
								'Selling Price',
								'Highest Price',
								'Lowest Price',
							]}
							dataKey={['Name', 'date', 'volume', 'open', 'close', 'high', 'low']}
						/>
					) : (
						<p>Select Filters above to search</p>
					)}
				</Grid>
			</Grid>
			{modalData && (
				<BuyModal
					modalData={modalData}
					wallet={wallet}
					onClose={onCloseModal}
					open={showBuy}
					title={modalType}
				/>
			)}

			{modalData && (
				<ViewModal
					modalData={modalData}
					onClose={onCloseModal}
					open={showView}
					title={modalType}
				/>
			)}
		</HomeWrapper>
	);
};

export default Home;
