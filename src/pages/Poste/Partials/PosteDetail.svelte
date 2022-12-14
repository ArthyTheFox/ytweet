<script lang="ts">
    import { link, push } from "svelte-spa-router";
    import { onMount } from "svelte";
    import postesService from "../../../services/postes.service";
    import DatePost from "../Components/DatePost.svelte";
    import Like from "../Components/like.svelte";
    import MyStore from "../../../store";

    let postes: any = [];

    onMount(async () => {
        postes = await postesService.postes();
    });

    const PostesDetails = (idPoste: number) => {
        console.log(idPoste);
        push(`/${MyStore.state.auth.user.pseudo}/poste/${idPoste}`);
    };
</script>

<div class="w-6/12 relative h-screen border-x border-main">
    <div
        class="h-[10%] relative flex px-4 items-center border-b border-main uppercase text-white text-[1.75rem] font-bold  "
    >
        <a href="/" use:link class="w-8 h-8 flex justify-center items-center p-1 inline-block rounded-full hover:bg-extra">
            <ion-icon name="arrow-back-outline" />
        </a>
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
                                src={poste.pathMedia}
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
                                    name="return-down-forward-outline"
                                />
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
