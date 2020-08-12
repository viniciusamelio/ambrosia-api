import { Request } from "express";

const axios = require('axios');

export interface PicPayBuyer {
    firstName: string;
    lastName: string;
    document: string;
    email: string;
    phone: string;
}

export interface PicPayPayment {
    referenceId: string;
    callbackUrl: string;
    value: number;
    expiresAt: Date;
    buyer: PicPayBuyer;
}

const headers = { "x-picpay-token": process.env.X_PP_TOKEN, 'accept-encoding': 'gzip,deflate' };

export class PicPayService {

    async createPayment(payment: PicPayPayment) {
        try {
            const result = await axios.post('https://appws.picpay.com/ecommerce/public/payments', payment, {
                headers: headers
            });
            return result.data;
        } catch (error) {
            return error;
        }
    }

    async getStatus(referenceId: string) {
        try {
            const result = await axios.get(`https://appws.picpay.com/ecommerce/public/payments/${referenceId}/status`, {
                headers: headers
            });

            return result.data;
        } catch (error) {
            return error;
        }
    }
}