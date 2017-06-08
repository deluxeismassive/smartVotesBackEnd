
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table=>{
   table.increments()
   table.string('email')
   table.integer('zip_code')
 })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')

};
