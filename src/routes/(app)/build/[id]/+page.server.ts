import { CareerCache } from "$lib/cache/CareerCache.js";
import { PatchCache } from "$lib/cache/PatchCache.js";
import { CareerBuild, type ICareerBuild } from "$lib/entities/builds/CareerBuild.js";
import type { BuildPageViewModel } from "$lib/viewmodels/BuildPageViewModel.js";
import { error } from "@sveltejs/kit";

export const load = async (event) => {
	const { id } = event.params;

	let careerBuild: ICareerBuild | null = null;

	// If the ID is a UUID, this is the new supabase user ID
	const response = await event.fetch(`/api/build?id=${id}&favorites=true`, { method: "GET" });

	if (!response.ok) {
		error(404, `Failed to fetch build ${id}.`);
	}

	careerBuild = await response.json();

	if (!careerBuild) {
		error(404, `Build ${id} not found.`);
	}

	if (!careerBuild.user) {
		error(404, `Failed to pull user data for build ${id}.`);
	}

	let pageDescription = `${careerBuild.name} by ${careerBuild.user.name}.
        ${careerBuild.career.name} build for ${careerBuild.career.hero.name}. 
		${careerBuild.primaryWeapon.weapon.name} with ${careerBuild.primaryWeapon.property1?.name}, ${careerBuild.primaryWeapon.property2?.name}, and ${careerBuild.primaryWeapon.trait?.name}.
		${careerBuild.secondaryWeapon.weapon.name} with ${careerBuild.secondaryWeapon.property1?.name}, ${careerBuild.secondaryWeapon.property2?.name}, and ${careerBuild.secondaryWeapon.trait?.name}.
		Necklace with ${careerBuild.necklace.property1?.name}, ${careerBuild.necklace.property2?.name}, and ${careerBuild.necklace.trait?.name}.
		Charm with ${careerBuild.charm.property1?.name}, ${careerBuild.charm.property2?.name}, and ${careerBuild.charm.trait?.name}.
		Trinket with ${careerBuild.trinket.property1?.name}, ${careerBuild.trinket.property2?.name}, and ${careerBuild.trinket.trait?.name}.`;

	const patches = await PatchCache.getAll();

	const patch = patches
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.find((p) => new Date(p.date).getTime() <= new Date(careerBuild.dateModified).getTime());

	let viewModel: BuildPageViewModel = {
		build: careerBuild,
		patchNumber: patch?.number,
		title: `${careerBuild.name} by ${careerBuild.user.name}`,
		description: pageDescription,
	};

	return { viewModel };
};