import { Suscription } from "./Suscription";

export abstract class SuscriptionRepository {
	abstract save(suscription: Suscription): Promise<void>;
}
