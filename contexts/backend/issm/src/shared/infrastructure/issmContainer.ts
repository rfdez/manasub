import { ContainerBuilder } from "diod";

import Logger from "@manasub/shared-context/src/domain/Logger";
import WinstonLogger from "@manasub/shared-context/src/infrastructure/WinstonLogger";

const builder = new ContainerBuilder();

builder.register(Logger).use(WinstonLogger);

export const issmContainer = builder.build();
