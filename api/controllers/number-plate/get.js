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
            } = inputs;

            let numberPlates = []
            let isTeamConfig = false;

             // get enterprise config
             let enterprise_config = await sails.helpers.enterpriseConfig.get.with({enterprise_id, session});
             if (!enterprise_config){
                 return exits.bad_request({
                     success: false,
                     message: 'Enterprise configuration not found'
                 });
             }

            let teamConfig = null;
            if(team_id){
                teamConfig = await TeamConfigRepository.findByEnterpriseAndTeam(enterprise_id, team_id, session);
                if(teamConfig){
                    isTeamConfig = true;
                }
            }
            if(!isTeamConfig){
                user_configurable = !!enterprise_config?.license_plate?.is_user_configurable;
                let res = null;
                if(user_configurable){
                    res = await rdi.sendNativeQuery(`select id from enterprise_number_plate where enterprise_id = $1 and active = 1`, [enterprise_id]);
                }else{
                    res = await rdi.sendNativeQuery(`select id from enterprise_number_plate where enterprise_id = $1 and active = 1 and is_default = 1`, [enterprise_id]);
                }
                numberPlates = res?.rows?.map(row => row.id);
            }else{
                user_configurable = !!teamConfig?.numberplate_config?.user_configurable;
                if(user_configurable){
                    numberPlates = teamConfig?.numberplate_config?.numberplates;
                }else if(teamConfig?.numberplate_config?.default_numberplate){
                    numberPlates = [teamConfig?.numberplate_config?.default_numberplate];
                }
            }
            let numberPlateData = [];
            if(numberPlates.length > 0){
                numberPlateData = await sails.helpers.numberPlate.get.with({number_plate_ids: [...numberPlates],session});
            }

            await session.commitTransaction();
            return exits.success({
                success: true,
                message: 'Team configuration updated/created successfully',
                data: {
                    numberPlateData
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