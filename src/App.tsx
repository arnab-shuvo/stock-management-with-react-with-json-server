import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import InterviewWelcome from './ALTERYX_ONLY_DO_NOT_MODIFY/InterviewWelcome.alteryx';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import Portfolio from './Pages/Portfolio';
import { fetchStockList } from './Store/actions/stockAction';
import { fetchUserWallet, fetchUserPortfolio } from './Store/actions/userAction';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Components/Loader';
import Analysis from './Pages/Analysis';

const useStyles = makeStyles({
	app: {
		paddingTop: 16,
	},
});

const App: React.FC = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	useEffect(() => {
		dispatch(fetchStockList());
		dispatch(fetchUserWallet());
		dispatch(fetchUserPortfolio());
	}, [dispatch]);
	return (
		<Router>
			<Loader />
			<Layout>
				<Switch>
					<Route exact path='/requirement'>
						<Container className={classes.app} maxWidth='md'>
							<InterviewWelcome />
						</Container>
					</Route>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route exact path='/portfolio'>
						<Portfolio />
					</Route>
					<Route exact path='/analysis'>
						<Analysis />
					</Route>
				</Switch>
			</Layout>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</Router>
	);
};

export default App;
