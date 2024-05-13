import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Layout from './components/Layout';
import { blue, green } from '@mui/material/colors';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import InvalidPage from './pages/InvalidPage';
import Cart from './pages/Cart';
import Store from './pages/Store';
import { useState, createContext } from 'react';

// @ts-ignore
export const Context = createContext();

export default function App() {
	const [cart, setCart] = useState([]);
	const [products, setProducts] = useState([]);

	// Create custom theme
	const theme = createTheme({
		palette: {
			primary: {
				main: blue[400],
			},
			secondary: {
				main: green[300],
			},
		},
	});

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
		if (e.target.value === 0 || e.target.value < 1) {
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
		<ThemeProvider theme={theme}>
			<CssBaseline>
				<Context.Provider
					value={{
						cartContext: [cart, setCart],
						productsContext: [products, setProducts],
					}}
				>
					<Router>
						<Layout>
							<Routes>
								<Route path='/' element={<Home />} />
								<Route
									path='store'
									element={
										<Store
											handleAddProductToCart={handleAddProductToCart}
											handleRemoveProductQtyFromCart={
												handleRemoveProductQtyFromCart
											}
											handleQtyChange={handleQtyChange}
											handleRemoveProductFromCart={handleRemoveProductFromCart}
										/>
									}
								/>
								<Route
									path='cart'
									element={
										<Cart
											handleAddProductToCart={handleAddProductToCart}
											handleRemoveProductQtyFromCart={
												handleRemoveProductQtyFromCart
											}
											handleQtyChange={handleQtyChange}
											handleRemoveProductFromCart={handleRemoveProductFromCart}
										/>
									}
								/>
								<Route path='*' element={<InvalidPage />} />
							</Routes>
						</Layout>
					</Router>
				</Context.Provider>
			</CssBaseline>
		</ThemeProvider>
	);
}
