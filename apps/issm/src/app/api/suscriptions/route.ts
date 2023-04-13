import "reflect-metadata";

import { issmContainer } from "@manasub/backend-issm-context/src/shared/infrastructure/issmContainer";
import { CreateSuscriptionCommand } from "@manasub/backend-issm-context/src/suscriptions/domain/CreateSuscriptionCommand";
import { CommandBus } from "@manasub/shared-context/src/domain/command/CommandBus";

interface SuscriptionPutRequest {
	id: string;
	service: string;
}

export async function PUT(request: Request): Promise<Response> {
	try {
		const { id, service } = (await request.json()) as SuscriptionPutRequest,
			createSuscriptionCommand = new CreateSuscriptionCommand({ id, service }),
			commandBus = issmContainer.get(CommandBus);

		await commandBus.dispatch(createSuscriptionCommand);

		return new Response(null, { status: 201 });
	} catch (error: unknown) {
		console.error(error);

		return new Response(null, { status: 500 });
	}
}
