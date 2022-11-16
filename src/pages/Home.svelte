<script>
    import { push } from "svelte-spa-router";
    import MyStore from "../store";
    import { Islogged } from "../store/store";

    if(!$Islogged){
		push('/auth');
	}

    $: logout = async () => {
        MyStore.dispatch("auth/logout").then(
            async () => {
                Islogged.set(false);
                await push("/auth");
            },
            (error) => {}
        );
    };
</script>

<div class="container mt-5 text-center text-white">
    {#if !MyStore.state.auth.status.loggedIn}
        <h3>Vous n'êtes pas connecté</h3>
    {:else}
        Bienvenu {MyStore.state.auth.user.lastname} {MyStore.state.auth.user.firstname}
        <br />
        <a
            href="javascript:void(0)"
            class="btn btn-lg btn-primary"
            on:click={logout}>Logout</a
        >
    {/if}
</div>
