const AuthorUseCase = require('../usecase/author.usecase');

const authorRouter = require('express').Router();

authorRouter.get('/author', AuthorUseCase.get);
authorRouter.get('/author/:id', AuthorUseCase.getOne);
authorRouter.post('/author', AuthorUseCase.insert);
authorRouter.patch('/author/:id', AuthorUseCase.update);
authorRouter.delete('/author/:id', AuthorUseCase.delete);

module.exports = authorRouter