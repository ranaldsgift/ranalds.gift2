import { browser } from "$app/environment";
import { getContext, setContext } from "svelte";

class WindowState {
	windowWidth = $state(browser ? window.innerWidth : 0);
	isMobile = $derived(this.windowWidth <= 480);
	isTablet = $derived(this.windowWidth > 480 && this.windowWidth <= 768);
	isDesktop = $derived(this.windowWidth >= 768);

	constructor() {
		if (browser) {
			$effect(() => {
				const handleResize = () => {
					this.windowWidth = window.innerWidth;
				};

				window.addEventListener("resize", handleResize);

				return () => {
					window.removeEventListener("resize", handleResize);
				};
			});
		}
	}
}

const CONTEXT_KEY = Symbol("WINDOW_STATE_CONTEXT_KEY");

export function initializeWindowState() {
	const windowState = new WindowState();
	setContext(CONTEXT_KEY, windowState);
	return windowState;
}

export function getWindowState() {
	return getContext<WindowState>(CONTEXT_KEY);
}