

 // from datastores.js

const { EnterpriseConfigurationsRepository } = require("../../repositories/EnterpriseConfigurationsRepository");

 module.exports = {
    friendlyName: 'Get number plate',
    description: 'Get number plate',

    inputs: {
        enterprise_id: {
            type: 'string',
            required: true,
            description: 'Enterprise ID'
        },
        product_cat_id: {
            type: 'string',
            required: false,
            description: 'Product category ID',
            defaultsTo: 'cat_d8R14zUNE'
        },
        session: {
            type: 'ref',
            required: false,
            description: 'Mongoose session for transaction'
        }
    },

    fn: async function ({ enterprise_id, product_cat_id, session }) {

        sails.log.info('getting enterprise config');
        const res = await EnterpriseConfigurationsRepository.findByEnterprise(enterprise_id, session);
        return res?.category?.[product_cat_id];
    }
}; 