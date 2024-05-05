// The homepage of the app
import { Box, Button, Container, Paper, Typography } from '@mui/material';
// @ts-ignore
import storeProductsImg from '/storeProducts.jpg';
import { useNavigate } from 'react-router-dom';
import { blue, green, grey } from '@mui/material/colors';

export default function Home() {
	const navigate = useNavigate();
	return (
		<Container>
			<Box my={1}>
				<Paper
					elevation={5}
					sx={{
						width: '100%',
						textAlign: 'center',
						display: 'flex',
						flexDirection: 'column',
						backgroundImage: `url(${storeProductsImg})`,
						height: '150px',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						py: 1,
					}}
				>
					{/* TODO: change font family */}
					<Typography
						sx={{
							textWrap: 'noWrap',
							flexGrow: '1',
							textShadow: `5px 5px 5px ${grey[900]}`,
							color: grey[100],
						}}
						variant='h3'
						fontWeight='bold'
						letterSpacing={2}
					>
						Mock eShop
					</Typography>
					<Button
						onClick={() => navigate('store')}
						variant='outlined'
						sx={{
							width: '50%',
							margin: 'auto',
							bgcolor: 'white',
							'&:hover': {
								bgcolor: blue[100],
							},
						}}
						disableTouchRipple
					>
						View Products
					</Button>
				</Paper>
			</Box>
		</Container>
	);
}
