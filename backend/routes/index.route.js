import express from 'express';
import userRoute from './user.route';
import voucherRoute from './voucher.route';
import productRoute from './product.route';
import orderRoute from './order.route';
import categoryRoute from './category.route';
import checkoutRoute  from './checkout.route';
import addressRoute from './address.route';
import cartRoute from './cart.route';
const router = express.Router();

router.use('/user', userRoute);
router.use('/voucher', voucherRoute);
router.use('/product', productRoute);
router.use('/order', orderRoute);
router.use('/cart', cartRoute);
router.use('/category', categoryRoute);
router.use('/checkout', checkoutRoute);
router.use('/address', addressRoute);

module.exports = router;
