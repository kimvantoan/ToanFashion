import { Skeleton, IconButton } from "@mui/material";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse w-[230px]">
      <div className="relative">
        <Skeleton variant="rectangular" height={160} className="w-full" />
        <IconButton
          className="absolute top-2 left-2 bg-white shadow-sm p-1"
          size="small"
          disabled
        >
          <Skeleton variant="circular" width={24} height={24} />
        </IconButton>
      </div>
      <div className="p-3">
        <Skeleton width="40%" height={12} className="mb-1" />
        <Skeleton width="100%" height={20} className="mb-2" />
        <div className="flex items-center gap-2">
          <Skeleton width={60} height={18} />
          <Skeleton width={40} height={14} />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
