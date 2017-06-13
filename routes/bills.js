var axios = require('axios');
var express = require('express')
var router = express.Router()
var knex = require('../db/knex')


router.get('/api', function(req, res) {
  axios.get('https://api.propublica.org/congress/v1/115/house/bills/passed.json', {
    headers: {'X-API-Key': '7qRl1TJZeM1Mm1VxZzOHG7A3qaa6517W3Nc0cpxg'}
  })
  .then(function(response) {
    var apiBills = response.data.results[0].bills;
    var truncatedBills = []
    var idArray = []
    truncatedBills = apiBills.map((bill) => {
      idArray.push(bill.bill_id)
      return {title: bill.title, bill_api_id: bill.bill_id, number: bill.number, pdf: bill.gpo_pdf_uri, bill_uri: bill.bill_uri, summary: bill.summary_short}
    })
    knex('bills').select('*').whereIn('bill_api_id', idArray)
    .then(bills => {
      var dbBills = bills.map(bill => {
        return bill.bill_api_id
      })

      var insertBills = truncatedBills.filter(bill => {
        return dbBills.indexOf(bill.bill_api_id) === -1
      })
      knex.insert(insertBills).into('bills')
      .then(id => {
        console.log(id);
      })
      res.json(response.data)
    })
  })
  .catch(function(error) {
    console.log('route failed');
  })
})

router.get('/db', function(req, res) {

  knex('bills').select('*')
  .then(bills => {
    res.json(bills)
  })

})


module.exports = router
