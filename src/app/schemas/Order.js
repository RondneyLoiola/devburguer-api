//mongo trabalha com schemas e não com migrations

import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    user: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    products: [
      {
        id: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //faz o createdAt e updatedAt automaticamente
  },
);

export default mongoose.model('Order', OrderSchema);
