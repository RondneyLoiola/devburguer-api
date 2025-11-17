import * as yup from 'yup';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Order from '../schemas/Order.js';

// configurado de acordo com o schema
class OrderController {
  async store(req, res) {
    // //cria
    const schema = yup.object({
      products: yup
        .array()
        .required()
        .of(
          //array de
          yup.object({
            id: yup.number().required(),
            quantity: yup.number().required(),
          }),
        ),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false, strict: true });
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    const { userId, userName } = req;
    const { products } = req.body; //-> { products: [{ id: 1, quantity: 2 }] }

    const productsId = products.map((prd) => prd.id); //pega o id de cada produto

    const findedProducts = await Product.findAll({
      // busca os produtos pelo id
      where: {
        id: productsId,
      },
      include: {
        //inclui o relacionamento com a categoria
        model: Category,
        as: 'category',
        attributes: ['name'],
      },
    });

    const mapedProducts = findedProducts.map((prd) => {
      const quantity = products.find((p) => p.id === prd.id).quantity;

      const newProduct = {
        // apenas o que vai aparecer no pedido
        id: prd.id,
        name: prd.name,
        price: prd.price,
        url: prd.url,
        category: prd.category.name,
        quantity,
      };

      return newProduct;
    });

    const order = {
      //cria o pedido
      user: {
        id: userId,
        name: userName,
      },
      products: mapedProducts,
      status: 'Pedido realizado com sucesso!',
    };

    const newOrder = await Order.create(order);

    return res.status(201).json(newOrder);
  }

  async update(req, res) {
    const schema = yup.object({
      status: yup.string().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false, strict: true });
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    const { status } = req.body;
    const { id } = req.params;

    try {
      await Order.updateOne({ _id: id }, { status });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Status updated!' });
  }

  async index(_req, res) {
    const orders = await Order.find();

    return res.status(200).json(orders);
  }
}

export default new OrderController();
