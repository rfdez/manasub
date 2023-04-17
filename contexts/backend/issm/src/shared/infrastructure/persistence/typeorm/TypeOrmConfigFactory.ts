import { issmConfig } from "../../config/issmConfig";

import { TypeOrmConfig } from "./TypeOrmConfig";

export class TypeOrmConfigFactory {
	static createConfig(): TypeOrmConfig {
		return {
			host: issmConfig.postgres.host,
			port: issmConfig.postgres.port,
			username: issmConfig.postgres.username,
			password: issmConfig.postgres.password,
			database: issmConfig.postgres.database,
		};
	}
}
