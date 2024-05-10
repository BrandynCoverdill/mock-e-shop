import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Layout from './components/Layout';
import { blue, green } from '@mui/material/colors';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import InvalidPage from './pages/InvalidPage';
import Cart from './pages/Cart';
import Store from './pages/Store';

export default function App() {
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

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline>
				<Router>
					<Layout>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='store' element={<Store />} />
							<Route path='cart' element={<Cart />} />
							<Route path='*' element={<InvalidPage />} />
						</Routes>
					</Layout>
				</Router>
			</CssBaseline>
		</ThemeProvider>
	);
}