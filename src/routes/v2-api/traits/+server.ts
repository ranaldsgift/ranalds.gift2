import { TraitsCache } from "$lib/cache/TraitsCache";
import type { RequestHandler } from "./$types";
import { error } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
	let data = null;
	try {
		data = await TraitsCache.getAll();
	} catch (err) {
		console.error(err);
		error(500, "Internal Server Error");
	}

	const response = JSON.stringify({
		items: data,
		count: data.length,
	});

	return new Response(response);
};