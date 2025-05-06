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
        bg_config: {
            type: 'ref',
            required: false,
            description: 'Background configuration',
            custom: function(value) {
                if (value && typeof value !== 'object') {
                    throw new Error('bg_config must be an object');
                }
                if (value.user_configurable && typeof value.user_configurable !== 'boolean') {
                    throw new Error('user_configurable must be a boolean');
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
                    throw new Error('bg_config must be an object');
                }
                if (value.user_configurable && typeof value.user_configurable !== 'boolean') {
                    throw new Error('user_configurable must be a boolean');
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
                    throw new Error('bg_config must be an object');
                }
                if (value.user_configurable && typeof value.user_configurable !== 'boolean') {
                    throw new Error('user_configurable must be a boolean');
                }
                return true;
            }
       
        },
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
                bg_config,
                numberplate_config,
                banner_config
         
            } = inputs;

            //check if enterprise exists
            let enterprise = await sails.helpers.enterprise.get.with({enterprise_id});
            if(!enterprise){
                return exits.bad_request({
                    success: false,
                    message: 'Enterprise not found'
                });
            }
            // Get user ID from request (assuming it's set by authentication middleware)
            const user_id = this.req.me?.user_id;

            const is_updated = await sails.helpers.enterpriseConfig.update.with({enterprise_id, bg_config, numberplate_config, banner_config, session});

            await session.commitTransaction();
            return exits.success({
                success: true,
                message: 'Team configuration updated/created successfully',
                data: {is_updated}
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