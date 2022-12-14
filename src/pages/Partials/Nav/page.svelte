<script lang="ts">
    import { push } from "svelte-spa-router";
    import MyStore from "../../../store";
    import { Islogged } from "../../../store/store";

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

<div class="w-3/12 h-screen text-white">
    <div
        class="h-[10%] flex items-center px-6 text-[2.5rem] uppercase font-bold"
    >
        Ytweet
    </div>
    <div class="h-[73%] flex flex-col p-6">
        <div class="w-4/5 my-1">
            <a
                class="px-6 py-2 hover:bg-extra/20 block rounded-3xl text-[1rem] flex flex-row items-center"
                href="#"
            >
                <ion-icon class="mr-4" name="home-outline" />
                Accueil
            </a>
        </div>
        <div class="w-4/5 my-1">
            <a
                class="px-6 py-2 hover:bg-extra/20 block rounded-3xl text-[1rem] flex flex-row items-center"
                href="#"
            >
                <ion-icon class="mr-4" name="paper-plane-outline" />
                Mes tweets
            </a>
        </div>
        <div class="w-4/5 my-1">
            <a
                class="px-6 py-2 hover:bg-extra/20 block rounded-3xl text-[1rem] flex flex-row items-center"
                href="#"
            >
                <ion-icon class="mr-4" name="chatbubbles-outline" />
                Messages
            </a>
        </div>
        <div class="w-4/5 my-1">
            <a
                class="px-6 py-2 hover:bg-extra/20 block rounded-3xl text-[1rem] flex flex-row items-center"
                href="#"
            >
                <ion-icon class="mr-4" name="person-outline" />
                Profile
            </a>
        </div>
    </div>
    <div class="h-[17%] flex flex-col px-6">
        <div class="w-4/5 mb-2 px-3 flex flex-row">
            <div>
                <img
                    class="w-10 h-10 rounded-full border-main"
                    alt="user profile"
                    src="https://ui-avatars.com/api/?name=HA&color=23b2a4&background=191820"
                />
            </div>
            <div class="ml-4">
                {#if Islogged}
                <div class="text-[1rem]">
                    {MyStore.state.auth.user.lastname}
                    {MyStore.state.auth.user.firstname}
                </div>
                <div class="text-[0.75rem] text-gray-400">
                    @{MyStore.state.auth.user.pseudo}
                </div>
                {/if}
            </div>
        </div>
        <div class="w-4/5 my-1">
            <a
                class="px-6 py-2 hover:bg-red-500 block rounded-3xl text-[1rem] flex flex-row items-center"
                href="#"
                on:click={logout}
            >
                <ion-icon class="mr-4" name="log-out-outline" />
                Déconnexion
            </a>
        </div>
    </div>
</div>
