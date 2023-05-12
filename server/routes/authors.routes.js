const authorsController = require('../controllers/authors.controller');

module.exports = function (app) {
  app.get('/', authorsController.index);
  app.get('/api/authors/', authorsController.findAuthorsAll);
  app.post('/api/authors/new', authorsController.createAuthor);
  app.get('/api/authors/:id', authorsController.findAuthor);
  app.patch('/api/authors/update/:id', authorsController.updateAuthor);
  app.delete('/api/authors/delete/:id', authorsController.deleteAuthor);
}