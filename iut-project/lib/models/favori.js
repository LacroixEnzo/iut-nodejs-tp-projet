'use strict';

const { Model } = require('schwifty');

module.exports = class Favori extends Model {
    static get tableName() {
        return 'favoris';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['user_id', 'film_id'],
            properties: {
                id: { type: 'integer' },
                user_id: { type: 'integer' },
                film_id: { type: 'integer' },
                created_at: { type: 'string', format: 'date-time' }
            }
        };
    }
};
