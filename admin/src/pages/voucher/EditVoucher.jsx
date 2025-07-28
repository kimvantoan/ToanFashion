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
    { value: "fixed", label: "Giảm giá cố định", icon: <Receipt /> },
    { value: "percent", label: "Giảm theo phần trăm", icon: <Percent /> },
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
                Chỉnh sửa mã giảm giá
              </Typography>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                className="text-gray-600 border-gray-300"
                onClick={() => navigate("/vouchers")}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleSubmit}
              >
                Lưu
              </Button>
            </div>
          </div>

          <Paper className="p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Thông tin voucher */}
              <div>
                <Typography variant="h6" className="font-semibold mb-2">
                  Thông tin mã giảm giá
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-4">
                  Mã này sẽ được khách hàng sử dụng khi thanh toán
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Mã giảm giá"
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
                      label="Tên chương trình"
                      size="small"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Miễn phí vận chuyển"
                      className="bg-white"
                    />
                  </Grid>
                </Grid>
              </div>

              <Divider />

              {/* Loại giảm giá */}
              <div>
                <Typography variant="h6" className="font-semibold mb-2">
                  Loại giảm giá
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

              {/* Cấu hình giảm giá */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Giá trị giảm"
                    type="number"
                    value={formData.discountValue}
                    onChange={(e) =>
                      handleInputChange("discountValue", Number(e.target.value))
                    }
                    placeholder="Số tiền hoặc %"
                    required
                    size="small"
                    className="bg-white"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Giá trị đơn hàng tối thiểu"
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
                      label="Giảm tối đa"
                      type="number"
                      value={formData.maxDiscount || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "maxDiscount",
                          e.target.value ? Number(e.target.value) : null
                        )
                      }
                      placeholder="Không bắt buộc"
                      size="small"
                      className="bg-white"
                    />
                  </Grid>
                )}
              </Grid>

              <Divider />

              {/* Thời gian áp dụng */}
              <div>
                <Typography variant="h6" className="font-semibold mb-4">
                  Thời gian áp dụng
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <DatePicker
                      label="Ngày bắt đầu"
                      value={formData.startDate}
                      size="small"
                      required
                      onChange={(date) => handleInputChange("startDate", date)}
                      className="w-full bg-white"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DatePicker
                      label="Ngày kết thúc"
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

              {/* Giới hạn lượt sử dụng */}
              <div>
                <Typography variant="h6" className="font-semibold mb-4">
                  Giới hạn lượt sử dụng
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
                  label="Không giới hạn số lượt sử dụng"
                  className="mb-4"
                />

                {!formData.noUsageLimit && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Số lượt sử dụng"
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

              {/* Trạng thái kích hoạt */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.active}
                    onChange={(e) =>
                      handleInputChange("active", e.target.checked)
                    }
                  />
                }
                label="Kích hoạt"
                className="mb-4"
              />

              {/* Footer Buttons */}
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outlined"
                  className="text-gray-600 border-gray-300"
                  onClick={() => navigate("/vouchers")}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Lưu
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
