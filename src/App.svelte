<script lang="ts">
	import Home from "./pages/Home.svelte";
	import AuthPage from "./auth/page.svelte";
	import Router, { link, location, push } from "svelte-spa-router";
	import { Islogged } from "./store/store";
	import MyStore from "./store";

	Islogged.set(MyStore.state.auth.status.loggedIn);

	const routes = {
		"/": Home,
		"/auth": AuthPage,
	};

	if(!$Islogged){
		push('/auth');
	}
</script>

{#if $location !== "/auth"}
	<header class="p-3 bg-dark text-white">
		<div class="container">
			<div
				class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
			>
				<ul
					class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
				>
					<li>
						<a href="/" use:link class="nav-link px-2 text-white"
							>Home</a
						>
					</li>
				</ul>

				{#if !$Islogged}
					<div class="text-end">
						<a
							href="/auth"
							use:link
							class="btn btn-outline-light me-2">Login</a
						>
					</div>
				{/if}
			</div>
		</div>
	</header>
{/if}

<Router {routes} />
