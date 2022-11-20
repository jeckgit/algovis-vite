import { Container, Grid, Link, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../style/Home.css';

function Home() {

    const navigate = useNavigate();

    const data = [
        { route: 'algorithms/bubblesort', label: 'Bubble Sort' },
        { route: 'algorithms/binarytree', label: 'Binary Tree' },
        { route: 'algorithms/binarysearch', label: 'Binary Search' },
        { route: 'algorithms/binarysearchtree', label: 'Binary Search Tree' },
        { route: 'maps', label: 'Maps' }
    ];

    return (
        <div>
            <h1>Welcome to the portfolio to of Joerg Eckhold</h1>
            <Typography variant="body1" my={2}>
                On this page you can find some projects on preparation for job interviews for a new company.
            </Typography>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    {data.map((item, idx) => (
                        <Grid item xs={3} key={`paper-label-${idx}`}>
                            <Link href="" underline="none" color="inherit" onClick={() => navigate(item.route)}>
                                <Paper elevation={1} className={"paper-card"} >
                                    <span>{item.label}</span>
                                </Paper>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}

export default Home;
