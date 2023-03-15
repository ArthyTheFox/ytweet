<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { link, push } from "svelte-spa-router";
    import { onMount } from "svelte";
    import postesService from "../../../services/postes.service";
    import DatePost from "../Components/DatePost.svelte";
    import Like from "../Components/like.svelte";
    import EmojiPicker from "../../Postes/Components/EmojiPicker.svelte";
    import Comment from "../Components/Comment.svelte";
    import commentService from "../../../services/comments.service";
    import TextArea from "../Components/TextAreaResizeAuto.svelte";

    const dispatch = createEventDispatcher();

    export let idPoste: number;
    let poste: any;

    let content = "";

    let comments: any = [];

    onMount(async () => {
        // console.log(params.idposte);
        poste = await postesService.poste(idPoste);
        comments = await commentService.comments(idPoste);
    });

    function onEmojiChange(event) {
        content += event.detail.emoji;
    }

    const submitComment = async () => {
        await commentService
            .storeComment(
                {
                    content,
                },
                idPoste
            )
            .then((data) => {
                comments = [data, ...comments];
                content = "";
            });
    };
</script>

<div class="w-6/12 relative h-screen border-x border-main group">
    <!-- <div
        class="absolute bottom-4 left-1/2 -translate-x-6 bg-sky-500/50 shadow-lg w-12 h-12 hover:bg-sky-500 rounded-full z-50 cursor-pointer hidden group-hover:flex justify-center items-center"
        on:keypress={() => {
            dispatch("addComment");
        }}
        on:click={() => {
            dispatch("addComment");
        }}
    >
        <ion-icon
            class="text-[1.25rem] text-white"
            name="chatbox-ellipses-outline"
        />
    </div>
    <div
        class="absolute bottom-2 left-1/2 -translate-x-20 bg-green-500/50 shadow-lg w-12 h-12 hover:bg-green rounded-full z-50 cursor-pointer hidden group-hover:flex justify-center items-center"
    >
        <ion-icon
            class="text-[1.25rem] text-white"
            name="return-down-forward-outline"
        />
    </div>
    <div
        class="absolute bottom-2 left-1/2 translate-x-8 bg-red-500/50 shadow-lg w-12 h-12 hover:bg-red-500 rounded-full z-50 cursor-pointer hidden group-hover:flex justify-center items-center"
    >
        <ion-icon class="text-[1.25rem] text-white" name="heart" />
    </div> -->
    <div
        class="h-[10%] relative flex px-4 items-center border-b border-main uppercase text-white text-[1.75rem] font-bold shadow-nav"
    >
        <a
            href="/"
            use:link
            class="w-8 h-8 flex justify-center items-center p-1 rounded-full hover:bg-extra"
        >
            <ion-icon name="arrow-back-outline" />
        </a>
    </div>
    <div class="h-[90%] relative text-white overflow-y-scroll">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="w-full flex flex-col py-2">
            <div class="flex flex-row px-4">
                <div class="flex justify-center items-center w-1/12 h-16">
                    <img
                        class="w-12 h-12 rounded-full border-main"
                        alt="user profile"
                        src="https://ui-avatars.com/api/?name=HA&color=23b2a4&background=191820"
                    />
                </div>
                <div class="ml-1 pt-2 flex w-10/12 h-16">
                    <div class="flex flex-col">
                        <div class="flex flex-row">
                            {poste?.firstname} {poste?.lastname}
                            <div class="mx-2">
                                <span class="text-[0.75rem] text-gray-400"
                                    >-</span
                                >
                            </div>
                            <div>
                                <DatePost DatePost={poste?.publishDate} />
                            </div>
                        </div>
                        <span class="text-[0.75rem] text-gray-400"
                            >@{poste?.username}</span
                        >
                    </div>
                </div>
                <div class="ml-1 flex justify-center items-center w-1/12 h-16">
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
            <div class="flex flex-col py-4 px-4">
                <div class="line-clamp-[10] whitespace-pre-line">
                    {poste?.content}
                </div>
            </div>
            {#if poste?.pathMedia}
                <div
                    class="ml-4 mr-4 flex flex-col justify-center items-center"
                >
                    <div class=" border rounded-lg border-main">
                        <img
                            class="rounded-lg w-full"
                            src="http://162.19.33.222:1331/media/{poste?.pathMedia}"
                            alt="#"
                        />
                    </div>
                </div>
            {/if}
            <div
                class="mt-4 flex flex-col justify-center items-center border-t border-main"
            >
                <div class="mr-8 rounded-lg w-3/5 flex p-2">
                    <div
                        class="w-1/3 flex justify-center items-center py-1 text-gray-200"
                    >
                        <div
                            class="flex justify-center items-center hover:text-extra cursor-pointer"
                        >
                            <ion-icon
                                class="text-[1.25rem]"
                                name="chatbox-ellipses-outline"
                            />
                            <span class="ml-2 mb-[3px] text-[0.8rem]">0</span>
                        </div>
                    </div>
                    <div
                        class="w-1/3 flex justify-center items-center py-1 text-gray-200"
                    >
                        <div
                            class="flex justify-center items-center hover:text-green-500 cursor-pointer"
                        >
                            <ion-icon
                                class="text-[1.25rem]"
                                name="return-down-forward-outline"
                            />
                            <span class="ml-2 mb-[3px] text-[0.8rem]">0</span>
                        </div>
                    </div>
                    <div
                        class="w-1/3 flex justify-center items-center py-1 text-gray-200"
                    >
                        <Like checked={false} like={0} />
                    </div>
                </div>
            </div>
            <div class="flex flex-col border-b border-main">
                <div
                    class="py-1 px-4 text-neutral-500 text-sm border-y bg-main border-main"
                >
                    Répondre à {poste?.username}
                </div>
                <div class="flex flex-row">
                    <div class="flex justify-center items-center w-1/12 h-16">
                        <img
                            class="w-10 h-10 rounded-full border-main"
                            alt="user profile"
                            src="https://ui-avatars.com/api/?name=HA&color=23b2a4&background=191820"
                        />
                    </div>
                    <div class="ml-1 flex w-10/12 mt-3">
                        <div class="flex flex-col w-full">
                            <TextArea
                                bind:value={content}
                                minRows={1}
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
                    <div
                        class="ml-1 flex justify-center items-center w-1/12 h-16"
                    >
                        <div
                            class="w-8 h-8 flex justify-center items-center rounded-full hover:bg-extra/50 cursor-pointer"
                            on:click={submitComment}
                        >
                            <ion-icon name="paper-plane-outline" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- svelte-ignore missing-declaration -->
            {#each comments as comment}
                {#key comment}
                    <Comment
                        username={comment.username}
                        content={comment.content}
                        idComment={comment.id}
                        idPost={poste?.id}
                        subCom={comment.subComment}
                        firstname={comment.firstname}
                        lastname={comment.lastname}
                        usernamePoste={poste?.username}
                    />
                {/key}
            {/each}
            <!-- <div class="bg-transparent h-16" /> -->
        </div>
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

    .shadow-nav {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
</style>
