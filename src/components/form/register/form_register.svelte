<script lang="ts">
    export let handleClick: any;
    import { push } from "svelte-spa-router";
    import MyStore from "../../../store";
    //import { Islogged } from "../../../store/store";
    import { fade } from "svelte/transition";

    let pseudo, lastname, email, password, firstname, birthday, idFaculty = '';

    $: submit = async () => {
        MyStore.dispatch("auth/register", {pseudo, lastname, firstname ,email, birthday, password, idFaculty}).then(
        async () => {
            //Islogged.set(true);
            await push('/auth');
        },
        (error) => {
        });
    }
</script>

<div transition:fade class="absolute w-full h-screen flex flex-col justify-center items-center">
    <div class="w-4/5 md:w-3/5">
        <h1 class="text-4xl">S'inscrire</h1>
        <div>
            <form class="relative flex flex-col"
            on:submit|preventDefault={submit}>
                <div class="relative w-full mt-10">
                    <div class="w-full group">
                        <input
                            class="bg-main w-full text-sm text-white rounded-xl flex flex-row pt-3 pb-3 pl-3 pr-12 drop-shadow-sm hover:outline-none hover:ring-extra/75 focus:outline-none hover:ring focus:ring focus:ring-extra focus:border-none"
                            type="text"
                            bind:value={pseudo}
                            placeholder="Pseudo"
                            required
                        />
                        <div
                            class="absolute right-0 top-0 w-12 h-full flex justify-center items-center"
                        >
                            <ion-icon
                                class="text-white visible"
                                name="person-outline"
                            />
                        </div>
                    </div>
                </div>
                <div class="relative w-full mt-6 flex flex-grap">
                    <div class="w-[47%] group">
                        <input
                            class="bg-main w-full text-sm text-white rounded-xl flex flex-row pt-3 pb-3 pl-3 pr-12 drop-shadow-sm hover:outline-none hover:ring-extra/75 focus:outline-none hover:ring focus:ring focus:ring-extra focus:border-none"
                            type="text"
                            bind:value={firstname}
                            placeholder="Prénom"
                            required
                        />
                    </div>
                    <div class="w-[6%] group" />
                    <div class="w-[47%] group">
                        <input
                            class="bg-main w-full text-sm text-white rounded-xl flex flex-row pt-3 pb-3 pl-3 pr-12 drop-shadow-sm hover:outline-none hover:ring-extra/75 focus:outline-none hover:ring focus:ring focus:ring-extra focus:border-none"
                            type="text"
                            bind:value={lastname}
                            placeholder="Nom"
                            required
                        />
                    </div>
                </div>
                <div class="relative w-full mt-6">
                    <div class="w-full group">
                        <input
                            class="bg-main w-full text-sm text-white rounded-xl flex flex-row pt-3 pb-3 pl-3 pr-12 drop-shadow-sm hover:outline-none hover:ring-extra/75 focus:outline-none hover:ring focus:ring focus:ring-extra focus:border-none"
                            type="email"
                            bind:value={email}
                            placeholder="Adresse mail"
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
                <div class="relative w-full flex flex-wrap mt-6">
                    <div class="w-[50%] md:w-[40%] group">
                        <p
                            class="bg-main w-full text-sm text-[#9CA3AF] rounded-l-xl flex flex-row py-3 px-3 drop-shadow-sm"
                        >
                            Date de naissance
                        </p>
                    </div>
                    <div class="w-[50%] md:w-[60%] group">
                        <input
                            class="bg-main w-full text-sm text-white rounded-r-xl flex flex-row pt-3 pb-3 pl-3 pr-4 h-[44px] drop-shadow-sm hover:outline-none hover:ring-extra/75 focus:outline-none hover:ring focus:ring focus:ring-extra focus:border-none"
                            type="date"
                            bind:value={birthday}
                            required
                        />
                    </div>
                </div>
                <div class="relative w-full mt-6">
                    <div class="w-full group">
                        <select
                            class="bg-main w-full text-sm text-white rounded-xl flex flex-row pt-3 pb-3 pl-3 pr-4 drop-shadow-sm hover:outline-none hover:ring-extra/75 focus:outline-none hover:ring focus:ring focus:ring-extra focus:border-none"
                            bind:value={idFaculty}
                            required
                        >
                            <option value="" disabled selected>Filière</option>
                            <option value="1">filiere 1</option>
                            <option value="2">filiere 2</option>
                        </select>
                    </div>
                </div>
                <div class="w-full flex flex-wrap mt-10">
                    <div class="w-[47%]">
                        <button
                            class="w-full flex justify-center items-center text-sm text-white rounded-xl flex flex-row py-3 drop-shadow-sm bg-extra/75 hover:bg-extra hover:ring hover:ring-extra/75 text-white"
                            type="submit"
                        >
                            S'inscrire
                        </button>
                    </div>
                    <div class="w-[6%]" />
                    <div class="w-[47%]">
                        <button
                            class="w-full flex justify-center items-center text-sm text-white rounded-xl flex flex-row py-3 drop-shadow-sm bg-main text-white decoration-none hover:outline-none hover:ring hover:ring-extra/75"
                            type="button"
                            on:click|once={handleClick}
                        >
                            Se connecter
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<style>
    input:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #25232e inset;
        -webkit-text-fill-color: white;
    }
    ::-webkit-calendar-picker-indicator {
        filter: invert(1);
        opacity: 1;
    }
    select {
        -webkit-appearance: none;
    }
    select:invalid {
        color: #9ca3af;
        -webkit-appearance: none;
    }
</style>
