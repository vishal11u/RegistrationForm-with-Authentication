import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { NavLink } from 'react-router-dom';
import { RiMenu2Line } from "react-icons/ri";
import { FaCircleChevronLeft } from "react-icons/fa6";
import Tooltip from '@mui/material/Tooltip';
import Logout from './Logout';
import Layout from './Main_Routes';
import { Menu } from 'antd';
import { Divider } from '@mui/material';
// ----------------- icons ---------------//
import { FaUserEdit } from "react-icons/fa";
import { BiFullscreen } from 'react-icons/bi';
import Dashboard from '../../assets/dashboard.svg';
import Registration from '../../assets/website.svg';

const drawerWidth = 250;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Main_Layout() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [fullScreen, setFullScreen] = React.useState(true);

    const items = [
        {
            key: 'sub1',
            label: <NavLink to="/">Dashboard</NavLink>,
            icon: <img src={Dashboard} alt='dash' className={`${open ? 'h-4' : 'h-4'}`} />,
        },
        {
            key: 'sub2',
            label: 'Registration Form',
            icon: <img src={Registration} alt='reg' className={`${open ? 'h-4' : 'h-5'}`} />,
            children: [
                {
                    key: 'sub3',
                    label: <NavLink to="/registration">Registration Form</NavLink>,
                },
            ],
        },
        {
            key: 'sub4',
            label: 'Masters',
            icon: <img src={Registration} alt='reg' className={`${open ? 'h-4' : 'h-5'}`} />,
            children: [
                {
                    key: 'sub5',
                    label: <NavLink to="/prefix">Prefix</NavLink>,
                    children: [
                        {
                            key: '6',
                            label: 'Option 11',
                        },
                        {
                            key: '7',
                            label: 'Option 12',
                        },
                    ],
                },
            ],
        },
    ];

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        if (window.innerWidth < 768) {
            window.location.reload();
        }
    };

    const FullScreen = () => {
        setFullScreen(!fullScreen);
        if (fullScreen) {
            document.body.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar sx={{ backgroundColor: "#3B3C36" }} position="fixed" open={open}>
                    <Toolbar>
                        <Tooltip title='' placement="bottom" arrow>
                            <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start"
                                sx={{ marginRight: 5, ...(open && { display: 'none' }), }}>
                                <RiMenu2Line size={30} />
                            </IconButton>
                        </Tooltip>
                        <div className='flex justify-between w-full items-center'>
                            <Typography>
                                {/* {open ? null : (
                                    <div className='flex justify-center mx-4'>
                                        <span className='text-white text-[17px] flex justify-center items-center font-semibold'><span className='text-yellow-400 text-[25px]'>D</span>ashboard.</span>
                                    </div>
                                )} */}
                            </Typography>
                            <Typography sx={{ display: "flex", alignItems: "center", gap: '25px', mr: 1.5 }}>
                                {/* --------- full screen button section ----------- */}
                                <Tooltip title='Full Screen' placement="bottom" arrow>
                                    <button
                                        type='button'
                                        // className='border rounded-full border-white p-1 shadow'
                                        onClick={FullScreen}
                                    >
                                        <BiFullscreen size={25} />
                                    </button>
                                </Tooltip>
                                {/* ---------- Logout component ------------ */}
                                <Logout />
                            </Typography>
                        </div>
                    </Toolbar>
                </AppBar>

                <Drawer variant="permanent" open={open}  >
                    <DrawerHeader>
                        {/* <div className='flex mx-4'>
                            <span className='text-black text-[17px] flex justify-center items-center font-semibold'><span className='text-yellow-400 text-[25px]'>D</span>ashboard.</span>
                        </div> */}
                        <Tooltip title='' placement="bottom" arrow>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? '' : <FaCircleChevronLeft className='text-[#3B3C36]' size={28} />}
                            </IconButton>
                        </Tooltip>
                    </DrawerHeader>
                    <Divider />
                    <List sx={{ overflow: 'hidden' }}>
                        <div
                            className='-mt-1 overflow-hidden'
                        >
                            <Menu
                                mode="inline"
                                className={`${!open ? '-ml-2' : '-ml-0'}`}
                                theme="light"
                                inlineCollapsed={!open}
                                items={items}
                            />
                        </div>
                    </List>
                </Drawer>

                <Box component="main" sx={{ flexGrow: 1 }}>
                    <DrawerHeader />
                    <Layout />
                </Box>
            </Box>
        </>
    );
}