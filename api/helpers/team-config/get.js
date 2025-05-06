

 // from datastores.js

const { TeamConfigRepository } = require("../../repositories/TeamConfigRepository");

 module.exports = {
    friendlyName: 'Get number plate',
    description: 'Get number plate',

    inputs: {
        enterprise_id: {
            type: 'string',
            required: true,
            description: 'Enterprise ID'
        },
        team_id: {
            type: 'string',
            required: true,
            description: 'Team ID'
        },
        session: {
            type: 'ref',
            required: false,
            description: 'Mongoose session for transaction'
        }
    },

    fn: async function ({ enterprise_id, team_id, session }) {

        sails.log.info('getting number plates');
       const res = await TeamConfigRepository.findByEnterpriseAndTeam(enterprise_id, team_id, session);
       return res;
    }
}; 