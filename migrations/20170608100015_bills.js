
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bills', table=>{
   table.increments()
   table.text('title')
   table.string('bill_api_id')
   table.string('number')
   table.string('pdf')
   table.string('bill_uri')
   table.text('summary')
 })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('bills')
};
