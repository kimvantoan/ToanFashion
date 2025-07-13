import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "aos/dist/aos.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddresses,
  updateAddress,
  createAddress,
  deleteAddress,
} from "../features/address/addressSlice";
import axios from "axios";
const AddressContent = () => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    district: "",
    ward: "",
    note: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("create");
  const [editingAddress, setEditingAddress] = useState(null);
  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.address);
  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);
  const handleOpenCreateDialog = () => {
    setDialogType("create");
    setForm({
      fullName: "",
      phone: "",
      street: "",
      city: "",
      district: "",
      ward: "",
      note: "",
    });
    setEditingAddress(null);
    setDialogOpen(true);
  };
  // Mở modal sửa
  const handleOpenEditDialog = (address) => {
    setDialogType("edit");
    setForm({
      fullName: address.fullName || "",
      phone: address.phone || "",
      street: address.street || "",
      city: address.city || "",
      district: address.district || "",
      ward: address.ward || "",
      note: address.note || "",
    });
    setEditingAddress(address);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteAddress(id));
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingAddress(null);
  };

  const handleSave = () => {
    if (dialogType === "create") {
      dispatch(createAddress(form));
    } else {
      dispatch(updateAddress({ id: editingAddress._id, data: form }));
    }
    setDialogOpen(false);
    setEditingAddress(null);
  };

  const handleFormChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const host = "https://provinces.open-api.vn/api/";

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  // Load provinces on component mount
  useEffect(() => {
    axios.get(`${host}?depth=1`).then((res) => {
      setProvinces(res.data);
    });
  }, []);

  // Load districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      axios.get(`${host}p/${selectedProvince}?depth=2`).then((res) => {
        setDistricts(res.data.districts);
        setWards([]);
        setSelectedDistrict("");
        setSelectedWard("");
      });
    }
  }, [selectedProvince]);

  // Load wards when district changes
  useEffect(() => {
    if (selectedDistrict) {
      axios.get(`${host}d/${selectedDistrict}?depth=2`).then((res) => {
        setWards(res.data.wards);
        setSelectedWard("");
      });
    }
  }, [selectedDistrict]);

  return (
    <>
      <div className="w-screen md:w-full px-6" data-aos="fade-up">
        <div className="flex justify-between mb-4 p-3">
          <h2 className="text-xl font-semibold mb-4 text-[#c4123f]">Địa Chỉ</h2>
          <Button
            variant="contained"
            onClick={handleOpenCreateDialog}
            color="error"
          >
            Thêm địa chỉ
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-base font-medium text-gray-800">
                    {address.fullName}
                  </p>
                  <p className="text-sm text-gray-600">{address.phone}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    className="text-[#c4123f] flex cursor-pointer items-center text-sm font-medium"
                    onClick={() => handleOpenEditDialog(address)}
                  >
                    <Edit fontSize="small" />
                  </button>
                  <button
                    className="text-gray-400 flex cursor-pointer items-center text-sm font-medium"
                    onClick={() => handleDelete(address._id)}
                  >
                    <Delete fontSize="small" />
                  </button>
                </div>
              </div>

              <div className="text-sm text-gray-700 space-y-1 mt-2">
                <p>
                  <span className="font-semibold">Địa chỉ:</span>
                  {address.street}, {address.ward}, {address.district},{" "}
                  {address.city}
                </p>
                {address.note && (
                  <p>
                    <span className="font-semibold">Ghi chú:</span>{" "}
                    {address.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id="main-content" inert={dialogOpen ? true : undefined}>
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle className="border-b border-gray-200">
            <Typography variant="h6" component="span" className="font-medium">
              {dialogType === "create" ? "Tạo địa chỉ" : `Sửa địa chỉ`}
            </Typography>
          </DialogTitle>

          <DialogContent className="p-6">
            <form className="grid grid-cols-2 gap-4 mt-2">
              <TextField
                fullWidth
                label="Tên người nhận"
                value={form.fullName}
                onChange={(e) => handleFormChange("fullName", e.target.value)}
                variant="outlined"
                required
                size="small"
              />
              <TextField
                fullWidth
                type="tel"
                label="Điện thoại"
                value={form.phone}
                onChange={(e) => handleFormChange("phone", e.target.value)}
                variant="outlined"
                size="small"
                required
              />
              <FormControl fullWidth sx={{ gridColumn: "span 2" }} size="small">
                <InputLabel id="demo-simple-select-label">Thành phố</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form.city}
                  label="Thành phố"
                  onChange={(e) => handleFormChange("city", e.target.value)}
                >
                  {provinces.map((province) => (
                    <MenuItem
                      key={province.code}
                      value={province.name}
                      onClick={() => setSelectedProvince(province.code)}
                    >
                      {province.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ gridColumn: "span 2" }} size="small">
                <InputLabel id="demo-simple-select-label">
                  Quận, huyện
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form.district}
                  label="Quận, huyện"
                  onChange={(e) => handleFormChange("district", e.target.value)}
                >
                  {districts.map((district) => (
                    <MenuItem
                      key={district.code}
                      value={district.name}
                      onClick={() => setSelectedDistrict(district.code)}
                    >
                      {district.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ gridColumn: "span 2" }} size="small">
                <InputLabel id="demo-simple-select-label">
                  Xã, phường
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form.ward}
                  label="Xã, phường"
                  onChange={(e) => handleFormChange("ward", e.target.value)}
                >
                  {wards.map((province) => (
                    <MenuItem
                      key={province.code}
                      value={province.name}
                      onClick={() => setSelectedProvince(province.code)}
                    >
                      {province.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Chi tiết"
                value={form.street}
                onChange={(e) => handleFormChange("street", e.target.value)}
                variant="outlined"
                sx={{ gridColumn: "span 2" }}
                size="small"
              />
              <TextField
                fullWidth
                label="Ghi chú"
                value={form.note}
                onChange={(e) => handleFormChange("note", e.target.value)}
                variant="outlined"
                multiline
                rows={3}
                sx={{ gridColumn: "span 2" }}
                size="small"
              />
            </form>
          </DialogContent>
          <DialogActions className="p-4 border-t border-gray-200">
            <Button
              color="error"
              onClick={handleCloseDialog}
              className="text-gray-600"
            >
              Hủy
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              color="error"
              className="bg-blue-600"
            >
              {dialogType === "create" ? "Thêm" : "Lưu"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default AddressContent;
