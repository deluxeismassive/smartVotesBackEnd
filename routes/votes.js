var axios = require('axios');
var express = require('express')
var router = express.Router()
var knex = require('../db/knex')


router.get('/:id', function(req, res) {

  knex('bills_users').join('users', 'users.id', 'user_id')
    .where({'email': req.params.id
  }).select('*')
  .then(votes => {
    res.json(votes)
  })

})

router.get('/single/:id', function(req, res) {

  axios.get('https://api.propublica.org/congress/v1/members/'+req.params.id+'/votes.json', {
    headers: {'X-API-Key': '7qRl1TJZeM1Mm1VxZzOHG7A3qaa6517W3Nc0cpxg'}
  })
  .then(function(response) {
    res.json(response.data);
  })
  .catch(function(error) {
  })

})

router.put('/', function(req, res){

  knex('bills_users')
    .where({'bill_id': req.body.bill_id, 'user_id': req.body.user_id})
    .select('*')
    .then(vote => {
      if (vote.length === 1) {
        return knex('bills_users')
        .where({'bill_id': req.body.bill_id, 'user_id': req.body.user_id})
        .update({'yes_no': req.body.yes_no})
      } else {
        return knex('bills_users')
        .insert(req.body)
      }
    })
    .then(() => {
      res.send(200)
    })
})

module.exports = router
