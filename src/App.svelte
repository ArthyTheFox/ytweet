<script lang="ts">
	//import Home from "./pages/Home.svelte";
	import AuthPage from "./auth/page.svelte";
	import NotFound from "./pages/pageNotFound.svelte";
	import Postes from "./pages/Postes/page.svelte";
	import Poste from "./pages/Poste/page.svelte";
	import Message from './pages/Messages/page.svelte';
	import Router from "svelte-spa-router";
	import { Islogged } from "./store/store";
	import MyStore from "./store";

	Islogged.set(MyStore.state.auth.status.loggedIn);

	const routes = {
		"/auth": AuthPage,
		"/": Postes,
		"/:iduser/poste/:idposte": Poste,
		"/message": Message,
		"*": NotFound,
	};
</script>

<Router {routes} />
