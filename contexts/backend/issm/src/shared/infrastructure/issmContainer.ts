import { ContainerBuilder } from "diod";

import { SuscriptionCreator } from "../../suscriptions/application/create/SuscriptionCreator";
import { SuscriptionFinder } from "../../suscriptions/application/searchAll/SuscriptionFinder";
import { SuscriptionRepository } from "../../suscriptions/domain/SuscriptionRepository";
import { TypeOrmSuscriptionRepository } from "../../suscriptions/infrastructure/persistence/TypeOrmSuscriptionRepository";

import { TypeOrmClientFactory } from "./persistence/typeorm/TypeOrmClientFactory";
import { TypeOrmConfigFactory } from "./persistence/typeorm/TypeOrmConfigFactory";

const builder = new ContainerBuilder(),
	config = TypeOrmConfigFactory.createConfig(),
	client = TypeOrmClientFactory.createDataSource("issm", config);

builder.register(SuscriptionRepository).useFactory((_c) => {
	return new TypeOrmSuscriptionRepository(client);
});

builder.registerAndUse(SuscriptionCreator);
builder.registerAndUse(SuscriptionFinder);

export const issmContainer = builder.build();
