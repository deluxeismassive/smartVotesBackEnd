var axios = require('axios');
var express = require('express')
var knex = require('../db/knex')
var router = express.Router()

router.get('/:id', function(req, res) {

  knex.select('email').from('users').where('email', req.params.id)
  .then((user) => {
    if (user.length === 1) {
      return
    } else {
      return knex('users').insert({email: req.params.id})
    }
  })
  .then(() => {
    knex.select('id').from('users').where({email: req.params.id})
    .then((id) => {
      res.json(id)
    })
  })
})

module.exports = router
