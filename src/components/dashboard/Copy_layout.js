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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import { RiMenu2Line } from "react-icons/ri";
import Collapse from "@mui/material/Collapse";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';
import Logout from './Logout';
import Layout from './Main_Routes';
// ----------------- icons ---------------//
import { FaUserEdit } from "react-icons/fa";
import { BiFullscreen } from "react-icons/bi";

const data = [
    {
        id: 1,
        name: "Registration",
        icon: <FaUserEdit size={20} />,
        subMenus: [
            {
                id: 2,
                functionality: "Pre Registration",
                path: "/",
                // icon: `${Feedback}`,
            },
            {
                id: 3,
                functionality: "Pre Registration",
                path: "/",
                // icon: `${Feedback}`,
            },
        ]
    },
]

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
    const [openCollapseId, setOpenCollapseId] = React.useState([]);
    const [fullScreen, setFullScreen] = React.useState(true);
    const [isClicked, setIsClicked] = React.useState(false);

    const handleClick = (subMenuId) => {
        if (isClicked === subMenuId) {
            setIsClicked(null);
        } else {
            setIsClicked(subMenuId);
        }
    };

    const handleDrawerOpen = () => {
        setOpen(!open);
        setOpenCollapseId([])
    };

    const handleDrawerClose = () => {
        setOpen(false);
        if (window.innerWidth < 768) {
            window.location.reload();
        }
        setOpenCollapseId([]);
    };

    const toggleCollapse = (id) => {
        let ids = [...openCollapseId]
        if (!ids.includes(id)) {
            ids.push(id)
            setOpenCollapseId(ids)
        } else {
            let modifiedIds = ids.filter((prev) => prev !== id)
            setOpenCollapseId(modifiedIds)
        }
        setOpen(true);
    };

    const FullScreen = () => {
        setFullScreen(!fullScreen);
        if (fullScreen) {
            document.body.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    // React.useEffect(() => {
    //     console.log("openCollapseIdopenCollapseId", openCollapseId);
    // }, [openCollapseId])

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar sx={{ backgroundColor: "#3B3C36" }} position="fixed" open={open}>
                    <Toolbar>
                        <Tooltip title='Open' placement="bottom" arrow>
                            <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start"
                                sx={{ marginRight: 5, ...(open && { display: 'none' }), }}>
                                <RiMenu2Line size={30} />
                            </IconButton>
                        </Tooltip>
                        <div className='flex justify-between w-full items-center'>
                            <Typography>
                                {open ? null : (
                                    <div className='flex justify-center items-center mx-4'>
                                        {/* <img className='h-9 mr-0.5' src={Logo} alt='' />
                                        <span className='text-purple-600 text-[17px] flex justify-center items-center font-semibold'><span className='text-yellow-400 text-[25px]'>V-</span>health.</span> */}
                                    </div>
                                )}
                            </Typography>
                            <Typography sx={{ display: "flex", alignItems: "center", gap: '25px' }}>
                                {/* --------- full screen button section ----------- */}
                                <button
                                    type='button'
                                    // className='border rounded-full border-white p-1 shadow'
                                    onClick={FullScreen}
                                >
                                    <BiFullscreen size={25} />
                                </button>
                                <Logout />
                            </Typography>
                        </div>
                    </Toolbar>
                </AppBar>

                <Drawer variant="permanent" open={open}  >
                    <DrawerHeader>
                        <div className='flex justify-center items-center mx-4'>
                            {/* <img className='h-9 mr-0.5' src={Logo} alt='' />
                            <span className='text-purple-600 text-[17px] flex justify-center items-center font-semibold'><span className='text-yellow-400 text-[25px]'>V-</span>health.</span> */}
                        </div>
                        <Tooltip title='Close' placement="bottom" arrow>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? '' : <FaCircleChevronLeft className='text-orange-500' size={24} />}
                            </IconButton>
                        </Tooltip>
                    </DrawerHeader>
                    <List>
                        {data.map((text, i) => (
                            <div key={text.id}>
                                <Tooltip title={open ? '' : text.name} placement="right" arrow>
                                    <NavLink to={text.path} disablePadding sx={{ display: 'block' }}>
                                        <ListItemButton
                                            sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2 }}
                                            onClick={() => text.subMenus && toggleCollapse(text.id)}>
                                            <ListItemIcon
                                                sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center', color: "#1F2933" }}>
                                                {/* <img className='h-7 w-7' src={text.icon} alt='' /> */}
                                                <p>{text.icon}</p>
                                            </ListItemIcon>
                                            <ListItemText primary={text.name} sx={{ opacity: open ? 1 : 0, color: "#1F2933" }} />
                                            {text.subMenus && (
                                                <IconButton sx={{ ml: 'auto', display: open && text.subMenus ? 'block' : 'none' }} >
                                                    {text.subMenus && (openCollapseId.includes(text.id) ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />)}
                                                </IconButton>
                                            )}
                                        </ListItemButton>
                                    </NavLink>
                                </Tooltip>
                                <Collapse timeout="auto" unmountOnExit in={openCollapseId.includes(text.id)}>
                                    <List component="div" disablePadding >
                                        {text.subMenus && text.subMenus.map((subMenu) => (
                                            <NavLink to={subMenu.path} key={subMenu.id} disablePadding sx={{ display: 'block' }}>
                                                <ListItemButton sx={{ pl: 3, minHeight: 48, }}>
                                                    <ListItemIcon>
                                                        {/* <img className='h-7 w-7' src={subMenu.icon} alt='' /> */}
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        sx={{
                                                            borderLeft: isClicked === subMenu.id ? '2.2px solid orange' : 'none',
                                                            paddingLeft: '7px',
                                                            color: isClicked === subMenu.id ? '#0BA8E6' : 'inherit',
                                                            cursor: 'pointer',
                                                        }}
                                                        primary={subMenu.functionality}
                                                        onClick={() => handleClick(subMenu.id)}
                                                    />
                                                </ListItemButton>
                                            </NavLink>
                                        ))}
                                    </List>
                                </Collapse>
                            </div>
                        ))}
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