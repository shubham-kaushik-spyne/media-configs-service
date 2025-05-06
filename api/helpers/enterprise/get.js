

 // from datastores.js

module.exports = {
    friendlyName: 'Create team configuration',
    description: 'Creates or updates a team configuration with the provided data',

    inputs: {
        enterprise_id: {
            type: 'string',
            required: true,
            description: 'Enterprise ID'
        },
        team_id: {
            type: 'string',
            required: false,
            description: 'Team ID'
        },
        session: {
            type: 'ref',
            required: false,
            description: 'Mongoose session for transaction'
        }
    },

    fn: async function ({ enterprise_id, team_id, session }) {
        const rdi = sails.getDatastore('readReplicaPrimary');

        sails.log.info('getting enterprise');
        let query = `SELECT * FROM enterprise_details WHERE enterprise_id = $1 and is_active = 1`;
        let enterprise = await rdi.sendNativeQuery(query, [enterprise_id]);
        return enterprise?.rows?.length > 0 ? enterprise?.rows[0] : null;
    }
}; 