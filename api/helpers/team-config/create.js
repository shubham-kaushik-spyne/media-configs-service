const { TeamConfigRepository } = require('../../repositories/TeamConfigRepository');


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
            required: true,
            description: 'Team ID'
        },
        bg_config: {
            type: 'ref',
            required: false,
            description: 'Background configuration',
            defaultsTo:{
                bgs: [],
                user_configurable: false,
                default_bg: null
            }
        },
        numberplate_config: {
            type: 'ref',
            required: false,
            description: 'Numberplate configuration',
            defaultsTo:{
                numberplates: [],
                user_configurable: false,
                default_numberplate: null
            }
        },
        banner_config: {
            type: 'ref', 
            required: false,
            description: 'Banner configuration',
            defaultsTo:{
                banners: [],
                user_configurable: false,
                default_banner: null
            }
        },
        user_id: {
            type: 'string',
            required: false,
            description: 'User ID'
        },
        session: {
            type: 'ref',
            required: false,
        description: 'Mongoose session for transaction'
        }
    },

    fn: async function ({ enterprise_id, team_id, bg_config, numberplate_config, banner_config, user_id, session }) {
        sails.log.info('Starting team configuration creation process');

        let data = {
            "enterprise_id": enterprise_id,
            "team_id": team_id,
            "last_updated_by": user_id,
            "bg_config": bg_config,
            "numberplate_config": numberplate_config,
            "banner_config": banner_config
        }
        if (bg_config?.default_bg){
            data["bg_config"]["bgs"].push(bg_config?.default_bg);
        }
        if (numberplate_config?.default_numberplate){
            data["numberplate_config"]["numberplates"].push(numberplate_config?.default_numberplate);
        }
        if (banner_config?.default_banner){
            data["banner_config"]["banners"].push(banner_config?.default_banner);
        }
        

        let team_config = await TeamConfigRepository.create(data, session);
        return team_config;
    }
}; 