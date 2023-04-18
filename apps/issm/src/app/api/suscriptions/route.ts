import "reflect-metadata";

import { InvalidArgumentError } from "@manasub/backend-issm-context/src/shared/domain/value-object/InvalidArgumentError";
import { issmContainer } from "@manasub/backend-issm-context/src/shared/infrastructure/issmContainer";
import { SuscriptionCreator } from "@manasub/backend-issm-context/src/suscriptions/application/create/SuscriptionCreator";
import { SuscriptionFinder } from "@manasub/backend-issm-context/src/suscriptions/application/searchAll/SuscriptionFinder";
import { SuscriptionsResponse } from "@manasub/backend-issm-context/src/suscriptions/application/searchAll/SuscriptionsResponse";
import { InvalidBillingPeriod } from "@manasub/backend-issm-context/src/suscriptions/domain/InvalidBillingPeriod";
import { SuscriptionEndDateBeforeStartDate } from "@manasub/backend-issm-context/src/suscriptions/domain/SuscriptionEndDateBeforeStartDate";
import { SuscriptionNameLengthExceeded } from "@manasub/backend-issm-context/src/suscriptions/domain/SuscriptionNameLengthExceeded";

interface SuscriptionPutRequest {
	id: string;
	name: string;
	billing: string;
	startDate: Date;
	endDate?: Date;
}

export async function PUT(request: Request): Promise<Response> {
	const { id, name, billing, startDate, endDate } =
		(await request.json()) as SuscriptionPutRequest;

	try {
		const suscriptionCreator = issmContainer.get(SuscriptionCreator);

		await suscriptionCreator.run({ id, name, billing, startDate, endDate });
	} catch (error: unknown) {
		if (
			error instanceof SuscriptionNameLengthExceeded ||
			error instanceof SuscriptionEndDateBeforeStartDate ||
			error instanceof InvalidBillingPeriod
		) {
			return new Response(JSON.stringify({ message: error.message }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		if (error instanceof InvalidArgumentError) {
			return new Response(null, { status: 400 });
		}

		return new Response(null, { status: 500 });
	}

	return new Response(null, { status: 201 });
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function GET(): Promise<Response> {
	let suscriptions: SuscriptionsResponse;

	try {
		const suscriptionFinder = issmContainer.get(SuscriptionFinder);

		suscriptions = await suscriptionFinder.run();
	} catch (error: unknown) {
		return new Response(null, { status: 500 });
	}

	return new Response(JSON.stringify(suscriptions), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}
