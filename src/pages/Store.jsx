import { Card, Container, Typography } from '@mui/material';
import { useEffect, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import Masonry from '@mui/lab/Masonry';
import { Context } from '../App';

export default function Store({
	handleAddProductToCart,
	handleRemoveProductQtyFromCart,
	handleQtyChange,
	handleRemoveProductFromCart,
}) {
	const { cartContext, productsContext } = useContext(Context);
	const [products, setProducts] = productsContext;
	const [cart, setCart] = cartContext;

	// fetch data
	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('https://fakestoreapi.com/products', {
				method: 'GET',
				mode: 'cors',
				headers: { 'Content-Type': 'application/json' },
			})
				.then((response) => response.json())
				.then((json) => setProducts(json));
		};
		fetchData();
	}, []);

	return (
		<Container>
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
				{products.map((product) => (
					// @ts-ignore
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
		</Container>
	);
}
