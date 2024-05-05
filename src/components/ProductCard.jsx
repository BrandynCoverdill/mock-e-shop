import { Add } from '@mui/icons-material';
import {
	Typography,
	Box,
	Card,
	CardContent,
	CardMedia,
	CardActions,
	IconButton,
} from '@mui/material';

// @ts-ignore
export default function ProductCard({ product, handleAddProductToCart }) {
	// @ts-ignore
	function handleAddNewProduct(productId) {
		handleAddProductToCart(productId);
		// If its the first time a user added a certain product to cart, modify the card

		// Modify card to show the number of product is in the cart
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
							<IconButton
								sx={{
									border: '1px solid black',
								}}
								disableTouchRipple
								onClick={() => handleAddNewProduct(product.id)}
							>
								<Add />
							</IconButton>
						</CardActions>
						<Typography variant='body2'>{product.description}</Typography>
					</CardContent>
				</Box>
			</Card>
		</Box>
	);
}
