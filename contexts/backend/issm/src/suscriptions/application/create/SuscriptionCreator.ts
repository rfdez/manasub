import { Service } from "diod";

import { Suscription } from "../../domain/Suscription";
import { SuscriptionId } from "../../domain/SuscriptionId";
import { SuscriptionName } from "../../domain/SuscriptionName";
import { SuscriptionRepository } from "../../domain/SuscriptionRepository";

@Service()
export class SuscriptionCreator {
	constructor(private readonly repository: SuscriptionRepository) {}

	async run(params: { id: SuscriptionId; name: SuscriptionName }): Promise<void> {
		const suscription = Suscription.create(params.id, params.name);
		await this.repository.save(suscription);
	}
}
