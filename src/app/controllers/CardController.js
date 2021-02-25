import Card from '../models/Card';

class CardController {
  async index(req, res) {
    console.log('chegou no index')
    let cards;
    try {
      cards = await Card.findAll();
      console.log('pegou os cards')
    } catch (error) {
      print('error aq ', error)
    }

    if (!cards || cards.length == 0) {
      console.log('entrou no if')
      res.status(404).json();
    }

    return res.status(200).json(cards);
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
