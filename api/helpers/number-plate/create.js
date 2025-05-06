

 // from datastores.js

const { NumberPlateLogsRepository } = require("../../repositories/NumberPlateLogsRepository");
const { createBulkInsertTemplate } = require("../../utils/utils");

 module.exports = {
    friendlyName: 'Create team configuration',
    description: 'Creates or updates a team configuration with the provided data',

    inputs: {
        enterprise_id: {
            type: 'string',
            required: true,
            description: 'Enterprise ID'
        },
        data: {
            type: 'ref',
            required: true,
            description: 'Data',
        },
        email_id: {
            type: 'string',
            required: true,
            description: 'Email ID'
        },
        session: {
            type: 'ref',
            required: false,
            description: 'Mongoose session for transaction'
        },
     
    },

    fn: async function ({ enterprise_id, data, email_id, session, is_default }) {

        sails.log.info('getting enterprise');
        const values = data.flatMap(item => Object.values(item));
        let query = `INSERT INTO enterprise_number_plate (enterprise_id,
         number_plate_logo_id, 
         number_plate_logo_name,
          number_plate_logo_url, 
          active,
          number_plate_value,
          updated_by,
          api_source) VALUES ${createBulkInsertTemplate(data, 8)}`;
        let enterprise = await sails.sendNativeQuery(query,values);
        sails.log.info('number plate created',enterprise);

        //  logs in number plate log
        let numberPlateLogs = data.map(item => {
            return {
                enterprise_id: enterprise_id,
                number_plate_logo_id: item.number_plate_logo_id,
                email_id: email_id,
                number_plate_logo_url: item.number_plate_logo_url,
                active: item.active,
                is_default: false,
                api_source: item.api_source,
                updated_by: item?.updated_by
            }
        })
        const res = await NumberPlateLogsRepository.bulkCreate(numberPlateLogs);
        if(res.length > 0){
            sails.log.info('number plate logs created',res);
        }
        return enterprise?.affectedRows > 0 ? true : false;
    }
}; 