import Card from '../models/Card';

class CardController {
  async index(req, res) {
    const cards = await Card.findAll();

    if (!cards || cards.length == 0) {
      return res.status(404).json();
    }

    return res.json(cards);
  }

  async show(req, res) {
    const { card } = req;
    return res.json(card);
  }

  async store(req, res) {
    const card = await Card.create(req.body);
    res.json(card);
  }

  async update(req, res) {
    const { card } = req;
    const { title, content } = req.body;

    card.title = title;
    card.content = content;

    card.save();

    res.json(card);
  }

  async delete(req, res) {
    const { card } = req;

    card.destroy();

    const cards = await Card.findAll();

    res.json(cards);
  }
}

export default new CardController();
