const { Author } = require('../models/authors.model');

module.exports.index = (req, res) => {
  res.json({
    message: "Index from Controller"
  });
};
// --------------- CREATE ---------------- //
module.exports.createNewAuthor = (req, res) => {
  const data = {
    ...req.body,
    photo: req.file.filename
  }
  Author.create(data)
    .then(newAuthor => res.status(201).json(newAuthor))
    .catch(err => res.status(400).json(err));
};
// ------------ SIMPLE CREATE ------------ //
module.exports.createAuthor = (req, res) => {
  Author.create(req.body)
    .then(newAuthor => res.status(201).json(newAuthor))
    .catch(err => res.status(400).json(err));
};
// ------------ RETRIEVE ALL ------------- //
module.exports.findAuthorsAll = (req, res) => {
  Author.find()
    .then(allAuthors => res.status(200).json(allAuthors))
    .catch(err => res.status(400).json(err));
};
// ------------ RETRIEVE ONE ------------- //
module.exports.findAuthor = (req, res) => {
  Author.findById(req.params.id)
    .then(oneAuthor => {res.status(200).json({ results: oneAuthor })})
    .catch(err => res.status(400).json(err));
};
// ---------- RETRIEVE RANDOM ----------- //
module.exports.findRandomAuthor = (req, res) => {
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }
  Author.find()
    .then(allAuthors => {
      const randomIndex = getRandomInt(allAuthors.length)
      res.status(200).json({ results: allAuthors[randomIndex] })
    })
    .catch(err => res.status(400).json(err));
};
// ------------ SIMPLE RANDOM ------------ //
module.exports.findRandomAuthor = (req, res) => {
  Author.findRandom({ _id: req.params.id })
    .then(allAuthors => {
      let oneRandomAuthor = allAuthors[Math.floor(Math.random() * allAuthors.length)]
      res.status(200).json({ results: oneRandomAuthor })
    })
    .catch(err => res.status(400).json(err));
};
// --------------- UPDATE ---------------- //
module.exports.updateAuthor = (req, res) => {
  Author.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then(updatedAuthor => {res.status(200).json(updatedAuthor)})
    .catch(err => res.status(400).json(err));
};
// --------------- DELETE ---------------- //
module.exports.deleteAuthor = (req, res) => {
  Author.findByIdAndDelete(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(400).json(err));
};