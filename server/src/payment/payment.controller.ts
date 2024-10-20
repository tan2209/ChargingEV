import { Controller, Get, Post, Body, Query, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  getOrderList(@Res() res) {
    res.json({ message: 'Danh sách đơn hàng' });
  }

  @Get('create_payment_url')
  getCreatePaymentUrl(@Res() res) {
    res.json({ title: 'Tạo mới đơn hàng', amount: 10000 });
  }

  @Post('create_payment_url')
  createPaymentUrl(
    @Body('amount') amount: number,
    @Body('orderId') orderId: string,
    @Req() req,
    @Res() res,
  ) {
    
    const ipAddr = 
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.ip;
    const paymentUrl = this.paymentService.createPaymentUrl(amount, ipAddr, orderId);
    res.json({ paymentUrl });
  }

  @Get('vnpay_return')
  async vnpayReturn(@Query() queryParams, @Res() res) {
    const result = this.paymentService.verifyReturnUrl(queryParams);
    if (result) {
      return res.status(200).json(queryParams);  
    } else {
      return res.status(400).json({ error: 'Dữ liệu không hợp lệ' });
    }
  }
}
