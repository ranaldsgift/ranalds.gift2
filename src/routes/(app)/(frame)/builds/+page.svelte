<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	import BuildTable from "$lib/components/buildtable/BuildTable.svelte";
	import BuildTableFilters from "$lib/components/buildtable/BuildTableFilters.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import type { BuildTableFilter } from "$lib/types/BuildTableFilters";
	import { getBuildsPageState } from "$lib/state/BuildsPageState.svelte.ts";
	import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";

	let buildsPageState = getBuildsPageState();

	if ($page.url.search) {
		buildsPageState.filter = getFilterFromUrl();
	}

	function getFilterFromUrl() {
		const params = new URLSearchParams($page.url.search);
		const userId = params.get("userId");
		const heroId = params.get("heroId");
		const careerId = params.get("careerId");
		const weaponId = params.get("weaponId");
		const primaryWeaponId = params.get("primaryWeaponId");
		const secondaryWeaponId = params.get("secondaryWeaponId");
		const charmTraitId = params.get("charmTraitId");
		const necklaceTraitId = params.get("necklaceTraitId");
		const trinketTraitId = params.get("trinketTraitId");
		const isBot = params.get("isBot");
		const isDeathwish = params.get("isDeathwish");
		const isTwitch = params.get("isTwitch");
		const difficultyId = params.get("difficultyId");
		const difficultyModifierId = params.get("difficultyModifierId");
		const potionId = params.get("potionId");
		const buildRoleId = params.get("buildRoleId");
		const bookSettingId = params.get("bookSettingId");
		const patchId = params.get("patchId");
		const missionId = params.get("missionId");
		const search = params.get("search");
		const sort = params.get("sort");
		const ascending = params.get("ascending");
		const offset = params.get("offset");
		const limit = params.get("limit");

		const filter: BuildTableFilter = {
			userId: userId ?? null,
			heroId: heroId !== null ? parseInt(heroId) : null,
			careerId: careerId !== null ? parseInt(careerId) : null,
			weaponId: weaponId !== null ? parseInt(weaponId) : null,
			primaryWeaponId: primaryWeaponId !== null ? parseInt(primaryWeaponId) : null,
			secondaryWeaponId: secondaryWeaponId !== null ? parseInt(secondaryWeaponId) : null,
			charmTraitId: charmTraitId !== null ? parseInt(charmTraitId) : null,
			necklaceTraitId: necklaceTraitId !== null ? parseInt(necklaceTraitId) : null,
			trinketTraitId: trinketTraitId !== null ? parseInt(trinketTraitId) : null,
			isBot: isBot !== null ? isBot === "true" : null,
			isDeathwish: isDeathwish !== null ? isDeathwish === "true" : null,
			isTwitch: isTwitch !== null ? isTwitch === "true" : null,
			difficultyId: difficultyId !== null ? parseInt(difficultyId) : null,
			difficultyModifierId: difficultyModifierId !== null ? parseInt(difficultyModifierId) : null,
			potionId: potionId !== null ? parseInt(potionId) : null,
			buildRoleId: buildRoleId !== null ? parseInt(buildRoleId) : null,
			bookSettingId: bookSettingId !== null ? parseInt(bookSettingId) : null,
			patchId: patchId !== null ? parseInt(patchId) : null,
			missionId: missionId !== null ? parseInt(missionId) : null,
			search: search,
			sort: (sort as keyof ICareerBuild) || "dateModified",
			asc: ascending !== null ? ascending === "true" : false,
			offset: offset !== null ? parseInt(offset) : 0,
			limit: limit !== null ? parseInt(limit) : 10,
		};
		return filter;
	}

	let searchParams = $derived.by(() => {
		if (!buildsPageState.filter) {
			return "";
		}
		const params = new URLSearchParams();
		for (const key in buildsPageState.filter) {
			const value = buildsPageState.filter[key as keyof BuildTableFilter];
			if (value !== null && value !== undefined) {
				params.append(key, String(value));
			}
		}
		return "?" + params.toString();
	});

	$effect(() => {
		if ($page.url.search !== searchParams) {
			goto(`${searchParams}`, { replaceState: true, keepFocus: true, noScroll: true });
		}
	});
</script>

<Seo title="Builds" description="The largest source of community created Vermintide 2 builds."></Seo>

<Breadcrumb links={[{ href: `/`, text: "Home" }]}>Builds</Breadcrumb>

<PageButtonContainer>
	<a href="/build/create" class="button-02">Create</a>
</PageButtonContainer>

<div class="page flex flex-col gap-0">
	<div class="top-left-shadow">
		<BuildTableFilters bind:filter={buildsPageState.filter} bind:showFilters={buildsPageState.showFilters.value}></BuildTableFilters>
		<BuildTable bind:filter={buildsPageState.filter}></BuildTable>
	</div>
</div>

<style>
	.page {
		margin: 0 auto;
		max-width: 1200px;
	}
</style>
