import { Injectable } from '@nestjs/common';
import * as config from 'config';
import { HashAlgorithm, ProductCode, VerifyReturnUrl, VNPay, VnpLocale } from 'vnpay';

@Injectable()
export class PaymentService {
  private readonly vnp_TmnCode = config.get<string>('vnp_TmnCode');
  private readonly vnp_HashSecret = config.get<string>('vnp_HashSecret');
  private readonly vnp_ReturnUrl = config.get<string>('vnp_ReturnUrl');
  private readonly vnpay: VNPay;

  constructor() {
    this.vnpay = new VNPay({
      tmnCode: this.vnp_TmnCode,
      secureSecret: this.vnp_HashSecret,
      vnpayHost: 'https://sandbox.vnpayment.vn',
      testMode: true,
      hashAlgorithm: HashAlgorithm.SHA512,
    });
  }

  createPaymentUrl(amount: number, ipAddr: string, orderId: string): string {
    const vnp_TxnRef = orderId
    const paymentUrl = this.vnpay.buildPaymentUrl({
      vnp_Amount: amount,
      vnp_IpAddr: ipAddr,
      vnp_TxnRef: vnp_TxnRef,
      vnp_OrderInfo: `Thanh toan don hang ${vnp_TxnRef}`,
      vnp_OrderType: ProductCode.Other,
      vnp_ReturnUrl: this.vnp_ReturnUrl,
      vnp_Locale: VnpLocale.VN,
    });
    return paymentUrl;
  }

  verifyReturnUrl(query: any): { success: boolean; message?: string } {
    let verify: VerifyReturnUrl;
    try {
      verify = this.vnpay.verifyReturnUrl(query);
    } catch (error) {
      return { success: false, message: 'Dữ liệu không hợp lệ' };
    }
    return { success: verify.isSuccess };
  }

}
