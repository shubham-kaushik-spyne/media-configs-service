class TeamConfigRepository {
    static async create(configData, session = null) {
        const options = session ? { session } : {};
        const result = await teamConfig.create([configData], options);
        
        return result?.map(config => {
            config['_id'] = config._id.toString();
            return config;
        });
    }

    static async update(configData, session = null) {
        const options = session ? { session } : {};
        const result = await teamConfig.updateOne(
            {
                enterprise_id: configData.enterprise_id,
                team_id: configData.team_id
            },
            { $set: configData },
            options
        );

        return result;
    }

    static async findByEnterpriseAndTeam(enterpriseId, teamId, session = null) {

        const options = session ? { session } : {};
        const result = await teamConfig.findOne(
            {
                $and: [
                    { enterprise_id: enterpriseId },
                    { team_id: teamId }
                ]
            },
            {},
            options
        ).lean();

        if (result) {
            result['_id'] = result._id.toString();
        }
        return result;
    }
}

module.exports = { TeamConfigRepository };