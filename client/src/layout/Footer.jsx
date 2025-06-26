const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-12">
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4">FASHION STORE</h3>
          <p className="text-sm text-gray-600">Thời trang cao cấp với các thương hiệu nổi tiếng thế giới.</p>
        </div>
        <div>
          <h3 className="font-bold mb-4">Thông tin</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Về chúng tôi</li>
            <li>Chính sách bảo mật</li>
            <li>Điều khoản sử dụng</li>
            <li>Liên hệ</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Dịch vụ khách hàng</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Trung tâm trợ giúp</li>
            <li>Chính sách đổi trả</li>
            <li>Phương thức vận chuyển</li>
            <li>Phương thức thanh toán</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Liên hệ</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Email: info@fashionstore.com</li>
            <li>Điện thoại: 1900 1234</li>
            <li>Địa chỉ: 123 Đường Thời Trang, TP. Hồ Chí Minh</li>
          </ul>
        </div>
      </div>
      <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
        © 2023 Fashion Store. Tất cả các quyền được bảo lưu.
      </div>
    </div>
  </footer>
  )
}

export default Footer