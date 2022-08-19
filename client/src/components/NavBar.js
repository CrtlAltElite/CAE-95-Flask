import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import IcecreamTwoToneIcon from '@mui/icons-material/IcecreamTwoTone';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontTwoTone from '@mui/icons-material/StorefrontTwoTone';
import ThemeSwitch from './ThemeSwitch';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AppContext } from '../context/AppContext';
import Badge from '@mui/material/Badge';
import  MUILink  from '@mui/material/Link';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';


const drawerWidth = 240;

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
  // necessary for content to be below app bar
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
  
  export default function NavBar({children}) {
  const theme = useTheme();
  const {user, cart} = React.useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };
  

  const menuChoices =  [
    {label:'Cart', path:'/cart', icon: <Badge badgeContent={cart?.length} color="primary"><ShoppingCartIcon sx={{color:'white'}}/> </Badge>},
    {label:'Shop', path:'/shop', icon:<StorefrontTwoTone  sx={{color:'white'}}/>}
  ]

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <IcecreamTwoToneIcon />
          </IconButton>
          <Box sx={{mr:3, flexGrow:1,...(open&&{display:'none'})}}>
            <Link to="/">
              <img alt="Candes Logo" style={{maxHeight: '60px'}} className='p2' src="https://res.cloudinary.com/cae67/image/upload/v1660377217/candeslogo5_xm5519.png"/>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>

              {
                user?.icon?
                <Avatar alt={user.first_name}src={`https://avatars.dicebear.com/api/avataaars/${user.icon}.svg`} />
                :
                <Avatar alt="Please Login" src={`https://avatars.dicebear.com/api/avataaars/${new Date().getDay()}.svg`} />
              }
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user?
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to='/logout' style={{textDecoration: 'none', color:'black'}}>

                    <Typography textAlign="center">
                      Logout
                    </Typography>
                  </Link>

                </MenuItem>
              :
                <MenuItem onClick={handleCloseUserMenu}>
                <Link to='/login' style={{textDecoration: 'none', color:'black'}}>
                  <Typography textAlign="center">
                    Login
                  </Typography>
                </Link>
                </MenuItem>
              }
            </Menu>
          </Box>
        </Toolbar> 
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Box sx={{color:"white", backgroundImage:"linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://res.cloudinary.com/cae67/image/upload/v1660372814/nerdsblur_wqcikz.png')", backgroundSize:"contain", flexGrow: 1}}>
          <DrawerHeader>
            Paths to Enlightenment
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon sx={{color:'white'}}/> : <ChevronLeftIcon  sx={{color:'white'}}/>}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {
           menuChoices.map((navItem, index) => (
              <ListItem key={navItem.label} disablePadding sx={{ display: 'block', ml:2, mb:2 }}>
                <div style={{display:"flex", marginTop:"20px"}}>
                  <Link to={navItem.path} style={{display:"flex", color: 'inherit', textDecoration: 'none'}}>
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {navItem.icon}
                    </ListItemIcon>
                  <ListItemText primary={navItem.label} sx={{ opacity: open ? 1 : 0 }} />
                  </Link>
                </div>
              </ListItem>
            ))}
              <ListItem  disablePadding sx={{ display: 'block', ml:2, mb:2 }}>
                <div style={{display:"flex", marginTop:"20px"}}>
                  <MUILink href='/home' color="inherit" underline="none" sx={{display:"flex"}}>
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <ConnectWithoutContactIcon style={{color:'white'}}/>
                    </ListItemIcon>
                  <ListItemText primary={"Social"} sx={{ opacity: open ? 1 : 0 }} />
                  </MUILink>
                </div>
              </ListItem>

          </List>
        { open ?
          <ListItem sx={{position:"absolute", bottom:"0px", alignContent:"center", justifyContent:"center"}}>
              <ThemeSwitch/>
          </ListItem>
        : ''}
        </Box>

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
       {children}

      </Box>
    </Box>
  );
}
