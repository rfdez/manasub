import { SuscriptionFinder } from "../../../../src/suscriptions/application/searchAll/SuscriptionFinder";
import { SuscriptionRepositoryMock } from "../../__mocks__/CourseRepositoryMock";
import { SuscriptionMother } from "../../domain/SuscriptionMother";

import { SearchAllSuscriptionsResponseMother } from "./SearchAllSuscriptionsResponseMother";

let repository: SuscriptionRepositoryMock;

beforeEach(() => {
	repository = new SuscriptionRepositoryMock();
});

describe("SuscriptionFinder", () => {
	test("should find an existing suscriptions", async () => {
		const suscriptions = [SuscriptionMother.random(), SuscriptionMother.random()];

		repository.returnOnSearchAll(suscriptions);

		const finder = new SuscriptionFinder(repository),
			response = await finder.run();

		repository.assertSearchAll();

		const expected = SearchAllSuscriptionsResponseMother.create(suscriptions);
		expect(expected).toEqual(response);
	});
});
