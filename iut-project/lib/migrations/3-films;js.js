'use strict';

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable('films', (table) => {
            table.increments('id').primary();
            table.string('titre').notNullable();
            table.text('description').notNullable();
            table.date('date_sortie').notNullable();
            table.string('realisateur').notNullable();
            table.timestamps(true, true);
        });
    },
    down: async (knex) => {
        await knex.schema.dropTableIfExists('films');
    }
};
