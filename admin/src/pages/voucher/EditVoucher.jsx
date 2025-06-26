import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Paper,
  Typography,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import { ArrowBack, Receipt, Percent } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateVoucher,
  fetchVoucherById,
} from "../../features/voucher/voucherSlice";
import { toast } from "react-toastify";

const EditVoucher = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { voucher } = useSelector((state) => state.voucher);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    discountType: "fixed",
    discountValue: 0,
    minOrderValue: 0,
    maxDiscount: null,
    startDate: null,
    endDate: null,
    usageLimit: 0,
    active: true,
    noDuration: false,
    noUsageLimit: false,
  });

  useEffect(() => {
    dispatch(fetchVoucherById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (voucher) {
      setFormData({
        code: voucher.code || "",
        name: voucher.name || "",
        discountType: voucher.discountType || "fixed",
        discountValue: voucher.discountValue || 0,
        minOrderValue: voucher.minOrderValue || 0,
        maxDiscount: voucher.maxDiscount || null,
        startDate: voucher.startDate ? new Date(voucher.startDate) : null,
        endDate: voucher.endDate ? new Date(voucher.endDate) : null,
        usageLimit: voucher.usageLimit || 0,
        active: voucher.active ?? true,
        noDuration: !voucher.startDate && !voucher.endDate,
        noUsageLimit: voucher.usageLimit === 0,
      });
    }
  }, [voucher]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      usageLimit: formData.noUsageLimit ? 0 : formData.usageLimit,
      startDate: formData.startDate,
      endDate: formData.endDate,
    };

    try {
      await dispatch(updateVoucher({ id, data })).unwrap();
      toast.success("Cập nhật voucher thành công!");
      navigate("/vouchers");
    } catch (error) {
      toast.error(error.message || "Cập nhật voucher thất bại");
    }
  };

  const discountTypes = [
    { value: "fixed", label: "Fixed Discount", icon: <Receipt /> },
    { value: "percent", label: "Percentage Discount", icon: <Percent /> },
  ];

  if (!voucher) {
    return <div>Loading...</div>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h4" className="font-semibold text-gray-900">
                Edit Coupon
              </Typography>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                className="text-gray-600 border-gray-300"
                onClick={() => navigate("/vouchers")}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </div>
          </div>

          <Paper className="p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Coupon Information */}
              <div>
                <Typography variant="h6" className="font-semibold mb-2">
                  Coupon Information
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-4">
                  Code will be used by users in checkout
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Coupon Code"
                      value={formData.code}
                      onChange={(e) =>
                        handleInputChange("code", e.target.value.toUpperCase())
                      }
                      size="small"
                      required
                      className="bg-white"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Coupon Name"
                      size="small"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Free Shipping"
                      className="bg-white"
                    />
                  </Grid>
                </Grid>
              </div>

              <Divider />

              {/* Coupon Type */}
              <div>
                <Typography variant="h6" className="font-semibold mb-2">
                  Coupon Type
                </Typography>
                <Grid container spacing={2}>
                  {discountTypes.map((type) => (
                    <Grid item xs={12} sm={6} md={3} key={type.value}>
                      <Paper
                        className={`p-4 cursor-pointer border-2 transition-all ${
                          formData.discountType === type.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() =>
                          handleInputChange("discountType", type.value)
                        }
                      >
                        <div className="flex flex-col items-center text-center">
                          <div
                            className={`mb-2 ${
                              formData.discountType === type.value
                                ? "text-blue-600"
                                : "text-gray-400"
                            }`}
                          >
                            {type.icon}
                          </div>
                          <Typography variant="body2" className="font-medium">
                            {type.label}
                          </Typography>
                        </div>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </div>

              {/* Discount Configuration */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Discount Value"
                    type="number"
                    value={formData.discountValue}
                    onChange={(e) =>
                      handleInputChange("discountValue", Number(e.target.value))
                    }
                    placeholder="Amount"
                    required
                    size="small"
                    className="bg-white"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Minimum Order Value"
                    type="number"
                    size="small"
                    value={formData.minOrderValue}
                    onChange={(e) =>
                      handleInputChange("minOrderValue", Number(e.target.value))
                    }
                    placeholder="0"
                    className="bg-white"
                  />
                </Grid>
                {formData.discountType === "percent" && (
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Maximum Discount"
                      type="number"
                      value={formData.maxDiscount || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "maxDiscount",
                          e.target.value ? Number(e.target.value) : null
                        )
                      }
                      placeholder="Optional"
                      size="small"
                      className="bg-white"
                    />
                  </Grid>
                )}
              </Grid>

              <Divider />

              {/* Duration */}
              <div>
                <Typography variant="h6" className="font-semibold mb-4">
                  Duration
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <DatePicker
                      label="Start Date"
                      value={formData.startDate}
                      size="small"
                      required
                      onChange={(date) => handleInputChange("startDate", date)}
                      className="w-full bg-white"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DatePicker
                      label="End Date"
                      size="small"
                      required
                      value={formData.endDate}
                      onChange={(date) => handleInputChange("endDate", date)}
                      className="w-full bg-white"
                    />
                  </Grid>
                </Grid>
              </div>

              <Divider />

              {/* Usage Limits */}
              <div>
                <Typography variant="h6" className="font-semibold mb-4">
                  Usage Limits
                </Typography>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.noUsageLimit}
                      onChange={(e) =>
                        handleInputChange("noUsageLimit", e.target.checked)
                      }
                    />
                  }
                  label="Don't limit amount of uses"
                  className="mb-4"
                />

                {!formData.noUsageLimit && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Amount of uses"
                        type="number"
                        value={formData.usageLimit}
                        onChange={(e) =>
                          handleInputChange(
                            "usageLimit",
                            Number(e.target.value)
                          )
                        }
                        placeholder="0"
                        className="bg-white"
                      />
                    </Grid>
                  </Grid>
                )}
              </div>

              {/* Active Status */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.active}
                    onChange={(e) =>
                      handleInputChange("active", e.target.checked)
                    }
                  />
                }
                label="Active"
                className="mb-4"
              />

              {/* Footer Buttons */}
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outlined"
                  className="text-gray-600 border-gray-300"
                  onClick={() => navigate("/vouchers")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Save
                </Button>
              </div>
            </form>
          </Paper>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default EditVoucher;
