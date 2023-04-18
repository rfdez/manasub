import { Suscription } from "../../domain/Suscription";

interface SuscriptionResponse {
	id: string;
	name: string;
	billing: string;
	startDate: Date;
	endDate?: Date;
	nextPayment: Date;
	remaningTime: string;
}

export class SuscriptionsResponse {
	public readonly suscriptions: Array<SuscriptionResponse>;

	constructor(suscriptions: Array<Suscription>) {
		this.suscriptions = suscriptions.map((suscription) => {
			return {
				id: suscription.id.value,
				name: suscription.name.value,
				billing: suscription.billing.value,
				startDate: suscription.startDate.value,
				endDate: suscription.endDate?.value,
				nextPayment: suscription.nextPayment(),
				remaningTime: suscription.remaningTime(),
			};
		});
	}
}
