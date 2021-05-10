
exports.up = function(knex) {
  return knex.schema.createTable('tacos', table => {
      table.increments()
      table.string('username')
      table.string('password_digest')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tacos')
};
