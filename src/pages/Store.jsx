import { Card, Container, Typography } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import Masonry from '@mui/lab/Masonry';
import { Context } from '../App';

export default function Store() {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useContext(Context);

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
	}, [cart]);

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

	// Removes a product from the cart
	const handleRemoveProductFromCart = (productId) => {
		const productToUpdate = cart.filter((product) => product.id === productId);
		// BUG: Bug where when removing a single qty from a product, it removes all of it.
		console.log(productToUpdate);
		// If the quantity for the product is more than 1
		if (productToUpdate.qty > 1) {
			const updatedCart = cart.map((product) => {
				if (productId === product.id) {
					return { ...product, qty: (product.qty -= 1) };
				} else {
					return { ...product };
				}
			});
			setCart(updatedCart);
		} else {
			// If the cart has the product with only one as the quantity
			const updatedCart = cart.filter((product) => product.id !== productId);
			setCart(updatedCart);
		}
		console.log(cart);
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
						cart={cart}
						handleAddProductToCart={handleAddProductToCart}
						handleRemoveProductFromCart={handleRemoveProductFromCart}
					/>
				))}
			</Masonry>
		</Container>
	);
}
