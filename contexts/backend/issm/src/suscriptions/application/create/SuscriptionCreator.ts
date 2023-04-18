import { Service } from "diod";

import { Suscription } from "../../domain/Suscription";
import { SuscriptionBilling } from "../../domain/SuscriptionBilling";
import { SuscriptionId } from "../../domain/SuscriptionId";
import { SuscriptionName } from "../../domain/SuscriptionName";
import { SuscriptionRepository } from "../../domain/SuscriptionRepository";
import { SuscriptionStartDate } from "../../domain/SuscriptionStartDate";

@Service()
export class SuscriptionCreator {
	constructor(private readonly repository: SuscriptionRepository) {}

	async run(params: {
		id: string;
		name: string;
		billing: string;
		startDate: Date;
	}): Promise<void> {
		const id = new SuscriptionId(params.id),
			name = new SuscriptionName(params.name),
			billing = SuscriptionBilling.fromValue(params.billing),
			startDate = new SuscriptionStartDate(params.startDate),
			suscription = Suscription.create(id, name, billing, startDate);

		await this.repository.save(suscription);
	}
}
