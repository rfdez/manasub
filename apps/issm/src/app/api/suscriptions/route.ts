import "reflect-metadata";

import { InvalidArgumentError } from "@manasub/backend-issm-context/src/shared/domain/value-object/InvalidArgumentError";
import { issmContainer } from "@manasub/backend-issm-context/src/shared/infrastructure/issmContainer";
import { SuscriptionCreator } from "@manasub/backend-issm-context/src/suscriptions/application/create/SuscriptionCreator";
import { SuscriptionNameLengthExceeded } from "@manasub/backend-issm-context/src/suscriptions/domain/SuscriptionNameLengthExceeded";

interface SuscriptionPutRequest {
	id: string;
	name: string;
	billing: string;
	startDate: Date;
}

export async function PUT(request: Request): Promise<Response> {
	const { id, name, billing, startDate } = (await request.json()) as SuscriptionPutRequest;

	try {
		const suscriptionCreator = issmContainer.get(SuscriptionCreator);

		await suscriptionCreator.run({ id, name, billing, startDate });
	} catch (error: unknown) {
		if (
			error instanceof SuscriptionNameLengthExceeded ||
			error instanceof InvalidArgumentError
		) {
			return new Response(null, { status: 400 });
		}

		return new Response(null, { status: 500 });
	}

	return new Response(null, { status: 201 });
}
