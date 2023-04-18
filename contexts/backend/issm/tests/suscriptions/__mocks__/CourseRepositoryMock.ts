import { Suscription } from "../../../src/suscriptions/domain/Suscription";
import { SuscriptionRepository } from "../../../src/suscriptions/domain/SuscriptionRepository";

export class SuscriptionRepositoryMock implements SuscriptionRepository {
	private readonly saveMock: jest.Mock;
	private readonly searchAllMock: jest.Mock;
	private suscriptions: Array<Suscription> = [];

	constructor() {
		this.saveMock = jest.fn();
		this.searchAllMock = jest.fn();
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async save(suscription: Suscription): Promise<void> {
		this.saveMock(suscription);
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async searchAll(): Promise<Suscription[]> {
		this.searchAllMock();

		return this.suscriptions;
	}

	assertSaveHaveBeenCalledWith(expected: Suscription): void {
		expect(this.saveMock).toHaveBeenCalledWith(expected);
	}

	assertSearchAll(): void {
		expect(this.searchAllMock).toHaveBeenCalled();
	}

	returnOnSearchAll(suscriptions: Array<Suscription>): void {
		this.suscriptions = suscriptions;
	}
}
