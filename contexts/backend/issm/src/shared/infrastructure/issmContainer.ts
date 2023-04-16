import { ContainerBuilder } from "diod";

import { Command } from "@manasub/shared-context/src/domain/command/Command";
import { CommandBus } from "@manasub/shared-context/src/domain/command/CommandBus";
import { CommandHandler } from "@manasub/shared-context/src/domain/command/CommandHandler";
import Logger from "@manasub/shared-context/src/domain/Logger";
import { CommandHandlers } from "@manasub/shared-context/src/infrastructure/command/CommnadHandlers";
import { InMemoryCommandBus } from "@manasub/shared-context/src/infrastructure/command/InMemoryCommandBus";
import WinstonLogger from "@manasub/shared-context/src/infrastructure/WinstonLogger";

import { CreateSuscriptionCommandHandler } from "../../suscriptions/application/create/CreateSuscriptionCommandHandler";
import { SuscriptionCreator } from "../../suscriptions/application/create/SuscriptionCreator";
import { SuscriptionRepository } from "../../suscriptions/domain/SuscriptionRepository";
import { TypeOrmSuscriptionRepository } from "../../suscriptions/infrastructure/persistence/TypeOrmSuscriptionRepository";

import { TypeOrmClientFactory } from "./persistence/typeorm/TypeOrmClientFactory";
import { TypeOrmConfigFactory } from "./persistence/typeorm/TypeOrmConfigFactory";

const builder = new ContainerBuilder();

builder.register(Logger).use(WinstonLogger);

builder.register(SuscriptionRepository).useFactory((_c) => {
	const config = TypeOrmConfigFactory.createConfig(),
		client = TypeOrmClientFactory.createDataSource("issm", config);

	return new TypeOrmSuscriptionRepository(client);
});

builder.registerAndUse(SuscriptionCreator);

builder.registerAndUse(CreateSuscriptionCommandHandler).addTag("command-handler");

builder.register(CommandHandlers).useFactory((c) => {
	const commandHandlers = c
		.findTaggedServiceIdentifiers<CommandHandler<Command>>("command-handler")
		.map((id) => c.get(id));

	return new CommandHandlers(commandHandlers);
});

builder.register(CommandBus).use(InMemoryCommandBus);

export const issmContainer = builder.build();
