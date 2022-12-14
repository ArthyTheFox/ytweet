<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { fly } from "svelte/transition";
    import { sineIn, sineOut } from "svelte/easing";
    import postesService from "../../../services/postes.service";

    export let addShow: boolean;

    const dispatch = createEventDispatcher();

    function updateShow() {
        dispatch("quit");
    }

    let content, pathMedia;

    $: submit = async () => {
        await postesService
            .storePoste({
                content,
                pathMedia: pathMedia.files[0],
            })
            .then((data) => {
                console.log(data);
            });
    };
</script>

{#if addShow}
    <div
        class="absolute right-0 top-0 w-[35rem] h-full bg-[#121212] border-l border-main shadow-3xl"
        in:fly={{ duration: 250, x: 500, easing: sineOut }}
        out:fly={{ duration: 250, x: 500, easing: sineIn }}
    >
        <div class="w-full flex flex-col h-full">
            <div class="relative w-full flex flex-row h-full">
                <div class="w-1/12 flex h-full justify-center items-center">
                    <button
                        class="text-white hover:bg-extra w-full h-full flex justify-center items-center"
                        on:click={updateShow}
                    >
                        <ion-icon name="chevron-forward-outline" />
                    </button>
                </div>
                <div class="w-11/12 p-4 border-l border-main">
                    <div
                        class="text-white flex justify-center items-center text-[1.25rem] p-2 border-b border-main"
                    >
                        Ajouter un poste
                    </div>
                    <form
                        class="flex flex-col justify-center items-center w-full"
                        on:submit|preventDefault={submit}
                    >
                        <div class="flex flex-col">
                            <div class="w-full">
                                <div class="mt-4 flex flex-col w-full">
                                    <div class="text-white px-4 py-2">
                                        Content
                                    </div>
                                    <input
                                        bind:value={content}
                                        class="bg-main p-4"
                                        required
                                        placeholder="Content"
                                    />
                                </div>

                                <div class="mt-4 flex flex-col w-full">
                                    <div class="text-white px-4 py-2">
                                        Image
                                    </div>
                                    <input
                                        type="file"
                                        bind:this={pathMedia}
                                        class="p-2 rounded-xl"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            class="my-4 lg:mt-8 border-2 border-white w-56 relative px-3 py-3 rounded-3xl bg-[#ae2525] hover:bg-rouge/75 text-white "
                            type="submit"
                        >
                            <span>Ajouter</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
{/if}
