import { EntitySchema } from "typeorm";

import { ValueObjectTransformer } from "../../../../shared/infrastructure/persistence/typeorm/ValueObjectTransformer";
import { Suscription } from "../../../domain/Suscription";
import { SuscriptionBilling } from "../../../domain/SuscriptionBilling";
import { SuscriptionId } from "../../../domain/SuscriptionId";
import { SuscriptionName } from "../../../domain/SuscriptionName";

export const SuscriptionEntity = new EntitySchema<Suscription>({
	name: "Suscription",
	tableName: "suscriptions",
	columns: {
		id: {
			type: String,
			primary: true,
			transformer: ValueObjectTransformer(SuscriptionId),
		},
		name: {
			type: String,
			transformer: ValueObjectTransformer(SuscriptionName),
		},
		billing: {
			type: String,
			transformer: ValueObjectTransformer(SuscriptionBilling),
		},
	},
});
