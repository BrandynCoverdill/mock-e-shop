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
				<Context.Provider value={[cart, setCart]}>
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
				</Context.Provider>
			</CssBaseline>
		</ThemeProvider>
	);
}
