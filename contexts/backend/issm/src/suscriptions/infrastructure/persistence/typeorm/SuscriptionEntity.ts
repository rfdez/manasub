import { EntitySchema } from "typeorm";

import {
	NullableValueObjectTransformer,
	ValueObjectTransformer,
} from "../../../../shared/infrastructure/persistence/typeorm/ValueObjectTransformer";
import { Suscription } from "../../../domain/Suscription";
import { SuscriptionBilling } from "../../../domain/SuscriptionBilling";
import { SuscriptionId } from "../../../domain/SuscriptionId";
import { SuscriptionName } from "../../../domain/SuscriptionName";
import { SuscriptionStartDate } from "../../../domain/SuscriptionStartDate";

export const SuscriptionEntity = new EntitySchema<Suscription>({
	name: "Suscription",
	tableName: "suscriptions",
	target: Suscription,
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
		startDate: {
			type: Date,
			transformer: ValueObjectTransformer(SuscriptionStartDate),
		},
		endDate: {
			type: Date,
			nullable: true,
			transformer: NullableValueObjectTransformer(SuscriptionStartDate),
		},
	},
});
