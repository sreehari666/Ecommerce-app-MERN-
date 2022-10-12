import * as React from 'react';
import { styled, alpha,useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import AccountCircle from '@mui/icons-material/AccountCircle';

import MoreIcon from '@mui/icons-material/MoreVert';
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import {useNavigate} from "react-router-dom";
import { useState,useEffect} from 'react';

import LoginIcon from '@mui/icons-material/Login';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import {Avatar} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalMallIcon from '@mui/icons-material/LocalMall';



const drawerWidth = 240;
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



 
export default function AdminAppBar() {
  const emailString = sessionStorage.getItem('admin-email');
  const emailData = JSON.parse(emailString);
  console.log(emailData)
 
    // const [data, setData] = useState(null);
    const [email,setEmail] = useState(emailData);
    const navigate = useNavigate();


    const handleLogout =() =>{
    sessionStorage.clear()
    setEmail(null)
    
    }


// useEffect(() => {
//     fetch("https://dummyjson.com/products")
//     .then((res) => res.json())
//     .then((data) => {
//         console.log(data["products"]);
//         setData(data["products"]);
        
//     });
// }, []);




// const [filteredData, setFilteredData] = useState([]);
// const [wordEntered, setWordEntered] = useState("");

// const handleFilter = (event) => {
// const searchWord = event.target.value;
// setWordEntered(searchWord);
// const newFilter = data.filter((value) => {
//   return value.title.toLowerCase().includes(searchWord.toLowerCase());
// });

// if (searchWord === "") {
//   setFilteredData([]);
// } else {
//   setFilteredData(newFilter);
// }
// };

// const clearInput = () => {
// setFilteredData([]);
// setWordEntered("");
// };






  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    const emailString = sessionStorage.getItem('admin-email');
    const emailData = JSON.parse(emailString);
    console.log(emailData)
  
    setEmail(emailData)
  };

  const handleDrawerClose = () => {
    setOpen(false);
    // setEmail(emailData)
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const redirectLogin = () => {
    navigate("/login")
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {email == null ?
        <MenuItem onClick={redirectLogin}>
          Login
        </MenuItem>
      :
      <div>
        <MenuItem>
          {email}
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          Logout
        </MenuItem>
      </div>
      
      }
      
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </MenuItem>
      
        <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >   
        {email == null ?
          <AccountCircle/>
        :
          <Avatar sx={{ bgcolor: "#E53935" }}>{email[0].toUpperCase()}</Avatar>
        }
          
        </IconButton>
      </MenuItem>
      
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:"#512da8"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Shopee.com admin 
          </Typography>
         
        
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {email == null ?
                <AccountCircle />
              :
              <Avatar sx={{ bgcolor: "#E53935" }}>{email[0].toUpperCase()}</Avatar>
              }
              
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        <ListItem >
        {email == null ? 
        <div>
          <Avatar sx={{ bgcolor: "#E53935" }}>A</Avatar>

          </div>
          :
          <div>
          <Avatar sx={{ bgcolor: "#E53935" }}>{email[0].toUpperCase()}</Avatar>
       
          <ListItemText primary={email} />
          </div>

      
        }
        

        </ListItem>
        <ListItem disablePadding>
            <ListItemButton to="/admin">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <Divider />

        </List>
        <Divider />
        <List>
          {email == null ?
          <ListItem disablePadding>
            <ListItemButton to="/admin-login">
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
          :
            null
          }
          <ListItem disablePadding>
            <ListItemButton to="/admin-view-product">
              <ListItemIcon>
                <LocalMallIcon  />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton to="/admin-add-product">
              <ListItemIcon>
                <ShoppingBagIcon />
              </ListItemIcon>
              <ListItemText primary="Add products" />
            </ListItemButton>
          </ListItem>
          
          {/* <ListItem disablePadding>
            <ListItemButton to="/order">
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton to="/wishlist">
              <ListItemIcon>
                <ReceiptLongIcon />
              </ListItemIcon>
              <ListItemText primary="Wishlist" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton to="/address">
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary="Address" />
            </ListItemButton>
          </ListItem> */}
          
            {email==null?
              null
            :
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout} >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
            }
        </List>
      </Drawer>

      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
