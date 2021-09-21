import * as React from 'react';
import { HeaderWrapper } from './styled';
import { Grid } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header: React.FC = ({ children }) => {
	const { wallet } = useSelector((state: any) => state.userStore);
	return (
		<HeaderWrapper container justifyContent='center'>
			<Grid item md={9} container alignItems='center'>
				<Grid item md={6} container justifyContent='flex-start'>
					<p className='logo'>Stock Manager</p>
				</Grid>
				<Grid item md={6} container justifyContent='flex-end'>
					<ul className='menu'>
						<li>
							<NavLink exact to={'/'}>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink to={'/portfolio'}>Portfolio</NavLink>
						</li>
						<li>
							<NavLink to={'/analysis'}>Analysis</NavLink>
						</li>
						<li>Your Wallet: {wallet}</li>
					</ul>
				</Grid>
			</Grid>
		</HeaderWrapper>
	);
};

export default Header;
