const express = require('express');

const BookModuleUseCase = require('../usecase/book.module');

const bookRouter = express.Router();

bookRouter.get('/book', BookModuleUseCase.getAll)
bookRouter.get('/book/:id', BookModuleUseCase.getOne)
bookRouter.post('/book/:id', BookModuleUseCase.insert)
bookRouter.patch('/book/:id', BookModuleUseCase.update)
bookRouter.delete('/book/:id', BookModuleUseCase.delete)

module.exports = bookRouter