import convict from "convict";

const convictConfig = convict({
		env: {
			doc: "The application environment",
			format: ["test", "production", "development"],
			env: "NODE_ENV",
			default: "development",
		},
		typeorm: {
			host: {
				doc: "The host of the database",
				format: String,
				env: "TYPEORM_HOST",
				default: "localhost",
			},
			port: {
				doc: "The port of the database",
				format: Number,
				env: "TYPEORM_PORT",
				default: 5432,
			},
			username: {
				doc: "The username of the database",
				format: String,
				env: "TYPEORM_USERNAME",
				default: "manasub",
			},
			password: {
				doc: "The password of the database",
				format: String,
				env: "TYPEORM_PASSWORD",
				default: "manasub",
			},
			database: {
				doc: "The database name",
				format: String,
				env: "TYPEORM_DATABASE",
				default: "issm",
			},
		},
	}),
	config = convictConfig.validate({ allowed: "strict" }).getProperties();

export const issmConfig = config;
