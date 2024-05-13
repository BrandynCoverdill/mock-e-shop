import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Container,
	Grid,
	Typography,
} from '@mui/material';
import { Context } from '../App';
import { useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { Masonry } from '@mui/lab';

export default function Cart({
	handleAddProductToCart,
	handleRemoveProductQtyFromCart,
	handleQtyChange,
	handleRemoveProductFromCart,
}) {
	const { productsContext, cartContext } = useContext(Context);
	const [products, setProducts] = productsContext;
	const [cart, setCart] = cartContext;

	const productCart = [];

	products.map((product) =>
		cart.map((cartProduct) => {
			if (cartProduct.id === product.id) {
				productCart.push({
					...product,
					qty: cartProduct.qty,
				});
			}
		})
	);

	return (
		<Container>
			<Typography component='h5' variant='h5'>
				Cart and Checkout
			</Typography>
			<Box>
				<Masonry
					spacing={3}
					columns={{
						xs: 1,
						md: 2,
					}}
					sx={{
						my: 1,
						margin: 'auto',
					}}
				>
					{productCart.map((product) => (
						<ProductCard
							product={product}
							cart={cart}
							handleAddProductToCart={handleAddProductToCart}
							handleRemoveProductQtyFromCart={handleRemoveProductQtyFromCart}
							handleQtyChange={handleQtyChange}
							handleRemoveProductFromCart={handleRemoveProductFromCart}
						/>
					))}
				</Masonry>
			</Box>
		</Container>
	);
}
