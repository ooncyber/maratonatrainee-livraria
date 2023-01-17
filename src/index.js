const express = require('express');
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./banco.sqlite');
const bookModuleRouter = require('./module/book/router/book.router')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


db.serialize(() => {
  db.run(`create table if not exists book (
    id integer primary key AUTOINCREMENT, title text not null, release_date text not null
  );`);

  db.run(`create table if not exists author (
    id integer primary key AUTOINCREMENT, fullname text not NULL
   );`);

  db.run(`create table if not exists editor (
     id integer primary key AUTOINCREMENT, name text not NULL
    );`);

  db.run(`create table if not exists book_author  (
      id integer primary key AUTOINCREMENT,
      idbook integer not null,
      idauthor integer not null,
      ideditor integer not null,
      foreign key (idbook) references book(id),
      foreign key (idauthor) references author(id),
      foreign key (ideditor) references editor(id)
    );");`);
})


app.use(bookModuleRouter);

app.listen(80, () => {
  console.log('http://localhost');
})