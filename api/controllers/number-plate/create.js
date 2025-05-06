const { HTTP_STATUS } = require('../../constant/enum/http-constant');
const { TeamConfigRepository } = require('../../repositories/TeamConfigRepository');
const { v4: uuidv4 } = require('uuid');
module.exports = {
    friendlyName: 'Update or create team configuration',
    description: 'Updates an existing team configuration or creates a new one if it doesn\'t exist',

    inputs: {
        enterprise_id: {
            type: 'string',
            required: true,
            description: 'Enterprise ID'
        },
        prodcat_id: {
            type: 'string',
            required: false,
            description: 'Product Category ID'
        },
        email_id: {
            type: 'string',
            required: true,
            description: 'Email ID'
        },
        data: {
            type: 'ref',
            required: true,
            description: 'Data',
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
            const { enterprise_id, prodcat_id, email_id, data } = inputs;
            if(!data || data.length === 0){
                return exits.bad_request({
                    success: false,
                    message: 'Data is required'
                });
            }
            const user_id = this.req.me?.user_id;

            const numberPlateData = removeDuplicate(data);

            //check if enterprise exists
            let enterprise = await sails.helpers.enterprise.get.with({enterprise_id});
            if(!enterprise){
                return exits.bad_request({
                    success: false,
                    message: 'Enterprise not found'
                });
            }
            let createData = numberPlateData.map(item => {
                return {
                    enterprise_id,
                    number_plate_logo_id:item?.plate_id || uuidv4(),
                    number_plate_logo_name:item?.label || "",
                    number_plate_logo_url:item?.image || "",
                    active:item?.is_active || true,
                    number_plate_value:item?.image || "",
                    updated_by:user_id,
                    api_source: "media-config/number-plate/create",
                }
            })
            
            const isCreated = await sails.helpers.numberPlate.create.with({data:createData, email_id, enterprise_id});

            await session.commitTransaction();
            return exits.success({
                success: true,
                message: 'Number plate created successfully',
                data:{
                    isCreated
                }
            });
            
        } catch (error) {
            session.abortTransaction();
            sails.log.error('Error in team-config/update-or-create:', error);
            return exits.server_error({
                success: false,
                message: 'Failed to create number plate',
                error: error.message
            });
        } finally {
            await session.endSession();
        }
    }
}; 


function removeDuplicate(data){
    const numberplateMap = {}

    data.forEach(item => {
        numberplateMap[item.image] = item;
    })

    return Object.values(numberplateMap);
}