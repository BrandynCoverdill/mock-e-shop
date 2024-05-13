import { Card, Container, Typography } from '@mui/material';
import { useEffect, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import Masonry from '@mui/lab/Masonry';
import { Context } from '../App';

export default function Store() {
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
	const handleRemoveProductQtyFromCart = (productId) => {
		const productToUpdate = cart.filter((product) => product.id === productId);
		// If the quantity for the product is more than 1
		if (productToUpdate[0].qty > 1) {
			const updatedCart = cart.map((product) => {
				if (productToUpdate[0].id === product.id) {
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
	};

	// Updates the qty in the cart when the user types an ammount in the textfield
	const handleQtyChange = (e, productId) => {
		// If the quantity is set to 0, remove from the cart
		if (e.target.value === 0 || e.target.value < 0) {
			return handleRemoveProductFromCart(productId);
		}
		const productToUpdate = cart.filter((product) => productId === product.id);
		const updatedCart = cart.map((product) => {
			if (productToUpdate[0].id === productId) {
				return {
					...product,
					qty: !Number.isNaN(Number(e.target.value))
						? e.target.value
						: product.qty,
				};
			} else {
				return {
					...product,
				};
			}
		});
		setCart(updatedCart);
	};

	const handleRemoveProductFromCart = (productId) => {
		const updatedCart = cart.filter((product) => productId !== productId);
		setCart(updatedCart);
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
						handleRemoveProductQtyFromCart={handleRemoveProductQtyFromCart}
						handleQtyChange={handleQtyChange}
						handleRemoveProductFromCart={handleRemoveProductFromCart}
					/>
				))}
			</Masonry>
		</Container>
	);
}
