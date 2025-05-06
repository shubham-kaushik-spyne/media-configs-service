class NumberPlateLogsRepository {
    static async create(configData, session = null) {
        const options = session ? { session } : {};
        const result = await numberPlateLogs.create([configData], options);
        
        return result?.map(config => {
            config['_id'] = config._id.toString();
            return config;
        });
    }

    static async bulkCreate(configData, session = null) {
        const options = session ? { session } : {};
        const result = await numberPlateLogs.insertMany(configData, options);
        return result?.map(config => {
            config['_id'] = config._id.toString();
            return config;
        });
    }


}

module.exports = { NumberPlateLogsRepository };