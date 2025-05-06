const { TeamConfigRepository } = require('../../repositories/TeamConfigRepository');

module.exports = {
    friendlyName: 'Update team configuration',
    description: 'Updates an existing team configuration with the provided data',

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
        user_id: {
            type: 'string',
            required: false,
            description: 'User ID who is updating the configuration'
        },
        session: {
            type: 'ref',
            required: false,
            description: 'Mongoose session for transaction'
        },
        team_config: {
            type: 'ref',
            required: false,
            description: 'Team configuration'
        }
    },

    fn: async function ({ enterprise_id, team_id, bg_config, numberplate_config, banner_config, user_id, session, team_config }) {
        sails.log.info('Starting team configuration update process');
        sails.log.debug('Input parameters:', { enterprise_id, team_id, bg_config, numberplate_config, banner_config });

        // First check if the configuration exists
        let existing_config = team_config || await TeamConfigRepository.findByEnterpriseAndTeam(enterprise_id, team_id, session);
        
        if (!existing_config) {
            sails.log.error('Team configuration not found for enterprise:', enterprise_id, 'team:', team_id);
            throw new Error('Team configuration not found');
        }
        let update_data = {
            "enterprise_id": enterprise_id,
            "team_id": team_id,
            "last_updated_by": user_id,
        };

        // Only update the fields that are provided
        if (bg_config) {
            const bgs_set = new Set([...existing_config["bg_config"]["bgs"], ...bg_config?.["bgs"] || []]);
            if (bg_config?.default_bg){
                bgs_set.add(bg_config?.default_bg);
            }
            update_data["bg_config"] = {
                ...existing_config["bg_config"],
                "bgs": Array.from(bgs_set),
                "user_configurable": bg_config["user_configurable"] == null ? existing_config["bg_config"]?.["user_configurable"] : bg_config["user_configurable"],
                "default_bg": bg_config["default_bg"] == null ? existing_config["bg_config"]?.["default_bg"] : bg_config["default_bg"]
            }
        }

        if (numberplate_config) {
            const numberplates_set = new Set([...existing_config["numberplate_config"]["numberplates"], ...numberplate_config?.["numberplates"] || []]);
            if (numberplate_config?.default_numberplate){
                numberplates_set.add(numberplate_config?.default_numberplate);
            }
            update_data["numberplate_config"] = {
                ...existing_config["numberplate_config"],
                "numberplates": Array.from(numberplates_set),
                "user_configurable": numberplate_config["user_configurable"] == null ? existing_config["numberplate_config"]?.["user_configurable"] : numberplate_config["user_configurable"],
                "default_numberplate": numberplate_config["default_numberplate"] == null ? existing_config["numberplate_config"]?.["default_numberplate"] : numberplate_config["default_numberplate"]
            }
        }

        if (banner_config) {
            const banners_set = new Set([...existing_config["banner_config"]["banners"], ...banner_config?.["banners"] || []]);
            if (banner_config?.default_banner){
                banners_set.add(banner_config?.default_banner);
            }
            update_data["banner_config"] = {
                ...existing_config["banner_config"],
                "banners": Array.from(banners_set),
                "user_configurable": banner_config["user_configurable"] == null ? existing_config["banner_config"]?.["user_configurable"] : banner_config["user_configurable"],
                "default_banner": banner_config["default_banner"] || existing_config["banner_config"]?.["default_banner"]
            }
        }

        sails.log.debug('Prepared update data:', update_data);

        // Update the configuration
        const updated_config = await TeamConfigRepository.update(update_data, session);
        
        if (!updated_config) {
            sails.log.error('Failed to update team configuration');
            throw new Error('Failed to update team configuration');
        }

        sails.log.info('Successfully updated team configuration');
        return updated_config;
    }
}; 