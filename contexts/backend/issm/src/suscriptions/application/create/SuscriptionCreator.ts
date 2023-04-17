import { Service } from "diod";

import { Suscription } from "../../domain/Suscription";
import { SuscriptionId } from "../../domain/SuscriptionId";
import { SuscriptionName } from "../../domain/SuscriptionName";
import { SuscriptionRepository } from "../../domain/SuscriptionRepository";

@Service()
export class SuscriptionCreator {
	constructor(private readonly repository: SuscriptionRepository) {}

	async run(params: { id: string; name: string }): Promise<void> {
		const id = new SuscriptionId(params.id),
			name = new SuscriptionName(params.name),
			suscription = Suscription.create(id, name);

		await this.repository.save(suscription);
	}
}
