import {
	Box,
	Button,
	Card,
	Container,
	Divider,
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

	const taxRate = 0.06;

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
			<Typography component='h4' variant='h4' my={1}>
				Cart and Checkout
			</Typography>
			<Box>
				<Masonry
					spacing={3}
					columns={{
						xs: 1,
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
							key={product.id}
						/>
					))}
				</Masonry>
				{productCart.length > 0 ? (
					<Box m={1}>
						<Typography variant='h6' m={1}>
							Before Taxes: $
							{
								+productCart
									.reduce((acc, cur) => acc + cur.price * cur.qty, 0)
									.toFixed(2)
							}
						</Typography>
						<Typography variant='h6' m={1}>
							Sales Tax (6%): $
							{(
								+productCart
									.reduce((acc, cur) => acc + cur.price * cur.qty, 0)
									.toFixed(2) * taxRate
							).toFixed(2)}
						</Typography>
						<Divider />
						<Typography variant='h4' m={1}>
							Total Cost: $
							{(
								+productCart
									.reduce((acc, cur) => acc + cur.price * cur.qty, 0)
									.toFixed(2) *
								(taxRate + 1)
							).toFixed(2)}
						</Typography>
						<Box m={1}>
							<Button size='large' variant='contained'>
								Continue to Checkout
							</Button>
						</Box>
					</Box>
				) : null}
			</Box>
		</Container>
	);
}
