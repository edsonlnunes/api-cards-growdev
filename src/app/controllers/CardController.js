import Card from '../models/Card';
import { Client } from 'pg'

class CardController {
  async index(req, res) {
    const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: true });

    try {
      await client.connect()
    } catch (error) {
      return res.status(500).json({ error: 'ERRO_CONEXAO_BANCO' });
    }


    try {
      const { rowCount, rows } = await client.query('SELECT * FROM cards');
      if (rowCount == 0) {
        return res.status(404).json();
      }

      return res.status(200).json(rows);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'ERRO_RECUPERAR_CARDS' });
    }
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
