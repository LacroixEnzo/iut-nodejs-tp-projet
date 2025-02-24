'use strict';

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable('favoris', (table) => {
            table.increments('id').primary();
            table.integer('user_id').unsigned().notNullable();
            table.integer('film_id').unsigned().notNullable();
            table.foreign('user_id').references('users.id').onDelete('CASCADE');
            table.foreign('film_id').references('films.id').onDelete('CASCADE');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
    },
    down: async (knex) => {
        await knex.schema.dropTableIfExists('favoris');
    }
};
