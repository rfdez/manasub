import { Service } from "diod";
import { EntitySchema } from "typeorm";

import { TypeOrmRepository } from "../../../shared/infrastructure/persistence/typeorm/TypeOrmRepository";
import { Suscription } from "../../domain/Suscription";
import { SuscriptionRepository } from "../../domain/SuscriptionRepository";

import { SuscriptionEntity } from "./typeorm/SuscriptionEntity";

@Service()
export class TypeOrmSuscriptionRepository
	extends TypeOrmRepository<Suscription>
	implements SuscriptionRepository
{
	async searchAll(): Promise<Suscription[]> {
		const repository = await this.repository(),
			suscriptions = await repository.find();

		return suscriptions;
	}

	public async save(suscription: Suscription): Promise<void> {
		return this.persist(suscription);
	}

	protected entitySchema(): EntitySchema<Suscription> {
		return SuscriptionEntity;
	}
}
