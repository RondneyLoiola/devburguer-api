import * as yup from 'yup';
import Category from '../models/Category.js';

class CategoryController {
  async store(req, res) {
    //cria
    const schema = yup.object({
      name: yup.string().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
      // o strict foi removido por causa do formdata no insomnia, para receber o price como number
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    const { name } = req.body;
    const { filename } = req.file;

    const existingCategory = await Category.findOne({
      where: {
        name,
      },
    });

    if (existingCategory) {
      return res.status(400).json({ error: 'Category already exists!' });
    }

    const newCategory = await Category.create({
      name,
      path: filename,
    });

    return res.status(201).json(newCategory);
  }

  async update(req, res) {
    //cria
    const schema = yup.object({
      name: yup.string(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
      // o strict foi removido por causa do formdata no insomnia, para receber o price como number
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    const { name } = req.body;
    const { id } = req.params;

    let path;
    if (req.file) {
      const { filename } = req.file;
      path = filename;
    }

    const existingCategory = await Category.findOne({
      where: {
        name,
      },
    });

    if (existingCategory) {
      return res.status(400).json({ error: 'Category already exists!' });
    }

    await Category.update(
      {
        name,
        path,
      },
      {
        where: {
          id,
        },
      },
    );

    return res.status(201).json({ message: 'Category updated!' });
  }

  async index(_req, res) {
    //busca
    const categories = await Category.findAll();

    return res.status(200).json(categories);
  }
}

export default new CategoryController();
