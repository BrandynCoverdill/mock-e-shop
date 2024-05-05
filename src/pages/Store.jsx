import { Card, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Masonry from '@mui/lab/Masonry';

export default function Store() {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('https://fakestoreapi.com/products');
			const json = await res.json();
			setProducts(json);
		};
		fetchData();
	}, []);

	// Adds a product to the cart
	const handleAddProductToCart = (productId) => {
		let isInCart = false;
		cart.filter((product) =>
			productId === product.id ? (isInCart = true) : null
		);
		// If product isnt there, add it to the cart
		if (!isInCart) {
			setCart([
				...cart,
				{
					id: productId,
					qty: 1,
				},
			]);
		} else {
			// If product is there, update the quantity to cart
			const nextCart = cart.map((product) => {
				if (productId === product.id) {
					return { ...product, qty: (product.qty += 1) };
				} else {
					return { ...product };
				}
			});
			setCart(nextCart);
		}
	};

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
						handleAddProductToCart={handleAddProductToCart}
					/>
				))}
			</Masonry>
		</Container>
	);
}
