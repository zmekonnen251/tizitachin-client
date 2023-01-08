import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import {
	AppBar,
	Avatar,
	Toolbar,
	Typography,
	Button,
	Box,
} from '@mui/material';
import classes from './styles';
import memoriesLogo from '../../assets/memories-Logo.png';
import memoriesText from '../../assets/memories-Text.png';
import { signOut } from '../../redux/actions/auth';
// import useLocalStorage from '../../hooks/useLocalStorage';

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const profile = JSON.parse(localStorage.getItem('profile'));

	return (
		<AppBar sx={classes.appBar} position='static' color='inherit'>
			<NavLink to='/' sx={classes.brandContainer}>
				<img src={memoriesText} alt='icon' height='45px' />
				<img
					sx={classes.image}
					src={memoriesLogo}
					alt='memories'
					height='40px'
				/>
			</NavLink>
			<Toolbar sx={classes.toolbar}>
				{profile?.user && profile?.accessToken ? (
					<Box sx={classes.profile}>
						<Avatar
							sx={classes.purple}
							alt={profile?.user.name}
							src={profile?.user.imageUrl}
						>
							{profile?.user.name.charAt(0).toUpperCase()}
						</Avatar>
						<Typography sx={classes.userName} variant='h6'>
							{profile?.user.name}
						</Typography>
						<Button
							variant='contained'
							color='error'
							onClick={() => dispatch(signOut(navigate))}
						>
							Logout
						</Button>
					</Box>
				) : (
					<Button
						component={NavLink}
						to='/auth'
						variant='contained'
						color='primary'
					>
						Sign in
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
