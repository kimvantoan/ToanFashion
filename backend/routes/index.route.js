import express from 'express';
import userRoute from './user.route.js';
import voucherRoute from './voucher.route.js';
import productRoute from './product.route.js';
import orderRoute from './order.route.js';
import categoryRoute from './category.route.js';
import checkoutRoute  from './checkout.route.js';
import addressRoute from './address.route.js';
import cartRoute from './cart.route.js';
const router = express.Router();

router.use('/user', userRoute);
router.use('/voucher', voucherRoute);
router.use('/product', productRoute);
router.use('/order', orderRoute);
router.use('/cart', cartRoute);
router.use('/category', categoryRoute);
router.use('/checkout', checkoutRoute);
router.use('/address', addressRoute);

export default router;
