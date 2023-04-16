import { ContainerBuilder } from "diod";

import { TypeOrmClientFactory } from "../../../src/shared/infrastructure/persistence/typeorm/TypeOrmClientFactory";
import { TypeOrmConfigFactory } from "../../../src/shared/infrastructure/persistence/typeorm/TypeOrmConfigFactory";
import { SuscriptionRepository } from "../../../src/suscriptions/domain/SuscriptionRepository";
import { TypeOrmSuscriptionRepository } from "../../../src/suscriptions/infrastructure/persistence/TypeOrmSuscriptionRepository";

import { EnvironmentArranger } from "./arranger/EnvironmentArranger";
import { TypeOrmEnvironmentArranger } from "./persistence/typeorm/TypeOrmEnvironmentArranger";

const builder = new ContainerBuilder(),
	config = TypeOrmConfigFactory.createConfig(),
	client = TypeOrmClientFactory.createDataSource("issm", config);

builder.register(SuscriptionRepository).useFactory((_c) => {
	return new TypeOrmSuscriptionRepository(client);
});

builder.register(EnvironmentArranger).useFactory((_c) => {
	return new TypeOrmEnvironmentArranger(client);
});

export const issmContainer = builder.build();
