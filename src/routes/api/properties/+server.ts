import { PropertiesCache } from "$lib/cache/PropertiesCache";
import { DataHelper } from "$lib/helpers/DataHelper";
import type { RequestHandler } from "./$types";
import { error } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
	let data = null;
	try {
		data = await PropertiesCache.getAll();
	} catch (err) {
		console.error(err);
		error(500, "Internal Server Error");
	}

	const response = DataHelper.serialize({
		items: data,
		count: data.length,
	});

	return new Response(response);
};
