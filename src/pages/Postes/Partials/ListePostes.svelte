<script lang="ts">
    import {push} from "svelte-spa-router";
    import { onMount } from "svelte";
    import postesService from "../../../services/postes.service";
    import DatePost from "../Components/DatePost.svelte";
    import Like from "../Components/like.svelte";
    import MyStore from "../../../store";

    let postes: any = [];

    onMount(async () => {   
        postes = await postesService.postes();  
    });

    const PostesDetails = (idPoste:number) => {
        console.log(idPoste)
        push(`/${MyStore.state.auth.user.pseudo}/poste/${idPoste}`)
    }
</script>

<div class="w-6/12 relative h-screen border-x border-main">
    <div class="h-[10%] relative flex justify-center items-center border-b border-main">
        <div class="absolute hidden left-0 top-0 px-4 w-full h-full items-center text-[1.5rem] text-gray-500/20 font-bold">Accueil</div>
        <div class="relative w-8/12">
            <input
                class="bg-main w-full text-sm text-white rounded-xl flex flex-row pt-3 pb-3 pl-3 pr-12 drop-shadow-sm hover:outline-none hover:ring-extra/75 focus:outline-none hover:ring focus:ring focus:ring-extra focus:border-none"
                type="text"
                placeholder="Rechercher par postes, par nom ou par catégorie"
            />
            <div
                class="absolute right-0 top-0 w-12 h-full flex justify-center items-center"
            >
                <ion-icon class="text-white visible" name="search-outline" />
            </div>
        </div>
    </div>
    <div class="h-[90%] relative text-white overflow-y-scroll">
        {#each postes as poste}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="w-full flex flex-col border-b border-main py-2 px-4 hover:bg-extra/10 cursor-pointer"
                on:click={() => PostesDetails(poste.id)}
            >
                <div class="flex flex-row">
                    <div class="flex justify-center items-center w-1/12 h-16">
                        <img
                            class="w-12 h-12 rounded-full border-main"
                            alt="user profile"
                            src="https://ui-avatars.com/api/?name=HA&color=23b2a4&background=191820"
                        />
                    </div>
                    <div class="ml-1 pt-2 flex w-10/12 h-16">
                        <div class="flex flex-col">
                            {poste.userId}
                            <span class="text-[0.75rem] text-gray-400"
                                >@arhoupin</span
                            >
                        </div>
                        <div class="mx-2">
                            <span class="text-[0.75rem] text-gray-400">-</span>
                        </div>
                        <div>
                            <DatePost DatePost={poste.publishDate} />
                        </div>
                    </div>
                    <div
                        class="ml-1 flex justify-center items-center w-1/12 h-16"
                    >
                        <div
                            class="w-8 h-8 flex justify-center items-center rounded-full hover:bg-extra/50 cursor-pointer"
                        >
                            <ion-icon
                                class="text-[1.2rem]"
                                name="ellipsis-vertical-outline"
                            />
                        </div>
                    </div>
                </div>
                <div class="ml-16 flex flex-col">
                    <div class="line-clamp-[10] whitespace-pre-line">
                        {poste.content}
                    </div>
                </div>
                {#if poste.pathMedia}
                <div class="ml-16 mt-4 flex flex-col">
                    <div class="mr-8 border rounded-lg border-main">
                        <img
                            class="rounded-lg"
                            src="http://localhost:8000/media/{poste.pathMedia}"
                            alt="#"
                        />
                    </div>
                </div>
                {/if}
                <div class="ml-16 mt-4 flex flex-col">
                    <div class="mr-8 rounded-lg w-3/5 flex">
                        <div
                            class="w-1/3 flex justify-center items-center py-1 text-gray-400"
                        >
                            <div
                                class="flex justify-center items-center hover:text-extra cursor-pointer"
                            >
                                <ion-icon
                                    class="text-[1.25rem]"
                                    name="chatbox-ellipses-outline"
                                />
                                <span class="ml-2 mb-[3px] text-[0.8rem]"
                                    >157</span
                                >
                            </div>
                        </div>
                        <div
                            class="w-1/3 flex justify-center items-center py-1 text-gray-400"
                        >
                            <div
                                class="flex justify-center items-center hover:text-green-500 cursor-pointer"
                            >
                                <ion-icon
                                    class="text-[1.25rem]"
                                    name="return-down-forward-outline"></ion-icon>
                                <span class="ml-2 mb-[3px] text-[0.8rem]"
                                    >157</span
                                >
                            </div>
                        </div>
                        <div
                            class="w-1/3 flex justify-center items-center py-1 text-gray-400"
                        >
                            <Like checked={false} like={150} />
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    /* width */
    ::-webkit-scrollbar {
        display: none;
    }

    /* ::-webkit-scrollbar {
        height: 5px;
    } */

    /* Track */
    ::-webkit-scrollbar-track {
        background: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: transparent;
        border-radius: 25px;
    }

    :hover::-webkit-scrollbar-thumb {
        background: #23b2a4;
    }
</style>
