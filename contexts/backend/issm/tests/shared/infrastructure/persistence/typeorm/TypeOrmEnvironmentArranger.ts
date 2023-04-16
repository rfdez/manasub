import { Service } from "diod";
import { DataSource, EntityMetadata } from "typeorm";

import { EnvironmentArranger } from "../../arranger/EnvironmentArranger";

@Service()
export class TypeOrmEnvironmentArranger extends EnvironmentArranger {
	constructor(private readonly _client: Promise<DataSource>) {
		super();
	}

	public async arrange(): Promise<void> {
		await this.cleanDatabase();
	}

	public async close(): Promise<void> {
		return (await this.client()).destroy();
	}

	protected async cleanDatabase(): Promise<void> {
		const entities = await this.entities();

		try {
			const result = [],
				client = await this.client();

			for (const entity of entities) {
				const repository = client.getRepository(entity.name);
				result.push(repository.query(`TRUNCATE TABLE ${entity.tableName};`));
			}

			await Promise.all(result);
		} catch (error) {
			throw new Error(`Unable to clean test database: ${error as string}`);
		}
	}

	protected async client(): Promise<DataSource> {
		return this._client;
	}

	private async entities(): Promise<EntityMetadata[]> {
		return (await this._client).entityMetadatas;
	}
}
