import express from 'express';
import userRoute from './user.route';
import voucherRoute from './voucher.route';
import productRoute from './product.route';
import orderRoute from './order.route';
import categoryRoute from './category.route';
import checkoutRoute  from './checkout.route';
import addressRoute from './address.route';

const router = express.Router();

router.use('/users', userRoute);
router.use('/vouchers', voucherRoute);
router.use('/products', productRoute);
router.use('/orders', orderRoute);
router.use('/categories', categoryRoute);
router.use('/checkout', checkoutRoute);
router.use('/addresses', addressRoute);

module.exports = router;
