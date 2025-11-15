import * as yup from 'yup';

class ProductController {
  async store(req, res) {
    const schema = yup.object({
      name: yup.string().required(),
      price: yup.number().required(),
      category: yup.string().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }
    
    return res.status(201).json({ ok: true });
  }
}

export default new ProductController();
