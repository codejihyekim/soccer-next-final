import React, {useState, useEffect} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {createSvgIcon} from '@mui/material/utils';
import { logoutRequest } from '@/modules/auth/login';
import {useDispatch, connect} from 'react-redux';
const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>,
    'Home',
);

const basicSettings = {
    subTitles: [
        '멤버관리'
    ],
    urls: ["/employee/list"]
};

export function Nav() {
    const [loginCheck, setLoginCheck] = useState(false)
    const dispatch = useDispatch()
    const [imageInfos, setImageInfos] = useState({
        imageUrl: 'https://as2.ftcdn.net/v2/jpg/01/85/61/65/1000_F_185616556_uCc1J5d5GNfRH6ErgP1G' +
                '8x8ORLeG25en.jpg',
        imageTitle: 'sign'
    });
    const [userUrls, setUserUrls] = useState({subTitles: [], urls: []});

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogout = e => {
        e.preventDefault()
        dispatch(logoutRequest());
    }

    useEffect(() => {
        const loginUser = localStorage.getItem("loginUser")
        if(loginUser) setLoginCheck(false)
        if (loginUser == null) {
            setUserUrls({
                subTitles: [
                    '회원가입', '로그인'
                ],
                urls: ["/auth/register", "/auth/login"]
            })
            setImageInfos({
                imageUrl: 'https://as2.ftcdn.net/v2/jpg/01/85/61/65/1000_F_185616556_uCc1J5d5GNfRH6ErgP1G' +
                        '8x8ORLeG25en.jpg',
                imageTitle: 'sign'
            })
        } else {
          setLoginCheck(true)
            setUserUrls({
                subTitles: [
                    "프로필", "정보수정", "회원탈퇴"
                ],
                urls: ["/user/profile", "/auth/modifyUser", "/auth/delUser"]
            })
            setImageInfos(
                {imageUrl: 'https://www.w3schools.com/howto/img_avatar.png', imageTitle: 'users'}
            )
        }
    }, [])

    return (
        <AppBar
            position="static"
            style={{
                marginBottom: "20px"
            }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters="disableGutters">
                    <Typography
                        variant="h6"
                        noWrap="noWrap"
                        component="div"
                        sx={{
                            mr: 2,
                            display: {
                                xs: 'none',
                                md: 'flex'
                            }
                        }}>
                        <Box
                            sx={{
                                '& > :not(style)' : {
                                    m: 2
                                }
                            }}>
                            <a href='/'><HomeIcon
                                color="primary"
                                sx={{
                my: 0,
                color: 'white',
                display: 'block'
            }}/></a>
                        </Box>
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            color: 'white',
                            display: {
                                xs: 'none',
                                md: 'flex'
                            }
                        }}>
                        {
                            basicSettings
                                .urls
                                .map((urls, i) => (
                                    <a
                                        href={urls}
                                        key={i}
                                        style={{
                                            textDecoration: 'none'
                                        }}>
                                        <Button
                                            key={i}
                                            onClick={handleCloseNavMenu}
                                            sx={{
                                                my: 2,
                                                color: 'white',
                                                display: 'block'
                                            }}>
                                            {basicSettings.subTitles[i]}
                                        </Button>
                                    </a>
                                ))
                        }
                    </Box>

                    <Box sx={{
                            flexGrow: 0
                        }}>
                        <Tooltip title={imageInfos.imageTitle}>
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{
                                    p: 0
                                }}>
                                <Avatar alt="Remy Sharp" src={imageInfos.imageUrl}/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{
                                mt: '45px'
                            }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted="keepMounted"
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(anchorElUser)}>
                            {
                                userUrls
                                    .urls
                                    .map((urls, i) => (
                                        <MenuItem key={i}>
                                            <a href={urls}>
                                                <Typography textAlign="center" onClick={handleCloseUserMenu}>{userUrls.subTitles[i]}</Typography>
                                            </a>
                                        </MenuItem>
                                    ))
                            }
                        </Menu>
                    </Box>
                    {loginCheck&&<Box >
                        <Button
                            onClick={handleLogout}
                            sx={{
                                color: 'white',
                                display: 'block'
                            }}>
                            로그아웃
                        </Button>
                    </Box>}
                </Toolbar>
            </Container>
        </AppBar>
    );
}