import { Add } from '@mui/icons-material';
import {
	Typography,
	Box,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	CardActions,
	IconButton,
} from '@mui/material';

export default function ProductCard({ product }) {
	return (
		<Box>
			<Card
				sx={{
					// maxWidth: '400px',
					display: 'flex',
				}}
				raised
			>
				{/* Product Image */}
				<Box
					sx={{
						width: '100%',
						margin: 'auto',
					}}
					p={1}
				>
					<CardMedia
						component='img'
						image={product.image}
						title={product.title}
						sx={{
							objectFit: 'contain',
							height: '100%',
							width: '100%',
						}}
					/>
				</Box>
				{/* Product Content */}
				<Box
					sx={{
						width: '100%',
					}}
				>
					<CardContent>
						<Typography variant='h5'>{product.title}</Typography>
						<Typography variant='h6'>${product.price}</Typography>
						{/* Actions for products */}
						<CardActions>
							<IconButton
								sx={{
									border: '1px solid black',
								}}
								disableTouchRipple
							>
								<Add />
							</IconButton>
						</CardActions>
						<Typography variant='body2'>{product.description}</Typography>
					</CardContent>
				</Box>
			</Card>
		</Box>
	);
}
