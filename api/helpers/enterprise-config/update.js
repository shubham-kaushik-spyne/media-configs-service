
const { EnterpriseConfigurationsRepository } = require('../../repositories/EnterpriseConfigurationsRepository');

module.exports = {
    friendlyName: 'Update team configuration',
    description: 'Updates an existing team configuration with the provided data',

    inputs: {
        enterprise_id: {
            type: 'string',
            required: false,
            description: 'Enterprise ID'
        },
        bg_config: {
            type: 'ref',
            required: false,
            description: 'Background configuration',
        
        },
        numberplate_config: {
            type: 'ref',
            required: false,
            description: 'Numberplate configuration',
        
        },
        banner_config: {
            type: 'ref',
            required: false,
            description: 'Banner configuration',
       
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
        },
      
    },

    fn: async function ({ enterprise_id, bg_config, numberplate_config, banner_config, product_cat_id, session }) {
        sails.log.info('Starting team configuration update process');


        // First check if the configuration exists
        let existing_config = await EnterpriseConfigurationsRepository.findByEnterprise(enterprise_id, session);
        if (!existing_config && !existing_config?.category) {
            sails.log.error('Enterprise configuration not found for enterprise:', enterprise_id);
            throw new Error('Enterprise configuration not found');
        }

        let updated_category = existing_config?.category?.[product_cat_id];

        if (bg_config){
            if (bg_config.user_configurable != undefined){
                updated_category["background"] = {
                    ...updated_category["background"],
                    is_active: true,
                    is_user_configurable:!!bg_config?.user_configurable

                };
            }
        }
        if (numberplate_config){
            if (numberplate_config.user_configurable != undefined){
                updated_category["license_plate"] = {
                    ...updated_category["license_plate"],
                    is_active: true,
                    is_user_configurable:!!numberplate_config?.user_configurable
                };
            }
        }
        if (banner_config){
            if (banner_config.user_configurable != undefined){
                updated_category["banner"] = {
                    ...updated_category["banner"],
                    is_active: true,
                    is_user_configurable:!!banner_config?.user_configurable
                };
            }
        }

        const updated_config = await EnterpriseConfigurationsRepository.update(enterprise_id, {category: {[product_cat_id]: updated_category}}, session);

        let is_updated = updated_config?.modifiedCount > 0;
        
        sails.log.info('Successfully updated team configuration');
        return is_updated;
    }
}
