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
            required: false,
            description: 'Team ID'
        },
        ai_background_type: {
            type: 'string',
            required: false,
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
        const rdi = sails.getDatastore('readReplicaPrimary');
        sails.log.info('team-config/update-or-create called');
        const session = await sails.mongoose.startSession();
        session.startTransaction();
        try {
            const {
                enterprise_id,
                team_id,
                ai_background_type
            } = inputs;

            let bg_ids = [];
            let isTeamConfig = false;

            // get enterprise config
            let enterprise_config = await sails.helpers.enterpriseConfig.get.with({enterprise_id, session});
            if (!enterprise_config){
                return exits.bad_request({
                    success: false,
                    message: 'Enterprise configuration not found'
                });
            }

             // is team config exists so we return team data 
             let docs = null;
             if (team_id){
                docs = await sails.helpers.teamConfig.get.with({enterprise_id, team_id, session});
                if (docs?._id){
                    isTeamConfig = true;
                }
             }


            if (!isTeamConfig) {
                user_configurable = !!enterprise_config?.background?.is_user_configurable;
                let res = null;
                if (user_configurable){
                    res = await rdi.sendNativeQuery(`select bg_id from enterprise_background where enterprise_id = $1 and active = 1`, [enterprise_id]);
                    bg_ids = res.rows.map(row => row.bg_id);
                }else{
                    res = await rdi.sendNativeQuery(`select default_bg_id from default_enterprise_background where enterprise_id = $1`, [enterprise_id]);
                    bg_ids = [res.rows[0].default_bg_id];
                }
            } else {
                user_configurable = !!docs?.bg_config?.user_configurable;
                if (user_configurable){ // if it user configurable then we return of team config
                    bg_ids = (docs?.bg_config?.bgs||[])?.map(bg => bg) ;
                } else if(docs?.bg_config?.default_bg){
                    bg_ids = [docs?.bg_config?.default_bg]; // if it is not user configurable then we return only default bg
                }
            }

            if(bg_ids.length > 0){
                let background = await sails.helpers.background.get.with({bg_ids: [...bg_ids], ai_background_type});
            }
          
            await session.commitTransaction();
            return exits.success({
                success: true,
                message: 'Team configuration updated/created successfully',
                data: {
                    background
                }
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