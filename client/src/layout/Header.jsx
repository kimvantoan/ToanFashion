import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  InputBase,
  Button,
  Badge,
  MenuItem,
  IconButton,
  Paper,
  Tabs,
  Tab,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  Divider,
} from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  LocalShipping as LocalShippingIcon,
  Store as StoreIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const anchorRef = React.useRef(null);
  const navigator = useNavigate();
  const { user } = useSelector((state) => state.user);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleCategoryClick = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  const categories = [
    {
      name: "SOFA - GHẾ THƯ GIÃN",
    },
    {
      name: "BÀN",
    },
    {
      name: "GHẾ",
    },
    {
      name: "GIƯỜNG NỆM",
    },
    {
      name: "CHĂN GA GỐI",
    },
    {
      name: "TỦ KỆ",
    },
    {
      name: "NỘI THẤT VĂN PHÒNG",
    },
    {
      name: "TRANG TRÍ",
    },
    {
      name: "NHÀ BẾP",
    },
    {
      name: "PHÒNG TẮM",
    },
  ];

  const mobileDrawer = (
    <div className="w-[280px]">
      <div className="flex justify-between items-center p-4 bg-[#c9184a] text-white">
        <div className="text-lg font-bold">BAYA</div>
        <IconButton color="inherit" onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </div>

      <div className="p-4 bg-[#f5f5f5]">
        <Button
          fullWidth
          variant="outlined"
          startIcon={<PersonIcon />}
          className="justify-start normal-case"
          sx={{ borderColor: "#c9184a", color: "#c9184a" }}
          onClick={() => {
            if (user) {
              navigator("/account");
            } else {
              navigator("/login");
            }
          }}
        >
          {user ? "Tài khoản của tôi" : "Đăng nhập"}
        </Button>
      </div>

      <List className="pt-0">
        {categories.map((category, index) => (
          <React.Fragment key={index}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleCategoryClick(index)}>
                <ListItemText primary={category.name} />
              </ListItemButton>
            </ListItem>
          </React.Fragment>
        ))}
      </List>

      <div className="p-4 bg-[#f5f5f5] mt-auto">
        <div className="flex items-center mb-2">
          <PhoneIcon fontSize="small" className="mr-2 text-[#c9184a]" />
          <span>Hotline: 1900 63 64 76 (9-21h)</span>
        </div>
        <div className="flex items-center">
          <LocalShippingIcon fontSize="small" className="mr-2 text-[#c9184a]" />
          <span>Giao hàng toàn quốc</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Top Navigation Bar */}
      <AppBar position="static" sx={{ bgcolor: "#c9184a" }}>
        <Toolbar className="flex justify-between items-center">
          {/* Mobile Menu Icon */}
          <div className="sm:hidden">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </div>

          {/* Logo */}
          <Link to={'/'} className="flex-shrink-0">
            <img
              src="/placeholder.svg?height=40&width=120"
              alt="BAYA Logo"
              className="h-8 md:h-10"
            />
          </Link>

          {/* Search Bar - Hidden on small mobile, visible on larger screens */}
          <div className="hidden sm:flex flex-grow mx-4 max-w-2xl">
            <Paper
              component="form"
              className="flex items-center pl-4 pr-2 py-1 w-full"
            >
              <InputBase
                placeholder="Tìm kiếm sản phẩm..."
                className="flex-grow ml-1"
                inputProps={{ "aria-label": "search" }}
              />
              <IconButton
                type="submit"
                aria-label="search"
                sx={{ bgcolor: "#c9184a", color: "white", borderRadius: "5px" }}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>

          {/* Account & Cart */}
          <div className="flex items-center">
            <div className="hidden md:block">
              <Button
                ref={anchorRef}
                color="inherit"
                onClick={() => {
                  if (user) {
                    navigator("/account");
                  } else {
                    navigator("/login");
                  }
                }}
                className="text-white"
              >
                <PersonIcon className="mr-1" />
                {user ? <span className="text-xs">Tài khoản của tôi</span> :
                <span className="text-xs">
                  Đăng nhập / Đăng ký
                </span>
                }
              </Button>
            </div>

            <IconButton onClick={()=>navigator('/cart')} color="inherit" aria-label="cart" className="relative">
              <Badge badgeContent={5}>
                <ShoppingCartIcon />
              </Badge>
              <span className="ml-1 text-xs text-white hidden md:inline">
                Giỏ hàng
              </span>
            </IconButton>
          </div>
        </Toolbar>

        {/* Mobile Search Bar - Only visible on small screens */}
        <div className="sm:hidden px-2 pb-2">
          <Paper
            component="form"
            className="flex items-center pl-4 pr-2 w-full"
          >
            <InputBase
              placeholder="Tìm kiếm sản phẩm..."
              className="flex-grow ml-1"
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton
              type="submit"
              aria-label="search"
              sx={{ bgcolor: "#c9184a", color: "white", borderRadius: "5px", padding: "5px" }}
            >
              <SearchIcon fontSize="small" />
            </IconButton>
          </Paper>
        </div>

        {/* Service Info Bar - Hidden on very small screens */}
        <div className="hidden sm:flex justify-center space-x-6 py-1 bg-[#b91c47] text-white text-sm">
          <div className="flex items-center">
            <LocalShippingIcon fontSize="small" className="mr-1" />
            <span>Giao hàng toàn quốc</span>
          </div>
          <div className="flex items-center">
            <StoreIcon fontSize="small" className="mr-1" />
            <span>Hệ thống cửa hàng BAYA</span>
          </div>
          <div className="flex items-center">
            <PhoneIcon fontSize="small" className="mr-1" />
            <span>Hotline: 1900 63 64 76 (9-21h)</span>
          </div>
        </div>
      </AppBar>

      {/* Categories Navigation - Hidden on mobile */}
      <Paper square className="hidden md:flex overflow-x-auto  justify-between">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="primary"
          textColor="primary"
          aria-label="category tabs"
          className="min-h-[48px] flex justify-between"
          
        >
          {categories.map((category, index) => (
            <Tab
              key={index}
              label={category.name}
              className="text-xs md:text-sm font-medium whitespace-nowrap"
              sx={{
                minHeight: "48px",
                "&.Mui-selected": { color: "#c9184a" },
              }}
            />
          ))}
        </Tabs>
      </Paper>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {mobileDrawer}
      </Drawer>
    </div>
  );
};

export default Header;
