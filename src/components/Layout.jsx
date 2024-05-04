// Component used for showing Appbars, footers, sidebars, etc on every page
import {
	AppBar,
	Box,
	Button,
	ButtonGroup,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

export default function Layout({ children }) {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();
	const menuItems = [
		{
			text: 'Home',
			path: '/',
		},
		{
			text: 'Store',
			path: '/store',
		},
		{
			text: 'Your Cart',
			path: '/cart',
		},
	];

	const handleOpenMenu = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	return (
		<Box>
			<AppBar elevation={1}>
				<Toolbar>
					<Typography
						sx={{
							textWrap: 'noWrap',
							flexGrow: 1,
						}}
					>
						Mock eShop
					</Typography>
					<ButtonGroup
						sx={{
							display: {
								xs: 'none',
								sm: 'initial',
							},
						}}
					>
						{menuItems.map((item) => (
							<Button
								key={item.text}
								onClick={() => navigate(item.path)}
								variant='text'
								sx={{
									textWrap: 'noWrap',
								}}
							>
								<Typography color='textPrimary'>{item.text}</Typography>
							</Button>
						))}
					</ButtonGroup>
					<Button
						onClick={handleOpenMenu}
						sx={{
							display: {
								sm: 'none',
							},
						}}
					>
						<Typography color='textSecondary'>
							<MenuIcon fontSize='large' />
						</Typography>
					</Button>
					<Menu open={open} anchorEl={anchorEl} onClick={handleCloseMenu}>
						{menuItems.map((item) => (
							<MenuItem key={item.text} onClick={() => navigate(item.path)}>
								<Typography variant='body1'>{item.text}</Typography>
							</MenuItem>
						))}
					</Menu>
				</Toolbar>
			</AppBar>
			<Toolbar />
			{children}
		</Box>
	);
}
