import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import colors from '../../lib/constants/color';

export const HeaderWrapper = styled(Grid)`
	background: ${colors.primary};
	margin-bottom: 40px;

	.logo {
		font-size: 20px;
		font-weight: bold;
		margin: 0;
		color: #fff;
	}
	.menu {
		margin: 0;
		padding: 0;
		text-align: right;
		li {
			list-style: none;
			display: inline-block;
			margin-left: 20px;
			color: #fff;
			a {
				color: #fff;
				text-decoration: none;
				text-transform: uppercase;
				display: block;
				padding: 20px 20px;
				&.active {
					background: ${colors.secondary};
				}
			}
		}
	}
`;
