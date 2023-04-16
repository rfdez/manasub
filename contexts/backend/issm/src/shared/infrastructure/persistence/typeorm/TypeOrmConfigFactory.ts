import { issmConfig } from "../../config/issmConfig";

import { TypeOrmConfig } from "./TypeOrmConfig";

export class TypeOrmConfigFactory {
	static createConfig(): TypeOrmConfig {
		return {
			host: issmConfig.typeorm.host,
			port: issmConfig.typeorm.port,
			username: issmConfig.typeorm.username,
			password: issmConfig.typeorm.password,
			database: issmConfig.typeorm.database,
		};
	}
}
