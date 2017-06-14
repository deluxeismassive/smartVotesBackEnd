
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bills_users', table=>{
   table.integer('user_id')
   table.integer('bill_id')
   table.bool('yes_no')
   table.text('bill_uri')
 })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('bills_users')

};
