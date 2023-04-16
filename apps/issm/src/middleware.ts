import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest): Response {
	if (isProtected(req)) {
		const basicAuth = req.headers.get("Authorization");
		if (basicAuth) {
			const auth = basicAuth.split(" ")[1],
				[user, pwd] = atob(auth).split(":");

			if (
				user === (process.env.BASIC_AUTH_USERNAME as string) &&
				pwd === (process.env.BASIC_AUTH_PASSWORD as string)
			) {
				return NextResponse.next();
			}
		}

		return new Response(null, {
			status: 401,
			headers: {
				"WWW-Authenticate": 'Basic realm="Secure Manasub Area"',
			},
		});
	}

	return NextResponse.next();
}

function isProtected(req: NextRequest) {
	if (process.env.NODE_ENV === "development" || uriIsAllowed(req)) {
		return false;
	}

	return true;
}

function uriIsAllowed(req: NextRequest) {
	const nonProtectedUris: string[] = ["/favicon.ico", "/api/status"];

	for (const uri of nonProtectedUris) {
		if (req.url.includes(uri)) {
			return true;
		}
	}

	return false;
}
