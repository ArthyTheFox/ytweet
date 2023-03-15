<script lang="ts">
    import SubComment from "./SubComment.svelte";
    import { clickOutside } from "../../../../script/clickOutside";
    import EmojiPicker from "./EmojiPicker.svelte";
    import TextArea from "../../Postes/Components/TextAreaResizeAuto.svelte";
    import commentService from "../../../services/comments.service";

    export let username: string;
    export let usernamePoste: string;
    export let firstname: string;
    export let lastname: string;
    export let content: string;
    export let idPost: number;
    export let idComment: number;
    export let subCom: [];
    let height: number;
    let Sub = subCom ? subCom : [];
    let checkbox = false;
    let dialogAddSubComment = false;

    let emoji = "";

    function onEmojiChange(event) {
        emoji += event.detail.emoji;
    }

    const openMenu = () => {
        checkbox = true;
    };

    function closeMenu() {
        checkbox = false;
    }

    const dialogAddSubCommentHandle = () => {
        dialogAddSubComment = !dialogAddSubComment;
    };

    const submitComment = async () => {
        await commentService
            .storeSubComment(emoji, idPost, idComment)
            .then((data) => {
                dialogAddSubComment = false;
                Sub = [data, ...Sub];
                emoji = "";
            });
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if dialogAddSubComment}
    <div
        class="fixed left-0 top-0 w-full h-full flex justify-center items-center z-[99] backdrop-blur-[6px]"
        on:click|self={dialogAddSubCommentHandle}
    >
        <div
            class="relative w-1/3 h-fit bg-main rounded-lg border border-extra z-[99]"
        >
            <div
                class="absolute right-4 top-4 flex justify-center items-center"
            >
                <div
                    class="w-8 h-8 flex justify-center items-center rounded-full hover:bg-extra/50 cursor-pointer"
                    on:click={submitComment}
                >
                    <ion-icon name="paper-plane-outline" />
                </div>
            </div>
            <div class="flex flex-row px-4">
                <div
                    class="relative flex justify-center items-center w-1/12 h-16"
                >
                    <img
                        class="w-8 h-8 rounded-full border-main"
                        alt="user profile"
                        src="https://ui-avatars.com/api/?name=HA&color=23b2a4&background=191820"
                    />
                </div>
                <div class="relative ml-1 pt-2 w-10/12">
                    <div class="flex flex-row items-center">
                        {firstname}
                        {lastname}
                        <span class="ml-2 mt-[2px] text-[0.6rem] text-gray-400"
                            >@{username}</span
                        >
                    </div>
                    <div
                        class="flex flex-row items-end text-xs text-neutral-500"
                    />
                    <div
                        class="flex flex-row items-end text-sm text-white mt-2 pb-4"
                        bind:clientHeight={height}
                    >
                        {content}
                    </div>
                </div>
            </div>
            <div class="flex flex-col border-b border-main">
                <div
                    class="py-1 px-4 text-neutral-500 text-sm border-y bg-main-fonce border-main"
                >
                    Répondre à <span class="text-extra ml-1">@{username}</span>
                </div>
                <div class="flex flex-row">
                    <div class="ml-1 flex w-full mt-3">
                        <div class="flex flex-col w-full">
                            <TextArea
                                bind:value={emoji}
                                minRows={4}
                                maxRows={40}
                            />
                            <div class="text-white flex flex-row py-2 px-1">
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <ion-icon
                                    name="image-outline"
                                    class="w-4 h-4 rounded-full hover:bg-extra/50 p-2 cursor-pointer "
                                />
                                <EmojiPicker on:change={onEmojiChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}

<div class="flex flex-col border-b border-main">
    <div class="flex flex-col hover:bg-extra/10 cursor-pointer">
        <div class="flex flex-row">
            <div class="relative flex justify-center items-center w-1/12 h-16">
                <img
                    class="w-10 h-10 rounded-full border-main"
                    alt="user profile"
                    src="https://ui-avatars.com/api/?name=HA&color=23b2a4&background=191820"
                />
                {#if Sub.length !== 0}
                    <div
                        class="absolute top-[93%] left-1/2 w-[2px] bg-extra"
                        style="height: {height}px;"
                    />
                {/if}
            </div>
            <div class="relative ml-1 pt-2 w-10/12">
                <div class="flex flex-row items-center">
                    {firstname}
                    {lastname}
                    <span class="ml-2 mt-[2px] text-[0.6rem] text-gray-400"
                        >@{username}</span
                    >
                </div>
                <div class="flex flex-row items-end text-xs text-neutral-500">
                    Réponse à <span class="text-extra ml-1"
                        >@{usernamePoste}</span
                    >
                </div>
                <div
                    class="flex flex-row items-end text-sm text-white mt-2 pb-4 line-clamp-1"
                    bind:clientHeight={height}
                >
                    {content}
                </div>
            </div>
            <div class="ml-1 flex justify-center items-center w-1/12 h-16">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                    class="group relative w-8 h-8 flex justify-center items-center rounded-full hover:bg-extra/50 cursor-pointer"
                    on:click={openMenu}
                >
                    <ion-icon name="ellipsis-vertical-outline" />
                    <input
                        class="peer hidden"
                        type="checkbox"
                        bind:checked={checkbox}
                    />
                    <!-- svelte-ignore missing-declaration -->
                    <div
                        class="peer-checked:block hidden absolute right-0 top-0 border border-extra rounded shadow-lg bg-main overflow-hidden w-48"
                        use:clickOutside
                        on:click_outside={closeMenu}
                    >
                        <div
                            class="p-2 hover:bg-extra cursor-pointer text-xs"
                            on:click={dialogAddSubCommentHandle}
                        >
                            Répondre
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {#each Sub as sub, i}
        <SubComment
            username={sub.username}
            content={sub.content}
            lastname={sub.lastname}
            firstname={sub.firstname}
            usernamePost={usernamePoste}
            usernameComment={username}
            displayBar={Sub.length > i + 1}
        />
    {/each}
</div>

<style>
    :global(.emoji-picker__wrapper) {
        z-index: 999;
    }
</style>
