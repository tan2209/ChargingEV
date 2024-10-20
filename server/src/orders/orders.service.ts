import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Order } from './orders.model';
import { InjectModel } from '@m8a/nestjs-typegoose';
import { StationChargePriceService } from 'src/station-price/station-price.service';
import { Types } from 'mongoose';

@Injectable()
export class OrderService {
  order: any;
  constructor(@InjectModel(Order) private readonly orderModel: ReturnModelType<typeof Order>,
  private readonly stationChargePriceService: StationChargePriceService,) {}
 
  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const stationPrice = await this.stationChargePriceService.getStationChargePrice('Vinfast');
    if (!stationPrice) {
      throw new Error('Không tìm thấy giá sạc của trạm VinFast');
    }
    const totalTime = orderData.totalChargeTime/3600 || 0;
    const price = totalTime * stationPrice.pricePerKwh;
    const createdOrder = new this.orderModel({
      userId: orderData.userId,
      totalChargeTime: orderData.totalChargeTime,
      paymentStatus: orderData.paymentStatus,
      chargeDate: new Date(),
      price: price,
      stationName: 'VinFast',
      pricePerKwh: stationPrice.pricePerKwh,
    });
    return createdOrder.save();
  }

  async findLatestOrderByUserIdAndStatus(userId: string, paymentStatus: string): Promise<Order | null> {
    return this.orderModel.findOne({
      userId: userId,
      paymentStatus: paymentStatus,
    })
    .sort({ chargeDate: -1 }) 
    .lean() 
    .exec(); 
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
  
  
    const orders = await this.orderModel
      .find({ userId })
      .sort({ chargeDate: -1 })
      .lean()
      .exec()
    return orders;
  }

  async updatePaymentStatus(orderId: string, paymentStatus: string): Promise<Order> {
    if (!Types.ObjectId.isValid(orderId)) {
      throw new BadRequestException('Invalid orderId');
    }
    const order = await this.orderModel.findOneAndUpdate(
      new Types.ObjectId(orderId),
      { paymentStatus },
      { new: true },
    );

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}