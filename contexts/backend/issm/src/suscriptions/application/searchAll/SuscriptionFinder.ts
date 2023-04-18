import { Service } from "diod";

import { SuscriptionRepository } from "../../domain/SuscriptionRepository";

import { SuscriptionsResponse } from "./SuscriptionsResponse";

@Service()
export class SuscriptionFinder {
	constructor(private readonly repository: SuscriptionRepository) {}

	async run(): Promise<SuscriptionsResponse> {
		const suscriptions = await this.repository.searchAll();

		return new SuscriptionsResponse(suscriptions);
	}
}
