import {
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Dialog,
  DialogTitle,
  TextField,
  Paper,
  DialogActions,
  DialogContent,
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Add as AddIcon,
  CloudUpload,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../features/category/categorySlice";
const Category = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("create");
  const [editingCategory, setEditingCategory] = useState(null);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null,
  });
  
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  // Mở modal tạo mới
  const handleOpenCreateDialog = () => {
    setDialogType("create");
    setForm({ name: "", description: "", image: null });
    setEditingCategory(null);
    setDialogOpen(true);
  };

  // Mở modal sửa
  const handleOpenEditDialog = (category) => {
    setDialogType("edit");
    setForm({
      name: category.name || "",
      description: category.description || "",
      image: null, 
    });
    setEditingCategory(category);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingCategory(null);
  };

  const handleSave = () => {
    if (dialogType === "create") {
      // Gửi dữ liệu tạo mới category
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      if (form.image) formData.append("image", form.image);
      dispatch(createCategory(formData));
    } else {
      // Gửi dữ liệu cập nhật category
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      if (form.image) formData.append("image", form.image);
      console.log(editingCategory);
      
      dispatch(
        updateCategory({
          id: editingCategory._id,
          data: formData,
        })
      );
    }
    setDialogOpen(false);
    setEditingCategory(null);
  };

  const handleFormChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFormChange("image", file);
    }
  };
  const handleDeleteCategory = (categoryId) => {
    dispatch(deleteCategory(categoryId));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <Typography
              variant="h4"
              component="h1"
              className="font-bold text-gray-900"
            >
              Danh mục
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenCreateDialog}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-sm"
              sx={{
                backgroundColor: "#2563eb",
                "&:hover": {
                  backgroundColor: "#1d4ed8",
                },
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              Thêm danh mục
            </Button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card
                key={category._id}
                className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                sx={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow:
                    "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                  "&:hover": {
                    boxShadow:
                      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                  },
                }}
                onClick={() => handleOpenEditDialog(category)}
              >
                <Box className="relative">
                  <CardMedia
                    component="img"
                    height="200"
                    image={category.image.url}
                    alt={category.name}
                    className="h-48 w-full object-cover"
                  />
                </Box>
                <CardContent className="p-4 flex items-center justify-between">
                  <Typography
                    variant="h6"
                    component="h3"
                    className="font-semibold text-gray-900 mb-1"
                    sx={{ fontSize: "1.125rem" }}
                  >
                    {category.name}
                  </Typography>
                  <IconButton aria-label="delete" onClick={e=>{e.stopPropagation();handleDeleteCategory(category._id)}}>
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            ))}
          </div>
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
              {dialogType === "create"
                ? "Thêm danh mục"
                : `Chỉnh sửa: ${editingCategory?.name}`}
            </Typography>
          </DialogTitle>

          <DialogContent className="p-6">
            <div className="flex flex-col gap-4 mt-2">
              <TextField
                fullWidth
                label="Tên danh mục"
                value={form.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
                variant="outlined"
                required
                autoFocus
              />
              <TextField
                fullWidth
                label="Mô tả"
                value={form.description}
                onChange={(e) =>
                  handleFormChange("description", e.target.value)
                }
                variant="outlined"
                multiline
                required
                rows={3}
              />
              <div>
                <Typography variant="body2" className="text-gray-600 mb-2">
                  Ảnh danh mục
                </Typography>
                <Paper
                  className="border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400 transition-colors cursor-pointer"
                  onClick={() =>
                    document.getElementById("edit-file-upload")?.click()
                  }
                >
                  <input
                    id="edit-file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <CloudUpload className="text-blue-600 mb-1" />
                  <Typography
                    variant="body2"
                    className="text-blue-600 font-medium"
                  >
                    {dialogType === "create" ? "Tải ảnh lên" : "Đổi ảnh"}
                  </Typography>
                  <Typography variant="caption" className="text-gray-500">
                    {form.image
                      ? typeof form.image === "string"
                        ? form.image
                        : form.image.name
                      : "Hoặc kéo thả ảnh vào đây"}
                  </Typography>
                  {/* Hiển thị ảnh preview nếu đã chọn */}
                  {(form.image ||
                    (dialogType === "edit" && editingCategory?.image?.url)) && (
                    <img
                      src={
                        form.image
                          ? typeof form.image === "string"
                            ? form.image
                            : URL.createObjectURL(form.image)
                          : editingCategory?.image?.url
                      }
                      alt="Preview"
                      style={{
                        marginTop: 16,
                        maxHeight: 160,
                        maxWidth: "100%",
                        borderRadius: 8,
                        objectFit: "cover",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    />
                  )}
                </Paper>
              </div>
            </div>
          </DialogContent>
          <DialogActions className="p-4 border-t border-gray-200">
            <Button onClick={handleCloseDialog} className="text-gray-600">
              Hủy
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              className="bg-blue-600"
            >
              {dialogType === "create" ? "Thêm mới" : "Lưu thay đổi"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Category;
