import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Container,
	Typography,
} from '@mui/material';
import { Context } from '../App';
import { useContext } from 'react';
import ProductCard from '../components/ProductCard';

export default function Cart() {
	const { productsContext, cartContext } = useContext(Context);
	const [products, setProducts] = productsContext;
	const [cart, setCart] = cartContext;

	const productCart = cart.concat(
		products.filter((product) =>
			cart.some((cartProduct) => cartProduct.id === product.id)
		)
	);

	return (
		<Container>
			<Typography component='h5' variant='h5'>
				Cart and Checkout
			</Typography>
			<Box>
				{productCart.map((product) => (
					<Typography>{product.title}</Typography>
				))}
			</Box>
		</Container>
	);
}
