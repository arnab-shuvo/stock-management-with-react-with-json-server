interface IStock {
	date: string;
	open: string;
	high: string;
	low: string;
	close: string;
	volume: string;
	Name: string;
	id?: number;
}

interface IStockList {
	stockList: IStock[] | [];
	filteredStockByDate: IStock[] | [];
	stockNameList: string[] | [];
	currentStock: IStock[] | [];
	stockOnData?: IStock;
}
