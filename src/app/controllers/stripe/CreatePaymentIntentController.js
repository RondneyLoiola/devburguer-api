import Stripe from 'stripe';
import * as yup from 'yup';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  const total = items.reduce((acc, current) => {
    return current.price * current.quantity + acc;
  }, 0);
  return total * 100;
};

class CreatePaymenteIntentController {
  async store(req, res) {
    const schema = yup.object().shape({
      products: yup
        .array()
        .required()
        .of(
          yup.object().shape({
            id: yup.number().required(),
            quantity: yup.number().required(),
            price: yup.number().required(),
          }),
        ),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false, strict: true });
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    const { products } = req.body;

    const amount = calculateOrderAmount(products);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'brl',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      //dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    });
  }
}

export default new CreatePaymenteIntentController();
