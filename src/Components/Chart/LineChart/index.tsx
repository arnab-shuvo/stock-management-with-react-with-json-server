import React, { useState } from 'react';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const options = {
	scales: {
		yAxes: [
			{
				ticks: {
					beginAtZero: true,
				},
			},
		],
	},
};

const LineChart: React.FC = () => {
	const { currentStock } = useSelector((state: any) => state.stockStore);
	const [chartData, setChartData] = useState<any>(null);

	const randomCode = () => {
		return Math.random() * (255 - 0) + 0;
	};

	useEffect(() => {
		const randomColor = `rgb(${randomCode()},${randomCode()},${randomCode()})`;
		const randomBorderColor = `rgba(${randomCode()},${randomCode()},${randomCode()},0.5)`;
		if (currentStock.length) {
			const labels: string[] = [];
			const data: number[] = [];

			currentStock.forEach((stock: IStock) => {
				labels.push(stock.date);
				data.push(parseFloat(stock.high));
				console.log('11');
			});

			const tempDataForChart = {
				labels: labels,
				datasets: [
					{
						label: `Price of ${currentStock[0].Name}`,
						data: data,
						fill: false,
						backgroundColor: randomColor,
						borderColor: randomBorderColor,
					},
				],
			};
			setChartData(tempDataForChart);
		}
	}, [currentStock]);

	console.log(chartData, '==dataSet');

	return <>{currentStock.length && chartData && <Line data={chartData} options={options} />}</>;
};

export default LineChart;
