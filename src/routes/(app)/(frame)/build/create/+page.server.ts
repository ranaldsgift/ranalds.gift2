import { CareerCache } from "$lib/cache/CareerCache";
import { PropertiesCache } from "$lib/cache/PropertiesCache";
import { TraitsCache } from "$lib/cache/TraitsCache";
import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";

export const load = async ({ locals }) => {
	/* 	if (!locals.sessionUserProfile) {
		error(403, "You must be logged in to create a build");
	} */

	const careers = await CareerCache.getAll();
	const properties = await PropertiesCache.getAll();
	const traits = await TraitsCache.getAll();

	const necklaceProperties = properties.filter((property) => property?.category === "necklace");
	const charmProperties = properties.filter((property) => property?.category === "charm");
	const trinketProperties = properties.filter((property) => property?.category === "trinket");

	const necklaceTraits = traits.filter((trait) => trait?.category === "defence_accessory");
	const charmTraits = traits.filter((trait) => trait?.category === "offence_accessory");
	const trinketTraits = traits.filter((trait) => trait?.category === "utility_accessory");

	let build: ICareerBuild = {
		career: careers[0],
		user: locals.sessionUserProfile ?? undefined,
		primaryWeapon: {
			weapon: careers[0].primaryWeapons[0],
			property1: careers[0].primaryWeapons[0].properties[0],
			property2: careers[0].primaryWeapons[0].properties[1],
			trait: careers[0].primaryWeapons[0].traits[0],
			user: locals.sessionUserProfile ?? undefined,
		},
		secondaryWeapon: {
			weapon: careers[0].secondaryWeapons[0],
			property1: careers[0].secondaryWeapons[0].properties[0],
			property2: careers[0].secondaryWeapons[0].properties[1],
			trait: careers[0].secondaryWeapons[0].traits[0],
			user: locals.sessionUserProfile ?? undefined,
		},
		powerLevel: 300,
		necklace: {
			trait: necklaceTraits[0],
			property1: necklaceProperties[0],
			property2: necklaceProperties[1],
			user: locals.sessionUserProfile ?? undefined,
		},
		charm: {
			trait: charmTraits[0],
			property1: charmProperties[0],
			property2: charmProperties[1],
			user: locals.sessionUserProfile ?? undefined,
		},
		trinket: {
			trait: trinketTraits[0],
			property1: trinketProperties[1],
			property2: trinketProperties[2],
			user: locals.sessionUserProfile ?? undefined,
		},
	};

	return { build };
};