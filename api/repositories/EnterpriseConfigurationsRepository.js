class EnterpriseConfigurationsRepository {
    static async create(configData, session = null) {
        const options = session ? { session } : {};
        const result = await EnterpriseConfigurations.create([configData], options);
        
        return result?.map(config => {
            config['_id'] = config._id.toString();
            return config;
        });
    }

    static async update(enterprise_id, configData, session = null) {
        const options = session ? { session } : {};
        const result = await EnterpriseConfigurations.updateOne({ enterprise_id: enterprise_id }, { $set: configData }, options);
        return result;
    }

    static async findByEnterprise(enterprise_id, session = null) {
        const options = session ? { session } : {};
        const result = await EnterpriseConfigurations.findOne({ enterprise_id }, {},options).lean();
        if (result){
            result['_id'] = result._id.toString();
        }
        return result;
    }

}

module.exports = { EnterpriseConfigurationsRepository };