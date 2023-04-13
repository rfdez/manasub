import { Service } from "diod";
import winston, { Logger as WinstonLoggerType } from "winston";

import Logger from "../domain/Logger";

@Service()
class WinstonLogger implements Logger {
	private readonly logger: WinstonLoggerType;

	constructor() {
		this.logger = winston.createLogger({
			format: winston.format.combine(
				winston.format.prettyPrint(),
				winston.format.errors({ stack: true }),
				winston.format.splat(),
				winston.format.colorize(),
				winston.format.simple()
			),
			transports: [new winston.transports.Console()],
		});
	}

	debug(message: string): void {
		this.logger.debug(message);
	}

	error(message: string | Error): void {
		this.logger.error(message);
	}

	info(message: string): void {
		this.logger.info(message);
	}
}
export default WinstonLogger;
