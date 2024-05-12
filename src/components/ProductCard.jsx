import { Add, Close, Remove } from '@mui/icons-material';
import {
	Typography,
	Box,
	Card,
	CardContent,
	CardMedia,
	CardActions,
	IconButton,
	TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';

// @ts-ignore
export default function ProductCard({ product, cart, handleAddProductToCart }) {
	const [cartIds, setCartIds] = useState([]);

	const inCart = cart.filter((item) => (item.id === product.id ? item : ''));

	useEffect(() => {
		setCartIds(cart.map((item) => item.id));
	}, []);

	// @ts-ignore
	function handleAddNewProduct(productId) {
		// Update Cart
		handleAddProductToCart(productId);

		// Update CartIds
		// TODO: If its the first time a user added a certain product to cart, modify the card
		if (!cartIds.includes(productId)) {
			setCartIds([...cartIds, productId]);
		}
	}

	return (
		<Box>
			<Card
				sx={{
					// maxWidth: '400px',
					display: 'flex',
				}}
				raised
			>
				{/* Product Image */}
				<Box
					sx={{
						width: '100%',
						margin: 'auto',
					}}
					p={1}
				>
					<CardMedia
						component='img'
						image={product.image}
						title={product.title}
						sx={{
							objectFit: 'contain',
							height: '100%',
							width: '100%',
						}}
					/>
				</Box>
				{/* Product Content */}
				<Box
					sx={{
						width: '100%',
					}}
				>
					<CardContent>
						<Typography variant='h5'>{product.title}</Typography>
						<Typography variant='h6'>${product.price}</Typography>
						{/* Actions for products */}
						<CardActions>
							{inCart.length > 0 ? (
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<IconButton>
										<Close />
									</IconButton>
									<IconButton>
										<Remove />
									</IconButton>
									<TextField value={inCart[0].qty}></TextField>
									<IconButton onClick={() => handleAddNewProduct(product.id)}>
										<Add />
									</IconButton>
								</Box>
							) : (
								<IconButton
									sx={{
										border: '1px solid black',
									}}
									disableTouchRipple
									onClick={() => handleAddNewProduct(product.id)}
								>
									<Add />
								</IconButton>
							)}
							{/* {cartIds.includes(product.id) ? (
								cart.filter((item) =>
									item.id === product.id ? (
										<Box
											sx={{
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
											}}
										>
											<IconButton>
												<Close />
											</IconButton>
											<IconButton>
												<Remove />
											</IconButton>
											<TextField>{item.qty}</TextField>
											<IconButton
												onClick={() => handleAddNewProduct(product.id)}
											>
												<Add />
											</IconButton>
										</Box>
									) : (
										''
									)
								)
							) : (
								<IconButton
									sx={{
										border: '1px solid black',
									}}
									disableTouchRipple
									onClick={() => handleAddNewProduct(product.id)}
								>
									<Add />
								</IconButton>
							)} */}
						</CardActions>
						<Typography variant='body2'>{product.description}</Typography>
					</CardContent>
				</Box>
			</Card>
		</Box>
	);
}
