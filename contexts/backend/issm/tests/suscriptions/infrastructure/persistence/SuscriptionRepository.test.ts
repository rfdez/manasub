import "reflect-metadata";

import { SuscriptionRepository } from "../../../../src/suscriptions/domain/SuscriptionRepository";
import { EnvironmentArranger } from "../../../shared/infrastructure/arranger/EnvironmentArranger";
import { issmContainer } from "../../../shared/infrastructure/issmContainer";
import { SuscriptionMother } from "../../domain/SuscriptionMother";

const repository: SuscriptionRepository = issmContainer.get(SuscriptionRepository),
	environmentArranger: EnvironmentArranger = issmContainer.get(EnvironmentArranger);

beforeEach(async () => {
	await environmentArranger.arrange();
});

afterAll(async () => {
	await environmentArranger.arrange();
	await environmentArranger.close();
});

describe("SuscriptionRepository", () => {
	describe("#save", () => {
		test("should save a suscription", async () => {
			const suscription = SuscriptionMother.random();

			await repository.save(suscription);
		});
	});

	describe("#searchAll", () => {
		test("should return an existing suscription", async () => {
			const suscriptions = [SuscriptionMother.random(), SuscriptionMother.random()];
			await Promise.all(suscriptions.map((suscription) => repository.save(suscription)));

			const response = await repository.searchAll();

			expect(suscriptions).toEqual(response);
		});

		test("should return null if there is no suscriptions", async () => {
			expect(await repository.searchAll()).toBeTruthy();
		});
	});
});
