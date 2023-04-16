import { DataSource } from "typeorm";

import { SuscriptionEntity } from "../../../../suscriptions/infrastructure/persistence/typeorm/SuscriptionEntity";

import { TypeOrmConfig } from "./TypeOrmConfig";

export class TypeOrmClientFactory {
	static async createDataSource(contextName: string, config: TypeOrmConfig): Promise<DataSource> {
		const dataSource = new DataSource({
			name: contextName,
			type: "postgres",
			host: config.host,
			port: config.port,
			username: config.username,
			password: config.password,
			database: config.database,
			entities: [SuscriptionEntity],
			synchronize: true,
			logging: false,
		});

		return dataSource.initialize();
	}
}
