import { Controller, Post, Body, Get, Param, Query, Patch } from '@nestjs/common';
import { OrderService } from './orders.service';
import { Order } from './orders.model';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('createOrder')
  async createOrder(@Body() orderData): Promise<Order> {
    return this.orderService.createOrder(orderData);
  }

  @Get(':userId')
  async getOrdersByUserIdToPayment(
  @Param('userId') userId: string ,
  @Query('paymentStatus') paymentStatus: string): Promise<Order> {
    const order = await this.orderService.findLatestOrderByUserIdAndStatus(userId, paymentStatus);
    return order
  }

  @Get('user/:userId')
  async getOrdersByUserId(
    @Param('userId') userId: string,
  ): Promise<Order[]> {
    return await this.orderService.getOrdersByUserId(userId);
  }

  @Patch(':orderId')
  async updatePaymentStatus(
    @Param('orderId') orderId: string,
    @Body('paymentStatus') paymentStatus: string,
  ): Promise<Order> {
    const updatedOrder = await this.orderService.updatePaymentStatus(orderId, paymentStatus);
    return updatedOrder;
  }
}