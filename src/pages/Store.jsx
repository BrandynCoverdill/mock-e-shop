import { Card, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Masonry from '@mui/lab/Masonry';

export default function Store() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('https://fakestoreapi.com/products');
			const json = await res.json();
			setProducts(json);
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
					<ProductCard product={product} />
				))}
			</Masonry>
		</Container>
	);
}
