import * as React from 'react';
import Header from '../Header';
// import Footer from '../Footer';
import Grid from '@material-ui/core/Grid';

const Layout: React.FC = ({ children }) => {
	return (
		<Grid container>
			<Grid item xs={12}>
				<Header />
			</Grid>
			<Grid item xs={12}>
				{children}
			</Grid>
			{/* <Grid item xs={12}>
				<Footer />
			</Grid> */}
		</Grid>
	);
};

export default Layout;
