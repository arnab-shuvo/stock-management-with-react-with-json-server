import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import { Button } from '@material-ui/core';
import TablePaginationActions from './TablePaginationActions';
import { useSelector } from 'react-redux';

type TableProps = {
	column?: string[];
	data: any[];
	dataKey?: string[];
	onBuy: (t: any) => void;
	onSell: (t: any) => void;
	onView: (t: any) => void;
	showSell?: boolean;
};

const defaultColumn = [
	'Name',
	'Date',
	'Quantity',
	'Buying Price',
	'Selling Price',
	'Highest Price',
	'Lowest Price',
];
const defaultKey = ['Name', 'date', 'volume', 'open', 'close', 'high', 'low'];

const DataTable: React.FC<TableProps> = ({
	column = defaultColumn,
	data,
	dataKey = defaultKey,
	onBuy,
	onSell,
	onView,
	showSell = false,
}) => {
	const [page, setPage] = useState<number>(0);

	const { wallet } = useSelector((state: any) => state.userStore);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	return (
		<TableContainer component={Paper}>
			<Table aria-label='simple table'>
				<TableHead>
					<TableRow>
						{column.map((col: string, index: number) => {
							return (
								<TableCell
									key={index}
									align={
										index === 0
											? 'left'
											: index === column.length
											? 'right'
											: 'center'
									}>
									{col}
								</TableCell>
							);
						})}
						<TableCell align='right'>Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{(rowsPerPage > 0
						? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: data
					).map((row: any, index: number) => (
						<TableRow key={index}>
							{dataKey.map((obKey: string, i: number) => {
								return (
									<TableCell
										align={
											i === 0
												? 'left'
												: i === dataKey.length
												? 'right'
												: 'center'
										}
										component='th'
										scope='row'
										key={i}>
										{row[obKey]}
									</TableCell>
								);
							})}
							<TableCell align='right'>
								{wallet > row.open && (
									<Button onClick={() => onBuy(row)} color='primary'>
										Buy
									</Button>
								)}
								{showSell && (
									<Button onClick={() => onSell(row)} color='secondary'>
										Sell
									</Button>
								)}

								<Button onClick={() => onView(row)} color='primary'>
									View Detail
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
							colSpan={12}
							count={data.length}
							rowsPerPage={rowsPerPage}
							page={page}
							SelectProps={{
								inputProps: { 'aria-label': 'rows per page' },
								native: true,
							}}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
							ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
};

export default DataTable;
