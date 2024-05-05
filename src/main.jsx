import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import InvalidPage from './pages/InvalidPage';
import Cart from './pages/Cart';
import Store from './pages/Store';
import './styles/index.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Layout from './components/Layout';
import { blue, green } from '@mui/material/colors';

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

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
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
	</React.StrictMode>
);