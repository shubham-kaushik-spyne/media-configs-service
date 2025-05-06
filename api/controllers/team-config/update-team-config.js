const { HTTP_STATUS } = require('../../constant/enum/http-constant');
const { TeamConfigRepository } = require('../../repositories/TeamConfigRepository');
module.exports = {
    friendlyName: 'Update or create team configuration',
    description: 'Updates an existing team configuration or creates a new one if it doesn\'t exist',

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
            custom: function(value) {
                if (value && typeof value !== 'object') {
                    throw new Error('bg_config must be an object');
                }
                if (value.bgs && !Array.isArray(value.bgs)) {
                    throw new Error('bgs must be an array');
                }
                if (value.bgs && value.bgs.length > 0 && value.bgs.some(bg => typeof bg !== 'number')) {
                    throw new Error('bgs must contain only numbers');
                }
                if (value.user_configurable && typeof value.user_configurable !== 'boolean') {
                    throw new Error('user_configurable must be a boolean');
                }
                if (value.default_bg && typeof value.default_bg !== 'number') {
                    throw new Error('default_bg must be a number');
                }
                return true;
            }
        },
        numberplate_config: {
            type: 'ref',
            required: false,
            description: 'Numberplate configuration',
            custom: function(value) {
                if (value && typeof value !== 'object') {
                    throw new Error('numberplate_config must be an object');
                }
                if (value.numberplates && !Array.isArray(value.numberplates)) {
                    throw new Error('numberplates must be an array');
                }
                if (value.numberplates && value.numberplates.length > 0 && value.numberplates.some(numberplate => typeof numberplate !== 'number')) {
                    throw new Error('numberplates must contain only numbers');
                }
                if (value.user_configurable && typeof value.user_configurable !== 'boolean') {
                    throw new Error('user_configurable must be a boolean');
                }
                if (value.default_numberplate && typeof value.default_numberplate !== 'number') {
                    throw new Error('default_numberplate must be a number');
                }
                return true;
            }
        },
        banner_config: {
            type: 'ref',
            required: false,
            description: 'Banner configuration',
            custom: function(value) {
                if (value && typeof value !== 'object') {
                    throw new Error('banner_config must be an object');
                }
                if (value.banners && !Array.isArray(value.banners)) {
                    throw new Error('banners must be an array');
                }
                if (value.banners && value.banners.length > 0 && value.banners.some(banner => typeof banner !== 'string')) {
                    throw new Error('banners must contain only strings');
                }
                if (value.user_configurable && typeof value.user_configurable !== 'boolean') {
                    throw new Error('user_configurable must be a boolean');
                }
                if (value.default_banner && typeof value.default_banner !== 'string') {
                    throw new Error('default_banner must be a string');
                }
                return true;
            }
        }
    },

    exits: {
        success: {
            description: 'Team configuration was successfully updated/created',
            statusCode: HTTP_STATUS.OK
        },
        created: {
            description: 'Team configuration was successfully created',
            statusCode: HTTP_STATUS.CREATED
        },
        bad_request: {
            description: 'Invalid input data',
            statusCode: HTTP_STATUS.BAD_REQUEST
        },
        server_error: {
            description: 'Internal server error',
            statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR
        }
    },

    fn: async function(inputs, exits) {
        sails.log.info('team-config/update-or-create called');
        const session = await sails.mongoose.startSession();
        session.startTransaction();
        try {
            const {
                enterprise_id,
                team_id,
                bg_config,
                numberplate_config,
                banner_config
            } = inputs;

            //check if enterprise exists
            let enterprise = await sails.helpers.enterprise.get.with({enterprise_id, team_id});
            if(!enterprise){
                return exits.bad_request({
                    success: false,
                    message: 'Enterprise not found'
                });
            }
            // Get user ID from request (assuming it's set by authentication middleware)
            const user_id = this.req.me?.user_id;

            // Prepare data for helper
            const config_data = {
                enterprise_id,
                team_id,
                bg_config,
                numberplate_config,
                banner_config,
                user_id
            };
            const result = await TeamConfigRepository.findByEnterpriseAndTeam(enterprise_id, team_id, session);
            let data;
            if(!result){
                data = await sails.helpers.teamConfig.create.with({...config_data, session});
            } else {
                data = await sails.helpers.teamConfig.update.with({...config_data, session});
            }

            await session.commitTransaction();
            return exits.success({
                success: true,
                message: 'Team configuration updated/created successfully',
                data: data
            });
            
        } catch (error) {
            session.abortTransaction();
            sails.log.error('Error in team-config/update-or-create:', error);
            return exits.server_error({
                success: false,
                message: 'Failed to update/create team configuration',
                error: error.message
            });
        } finally {
            await session.endSession();
        }
    }
}; 