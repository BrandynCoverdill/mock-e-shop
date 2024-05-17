import {
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	TextField,
	Typography,
} from '@mui/material';
import { Context } from '../App';
import { useContext, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Masonry } from '@mui/lab';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cart({
	handleAddProductToCart,
	handleRemoveProductQtyFromCart,
	handleQtyChange,
	handleRemoveProductFromCart,
}) {
	const { productsContext, cartContext } = useContext(Context);
	const [products, setProducts] = productsContext;
	const [cart, setCart] = cartContext;
	const [formDialog, setFormDialog] = useState(false);
	const [customer, setCustomer] = useState({
		firstName: '',
		lastName: '',
		email: '',
	});
	const [firstNameError, setFirstNameError] = useState(true);
	const [lastNameError, setLastNameError] = useState(true);
	const [emailError, setEmailError] = useState(true);

	const productCart = [];

	const taxRate = 0.06;
	const shippingCost = 12.99;

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

	const openFormDialog = () => {
		setFormDialog(true);
	};

	const closeFormDialog = () => {
		setFormDialog(false);
	};

	const handleFirstNameChange = (e) => {
		const data = e.target.value;
		setCustomer({
			...customer,
			firstName: data,
		});
		setFirstNameError(data.trim() === '' || data.length === 0);
	};

	const handleLastNameChange = (e) => {
		const data = e.target.value;
		setCustomer({
			...customer,
			lastName: data,
		});
		setLastNameError(data.trim() === '' || data.length === 0);
	};

	const handleEmailChange = (e) => {
		const data = e.target.value;
		const regex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
		setCustomer({
			...customer,
			email: data,
		});
		setEmailError(!regex.test(data) || data.length === 0 || data.trim() === '');
	};

	// BUG: Toast notification is not showing on screen
	const placeOrder = () => {
		console.log(customer);
		toast.success('Order has been placed!', {
			position: 'bottom-left',
			autoClose: 5000,
		});
		closeFormDialog();
	};

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
							showDescription={false}
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
						<Typography variant='h6' m={1}>
							Shipping Cost: ${shippingCost}
						</Typography>
						<Divider />
						<Typography variant='h4' m={1}>
							Total Cost: $
							{(
								+productCart
									.reduce((acc, cur) => acc + cur.price * cur.qty, 0)
									.toFixed(2) *
									(taxRate + 1) +
								shippingCost
							).toFixed(2)}
						</Typography>
						<Box m={1}>
							<Button
								size='large'
								variant='contained'
								disableTouchRipple
								onClick={() => openFormDialog()}
							>
								Continue to Checkout
							</Button>
						</Box>
					</Box>
				) : null}
			</Box>
			<Dialog
				open={formDialog}
				onClose={() => closeFormDialog()}
				onSubmit={() => console.log('Order Placed!')}
			>
				<DialogTitle>*Place Order</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						required
						name='firstName'
						id='firstName'
						label='First Name'
						type='text'
						margin='dense'
						fullWidth
						onChange={(e) => handleFirstNameChange(e)}
						error={firstNameError}
						helperText={firstNameError ? 'Please enter your first name' : ''}
						value={customer.firstName}
					/>
					<TextField
						required
						name='lastName'
						id='lastName'
						label='Last Name'
						type='text'
						margin='dense'
						fullWidth
						onChange={(e) => handleLastNameChange(e)}
						error={lastNameError}
						helperText={lastNameError ? 'Please enter your last name' : ''}
						value={customer.lastName}
					/>
					<TextField
						required
						id='email'
						name='email'
						label='Email Address'
						type='email'
						margin='dense'
						fullWidth
						onChange={(e) => handleEmailChange(e)}
						error={emailError}
						helperText={emailError ? 'Please enter a valid email address' : ''}
						value={customer.email}
					/>
					<DialogActions>
						<Button
							variant='contained'
							disableTouchRipple
							onClick={() => closeFormDialog()}
						>
							Cancel
						</Button>
						<Button
							variant='contained'
							disableTouchRipple
							type='submit'
							onClick={() => placeOrder()}
						>
							Place Order
						</Button>
					</DialogActions>
					<DialogContentText>
						*This form does not do anything with the data you provide.
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</Container>
	);
}
