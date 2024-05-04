import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import InvalidPage from './pages/InvalidPage';
import './styles/index.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Layout from './components/Layout';

// Create custom theme
const theme = createTheme({});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		{/* <ThemeProvider theme={theme}> */}
		<CssBaseline>
			<Router>
				<Layout>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='*' element={<InvalidPage />} />
					</Routes>
				</Layout>
			</Router>
		</CssBaseline>
		{/* </ThemeProvider> */}
	</React.StrictMode>
);
