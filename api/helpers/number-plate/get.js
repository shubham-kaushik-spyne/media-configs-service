

 // from datastores.js

 module.exports = {
    friendlyName: 'Get number plate',
    description: 'Get number plate',

    inputs: {
        number_plate_ids: {
            type: 'ref',
            required: true,
            description: 'Enterprise ID',
        },
        session: {
            type: 'ref',
            required: false,
            description: 'Mongoose session for transaction'
        }
    },

    fn: async function ({ number_plate_ids, session }) {
        const rdi = sails.getDatastore('readReplicaPrimary');
        number_plate_ids = number_plate_ids.filter(id => id != null);

        sails.log.info('getting number plates');
        const values = number_plate_ids.join(',');
        let query = `SELECT * FROM enterprise_number_plate WHERE id IN (${values}) and active = 1`;
        let number_plates = await rdi.sendNativeQuery(query);
        return number_plates?.rows?.length > 0 ? number_plates?.rows : [];
    }
}; 