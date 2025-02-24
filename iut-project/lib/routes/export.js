'use strict';

module.exports = [
    {
        method: 'POST',
        path: '/export/csv',
        options: {
            tags: ['api'],
            auth: { scope: ['admin'] }
        },
        handler: async (request, h) => {
            const { filmService } = request.services();
            return await filmService.exportCSV(request.auth.credentials);
        }
    }
];
