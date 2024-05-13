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

// @ts-ignore
export default function ProductCard({
	product,
	cart,
	handleAddProductToCart,
	handleRemoveProductQtyFromCart,
	handleQtyChange,
	handleRemoveProductFromCart,
}) {
	const inCart = cart.filter((item) => (item.id === product.id ? item : ''));

	return (
		<Box>
			<Card
				sx={{
					display: {
						sm: 'flex',
					},
				}}
				raised
			>
				{/* Product Image */}
				<Box
					sx={{
						width: '100%',
						margin: 'auto',
						maxHeight: '200px',
					}}
					p={1}
				>
					<CardMedia
						component='img'
						image={product.image}
						title={product.title}
						sx={{
							objectFit: 'contain',
							maxHeight: '200px',
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
									<IconButton
										onClick={() => handleRemoveProductFromCart(product.id)}
									>
										<Close />
									</IconButton>
									<IconButton
										onClick={() => handleRemoveProductQtyFromCart(product.id)}
									>
										<Remove />
									</IconButton>
									<TextField
										value={inCart[0].qty}
										sx={{
											flexGrow: '2',
										}}
										onChange={(e) => handleQtyChange(e, product.id)}
										type='number'
									></TextField>
									<IconButton
										onClick={() => handleAddProductToCart(product.id)}
									>
										<Add />
									</IconButton>
								</Box>
							) : (
								<IconButton
									sx={{
										border: '1px solid black',
									}}
									disableTouchRipple
									onClick={() => handleAddProductToCart(product.id)}
								>
									<Add />
								</IconButton>
							)}
						</CardActions>
						<Typography variant='body2'>{product.description}</Typography>
					</CardContent>
				</Box>
			</Card>
		</Box>
	);
}
