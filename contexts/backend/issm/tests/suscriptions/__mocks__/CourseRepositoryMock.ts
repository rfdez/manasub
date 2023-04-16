import { Suscription } from "../../../src/suscriptions/domain/Suscription";
import { SuscriptionRepository } from "../../../src/suscriptions/domain/SuscriptionRepository";

export class SuscriptionRepositoryMock implements SuscriptionRepository {
	private readonly saveMock: jest.Mock;

	constructor() {
		this.saveMock = jest.fn();
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async save(suscription: Suscription): Promise<void> {
		this.saveMock(suscription);
	}

	assertSaveHaveBeenCalledWith(expected: Suscription): void {
		expect(this.saveMock).toHaveBeenCalledWith(expected);
	}
}
