<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { fly } from "svelte/transition";
    import { sineIn, sineOut } from "svelte/easing";
    import postesService from "../../../services/postes.service";

    import EmojiPicker from "../Components/EmojiPicker.svelte";

    import TextArea from "../Components/TextAreaResizeAuto.svelte";
    export let addShow: boolean;

    const dispatch = createEventDispatcher();

    function updateShow() {
        dispatch("quit");
    }

    let content = "",
        pathMedia = null;

    let urlMedia = null;

    $: submit = async () => {
        await postesService
            .storePoste({
                content,
                pathMedia: pathMedia.files[0],
            })
            .then((data) => {
                console.log(data)
                if(data){
                    dispatch('add', data)
                }
            });
    };

    const changeDisplayImg = () => {
        const file = pathMedia.files[0];
        if (file) {
            urlMedia = URL.createObjectURL(file);
        }
    };

    const clickImgButton = () => {
        pathMedia.click();
    };

    const removeMedia = () => {
        urlMedia = null;
        pathMedia.value = "";
    };

    function onEmojiChange(event) {
        content += event.detail.emoji;
    }
</script>

{#if addShow}
    <div
        class="absolute right-0 top-0 w-full md:w-[35rem] h-full bg-[#121212] border-l border-main shadow-3xl"
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
                <div class="w-11/12 border-l border-main">
                    <form
                        class="flex flex-col w-full"
                        on:submit|preventDefault={submit}
                    >
                        <div class="flex flex-col">
                            <div class="w-full">
                                <div class="flex flex-row px-2">
                                    <div class="flex flex-col w-full">
                                        <div
                                            class="text-white flex flex-row py-2 px-1"
                                        >
                                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                                            <ion-icon
                                                name="image-outline"
                                                class="w-4 h-4 rounded-full hover:bg-extra/50 p-2 cursor-pointer "
                                                on:click={clickImgButton}
                                            />
                                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                                            <ion-icon
                                                name="link-outline"
                                                class="w-4 h-4 rounded-full hover:bg-extra/50 p-2 cursor-pointer ml-2"
                                            />
                                            <EmojiPicker on:change={onEmojiChange}/>
                                        </div>
                                        <TextArea
                                            bind:value={content}
                                            minRows={1}
                                            maxRows={40}
                                        />
                                    </div>
                                </div>
                                <div class="mt-4 flex flex-col w-full">
                                    <input
                                        type="file"
                                        bind:this={pathMedia}
                                        class="hidden"
                                        accept="image/*"
                                        on:change={changeDisplayImg}
                                    />
                                    {#if pathMedia?.files[0]}
                                        <div
                                            class="w-full min-h-20 flex justify-center items-center relative overflow-hidden"
                                        >
                                            <img
                                                class="rounded-lg w-4/6 h-full"
                                                alt={urlMedia}
                                                src={urlMedia}
                                            />
                                            <div class="absolute left-2 top-2">
                                                <div>
                                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                                    <ion-icon
                                                        name="close-outline"
                                                        class="w-4 h-4 rounded-full bg-main hover:bg-extra/50 p-2 cursor-pointer text-white"
                                                        on:click={removeMedia}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        </div>
                        <div class="w-full flex justify-center items-center">
                            <button
                                class="relative w-12 h-12 flex justify-center items-center rounded-full bg-extra/50 hover:bg-extra p-2 cursor-pointer text-white"
                                type="submit"
                            >
                                <ion-icon
                                    name="rocket-outline"
                                    class="text-white text-xl"
                                />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
{/if}
