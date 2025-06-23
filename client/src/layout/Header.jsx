import React, { useEffect, useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  InputBase,
  Button,
  Badge,
  IconButton,
  Paper,
  Tabs,
  Tab,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  LocalShipping as LocalShippingIcon,
  Store as StoreIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/category/categorySlice";

const Header = () => {
  const [tabValue, setTabValue] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.category);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const {cart} = useSelector((state) => state.cart);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categorySlug = params.get("category");
    if (categorySlug) {
      const found = categories.some((cat) => cat.slug === categorySlug);
      setTabValue(found ? categorySlug : false);
    } else {
      setTabValue(false);
    }
  }, [location.search, categories]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    navigate(`/collection?category=${newValue}`);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    )
      return;
    setDrawerOpen(open);
  };

  const handleAccountClick = () => {
    navigate(user ? "/account" : "/login");
  };

  const mobileDrawer = (
    <div className="w-[280px] flex flex-col h-full">
      <div className="flex justify-between items-center p-4 bg-[#c9184a] text-white">
        <div className="text-lg font-bold">TOAN FASHION</div>
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
          onClick={handleAccountClick}
        >
          {user ? "Tài khoản của tôi" : "Đăng nhập"}
        </Button>
      </div>
      <List className="pt-0">
        {categories.map((category, idx) => (
          <ListItem disablePadding key={category._id || idx}>
            <ListItemButton
              onClick={() => {
                navigate(`/collection?category=${category.slug}`);
                setDrawerOpen(false);
              }}
            >
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItem>
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
          <Link to="/" className="flex-shrink-0">
            <img
              src="/placeholder.svg?height=40&width=120"
              alt="TOAN FASHION Logo"
              className="h-8 md:h-10"
            />
          </Link>
          {/* Search Bar - Desktop */}
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
                onClick={handleAccountClick}
                className="text-white"
              >
                <PersonIcon className="mr-1" />
                <span className="text-xs">
                  {user ? "Tài khoản của tôi" : "Đăng nhập / Đăng ký"}
                </span>
              </Button>
            </div>
            <IconButton
              onClick={() => navigate("/cart")}
              color="inherit"
              aria-label="cart"
              className="relative"
            >
              <Badge badgeContent={cart?.items?.length || 0}>
                <ShoppingCartIcon />
              </Badge>
              <span className="ml-1 text-xs text-white hidden md:inline">
                Giỏ hàng
              </span>
            </IconButton>
          </div>
        </Toolbar>
        {/* Mobile Search Bar */}
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
              sx={{
                bgcolor: "#c9184a",
                color: "white",
                borderRadius: "5px",
                padding: "5px",
              }}
            >
              <SearchIcon fontSize="small" />
            </IconButton>
          </Paper>
        </div>
        {/* Service Info Bar */}
        <div className="hidden sm:flex justify-center space-x-6 py-1 bg-[#b91c47] text-white text-sm">
          <div className="flex items-center">
            <LocalShippingIcon fontSize="small" className="mr-1" />
            <span>Giao hàng toàn quốc</span>
          </div>
          <div className="flex items-center">
            <StoreIcon fontSize="small" className="mr-1" />
            <span>Hệ thống cửa hàng TOAN FASHION</span>
          </div>
          <div className="flex items-center">
            <PhoneIcon fontSize="small" className="mr-1" />
            <span>Hotline: 1900 63 64 76 (9-21h)</span>
          </div>
        </div>
      </AppBar>
      {/* Categories Navigation */}
      <Paper square className="hidden md:flex overflow-x-auto justify-center">
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
          {categories.map((category) => (
            <Tab
              key={category._id || category.slug}
              value={category.slug}
              label={category.name}
              className="text-xs md:text-sm font-medium whitespace-nowrap"
              sx={{
                minHeight: "48px",
                color: "#c9184a",
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
