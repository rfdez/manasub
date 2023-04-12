import "reflect-metadata";

import { NextResponse } from "next/server";

import { issmContainer } from "@manasub/backend-issm-context/src/shared/infrastructure/issmContainer";
import Logger from "@manasub/shared-context/src/domain/Logger";

interface User {
	id: number;
	name: string;
	username: string;
	email: string;
}

export async function GET(request: Request): Promise<Response> {
	const logger = issmContainer.get(Logger),
		{ searchParams } = new URL(request.url),
		id = searchParams.get("id");

	logger.info("no id provided");

	if (!id) {
		return new Response(null, { status: 400 });
	}

	logger.info(`id: ${id}`);

	const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
			headers: {
				"Content-Type": "application/json",
			},
		}),
		user = (await res.json()) as User;

	return NextResponse.json({ user });
}
