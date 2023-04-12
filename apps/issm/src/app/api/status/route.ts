// eslint-disable-next-line @typescript-eslint/require-await
export async function GET(): Promise<Response> {
	return new Response(null, { status: 200 });
}
