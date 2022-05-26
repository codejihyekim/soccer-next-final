import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Head from 'next/head';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export function BoardRegister({onChange, onSubmit}) {
    
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                    
                    <Typography component="h1" variant="h5">
                        게시판 등록
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={onSubmit}
                        noValidate="noValidate"
                        sx={{
                            mt: 1
                        }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="date"
                            label="날짜"
                            name="date"
                            autoComplete="date"
                            autoFocus
                            onChange={onChange}/>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="title"
                            label="제목"
                            type="title"
                            id="title"
                            autoComplete="title"
                            onChange={onChange}/>
                        <Button
                            type="submit"
                            fullWidth 
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2
                            }}>
                            등록
                        </Button>
                        
                    </Box>
                </Box>
                <Copyright
                    sx={{
                        mt: 8,
                        mb: 4
                    }}/>
            </Container>
        </ThemeProvider>
    );
}
