import { DataSource } from "typeorm";

import { TypeOrmClientFactory } from "../../../../../src/shared/infrastructure/persistence/typeorm/TypeOrmClientFactory";

describe("TypeOrmClientFactory", () => {
	const factory = TypeOrmClientFactory;
	let client: DataSource;

	beforeEach(async () => {
		client = await factory.createDataSource("test", {
			host: "localhost",
			port: 5432,
			username: "manasub",
			password: "manasub",
			database: "issm",
		});
	});

	afterEach(async () => {
		await client.destroy();
	});

	test("creates a new client with the connection already established", () => {
		expect(client).toBeInstanceOf(DataSource);
		expect(client.isInitialized).toBe(true);
	});

	test("creates a new client if it does not exist a client with the given name", async () => {
		const newClient = await factory.createDataSource("test2", {
			host: "localhost",
			port: 5432,
			username: "manasub",
			password: "manasub",
			database: "issm",
		});

		expect(newClient).not.toBe(client);
		expect(newClient.isInitialized).toBeTruthy();

		await newClient.destroy();
	});
});
