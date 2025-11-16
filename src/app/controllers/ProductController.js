import * as yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

class ProductController {
  async store(req, res) {
    //cria
    const schema = yup.object({
      name: yup.string().required(),
      price: yup.number().required(),
      category_id: yup.number().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
      // o strict foi removido por causa do formdata no insomnia, para receber o price como number
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    const { name, price, category_id } = req.body;
    const { filename } = req.file;
    //const image = req.file

    const newProduct = await Product.create({
      name,
      price,
      category_id,
      path: filename,
    });

    return res.status(201).json(newProduct);
  }

  async index(_req, res) {
    //busca
    const products = await Product.findAll({
      include: { //inclui o relacionamento com a categoria
        model: Category,
        as: 'category',
        attributes: ['id', 'name'] //retorna o id e o name da categoria
      }
    });

    return res.status(200).json(products);
  }
}

export default new ProductController();
