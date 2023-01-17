const express = require('express');
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./banco.sqlite');

const router = express.Router();
router.get('/book', (req, res) => {
  db.all('select * from book', (err, rows) => {
    res.json(rows)
  });
})
router.get('/book/:id', (req, res) => {
  const stmt = db.prepare(`select * from book where id=?`,);
  stmt.all(req.params.id, (err, row) => {
    return res.json(row[0])
  });
})

router.post("/book", (req, res) => {
  const { title, release_date } = req.body;
  if (!title || !release_date) {
    return res.status(400).json({ message: 'Necessário title e release_date' })
  }
  const stmt = db.prepare('insert into book (title, release_date) values (?,?)');
  stmt.run(title, release_date)

  return res.json({ title, release_date })
})


router.put('/book/:id', (req, res) => {
  const { title, release_date } = req.body;
  if (!title || !release_date) {
    return res.status(400).json({ message: 'Necessário passar todos os parametros para alteração' })
  }

  const campos = `title='${title}', release_date='${release_date}'`

  const stmt = db.prepare(`update book set ${campos} where id=?`)
  stmt.run(req.params.id);
  return res.json({ title, release_date })
})

router.patch('/book/:id', (req, res) => {
  const { title, release_date } = req.body;
  if (!title && !release_date) {
    return res.status(400).json({ message: 'Necessário passar ao menos um parametro para alteração' })
  }

  let campos = '';
  if (title) {
    campos = `title='${title}', `
  }
  if (release_date) {
    campos += `release_date='${release_date}'`
  }

  const stmt = db.prepare(`update book set ${campos} where id=?`)
  stmt.run(req.params.id);
  return res.json({ title, release_date })
})

router.delete('/book/:id', (req, res) => {
  const stmt = db.prepare('delete from book where id=?')
  stmt.run(req.params.id)
  return res.status(201);
})

module.exports = router;