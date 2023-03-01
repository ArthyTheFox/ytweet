<script lang="ts">
    import { onMount } from "svelte";


    export let username: string;
    export let usernamePost: string;
    export let usernameComment: string;
    export let displayBar:boolean;
    export let content: string;
    export let firstname: string;
    export let lastname: string;
    let height:number;

    onMount(() => {

    })
</script>

<div class="flex flex-col hover:bg-extra/10 cursor-pointer">
    <div class="flex flex-row relative">
        <div class="relative flex justify-center items-center w-1/12 h-16">
            <img
                class="w-10 h-10 rounded-full border-main"
                alt="user profile"
                src="https://ui-avatars.com/api/?name=HA&color=23b2a4&background=191820"
            />
            {#if displayBar}
            <div
                class="absolute top-[93%] left-1/2 w-[1px] bg-extra"
                style="height: {height}px;"
            />
            {/if}
        </div>
        <div class="relative ml-1 pt-2 w-9/12">
            <div class="flex flex-row items-center">
                {firstname} {lastname}
                <span class="ml-2 mt-[2px] text-[0.6rem] text-gray-400"
                    >{username}</span
                >
            </div>
            <div class="flex flex-row items-end text-xs text-neutral-500">
                Réponse à <span class="text-extra mx-1">@{usernameComment}</span> et <span class="text-extra ml-1">@{usernamePost}</span>
            </div>
            <div class="flex flex-row items-end text-sm text-white mt-2 pb-4" bind:clientHeight={height}>
                {content}
            </div>
        </div>
        <!-- <div class="ml-1 flex justify-center items-center w-1/12 h-16">
            <div
                class="w-8 h-8 flex justify-center items-center rounded-full hover:bg-extra/50 cursor-pointer"
            >
                <ion-icon name="ellipsis-vertical-outline" />
            </div>
        </div> -->
    </div>
</div>
