
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bills', table=>{
   table.increments()
   table.string('title')
   table.integer('bill_api_id')
 })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('bills')
};
