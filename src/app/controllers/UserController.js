import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
      name: Yup.string()
        .required()
    });

    try {
      const validate = await schema.validate(req.body);
      if (!validate) {
        return res.status(400).json({ error: 'Rquerid fields.' });
      }
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User alredy exists.' });
    }

    const { name, email } = await User.create(req.body);

    return res.json({
      name,
      email,
    });
  }

  async update(req, res) {
    const { name } = req.body;
    const user = await User.findByPk(req.userId);
    const { id, name: newName, email } = await user.update(req.body);

    return res.json({
      id,
      name: newName,
      email
    });
  }
}

export default new UserController();
