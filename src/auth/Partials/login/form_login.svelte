<script lang="ts">
    export let handleClick: any;

    import { push } from "svelte-spa-router";
    import MyStore from "../../../store";
    import { Islogged } from "../../../store/store";
    import { fade } from "svelte/transition";

    let email = "",
        password = "";

    $: submit = async () => {
        MyStore.dispatch("auth/login", { email, password }).then(
            async () => {
                Islogged.set(true);
                await push("/");
            },
            (error) => {}
        );
    };
</script>

<div transition:fade class="absolute w-full h-screen flex flex-col justify-center items-center">
    <div class="w-4/5 md:w-3/5">
        <h1 class="text-4xl">Se connecter</h1>
        <div>
            <form class="relative flex flex-col"
            on:submit|preventDefault={submit}>
                <div class="relative w-full mt-10">
                    <div class="w-full group">
                        <input
                            bind:value={email}
                            class="bg-main w-full text-sm text-white rounded-xl flex flex-row pt-3 pb-3 pl-3 pr-12 drop-shadow-sm hover:outline-none hover:ring-extra/75 focus:outline-none hover:ring focus:ring focus:ring-extra focus:border-none"
                            type="email"
                            placeholder="Email"
                            required
                        />
                        <div
                            class="absolute right-0 top-0 w-12 h-full flex justify-center items-center"
                        >
                            <ion-icon
                                class="text-white visible"
                                name="at-outline"
                            />
                        </div>
                    </div>
                </div>
                <div class="relative w-full mt-6">
                    <div class="w-full group">
                        <input
                            class="bg-main w-full text-sm text-white rounded-xl flex flex-row pt-3 pb-3 pl-3 pr-12 drop-shadow-sm hover:outline-none hover:ring-extra/75 focus:outline-none hover:ring focus:ring focus:ring-extra focus:border-none"
                            type="password"
                            bind:value={password}
                            placeholder="Mot de passe"
                            required
                        />
                        <div
                            class="absolute right-0 top-0 w-12 h-full flex justify-center items-center"
                        >
                            <ion-icon
                                class="text-white visible"
                                name="key-outline"
                            />
                        </div>
                    </div>
                </div>
                <div class="w-full flex flex-wrap mt-10">
                    <div class="w-[47%]">
                        <button
                            class="w-full flex justify-center items-center text-sm text-white rounded-xl flex flex-row py-3 drop-shadow-sm bg-extra/75 hover:bg-extra hover:ring hover:ring-extra/75 text-white"
                            type="submit"
                        >
                            Se connecter
                        </button>
                    </div>
                    <div class="w-[6%]" />
                    <div class="w-[47%]">
                        <button
                            class="w-full flex justify-center items-center text-sm text-white rounded-xl flex flex-row py-3 drop-shadow-sm bg-main text-white decoration-none hover:outline-none hover:ring hover:ring-extra/75"
                            type="button"
                            on:click|once={handleClick}
                        >
                            S'inscrire
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
