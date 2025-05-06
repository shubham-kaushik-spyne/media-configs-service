

 // from datastores.js

const { AI_BACKGROUND_TYPE } = require("../../constant/enum/ai-background-type");

 module.exports = {
    friendlyName: 'Create team configuration',
    description: 'Creates or updates a team configuration with the provided data',

    inputs: {
        bg_ids: {
            type: 'ref',
            required: true,
            description: 'Background ID'
        },
        ai_background_type: {
            type: 'string',
            required: false,
            description: 'AI Background Type',
        },
        session: {
            type: 'ref',
            required: false,
            description: 'Mongoose session for transaction'
        }
    },

    fn: async function ({ bg_ids, ai_background_type, session }) {
        const rdi = sails.getDatastore('readReplicaPrimary');

        bg_ids = bg_ids?.filter(bg_id => bg_id !== null);
    
        sails.log.info('getting background');
        const value = bg_ids.join(',');
        let query = ` select * from eventila.automobile_background_master where bg_id IN (${value}) and active = 1`;
        if (ai_background_type) {
            query += ` and ai_background_type = ${ai_background_type}`;
        }
        let background = await rdi.sendNativeQuery(query);
        return background?.rows?.length > 0 ? background?.rows : null;
    }
}; 