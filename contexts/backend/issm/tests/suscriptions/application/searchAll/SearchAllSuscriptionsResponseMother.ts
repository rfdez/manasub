import { SuscriptionsResponse } from "../../../../src/suscriptions/application/searchAll/SuscriptionsResponse";
import { Suscription } from "../../../../src/suscriptions/domain/Suscription";

export class SearchAllSuscriptionsResponseMother {
	static create(suscriptions: Array<Suscription>): SuscriptionsResponse {
		return new SuscriptionsResponse(suscriptions);
	}
}
