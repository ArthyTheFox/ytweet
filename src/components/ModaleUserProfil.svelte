<script lang="ts">
    import { afterUpdate, onMount } from "svelte";
    import { quintOut } from "svelte/easing";
    import { fly, blur } from "svelte/transition";
    import Utils from "../../script/utils";
    import type { UserMessage, Position } from "../types";

    export let user: UserMessage;
    export let position: Position;
    export let copy: boolean;
    export let chatY: number;

    let toDown: boolean = false;
    let popup: HTMLElement;
    const tolerance: number = 5;
    let positionOffset = {
        x: tolerance,
        y: tolerance,
    };

    afterUpdate(() => {
        let total = popup.offsetHeight + tolerance;
        toDown = chatY + tolerance > position.y - total;
        if (!toDown) positionOffset.y = total;
        else positionOffset.y = -tolerance;
    });

    onMount(() => {
        let total = popup.offsetHeight + tolerance;
        toDown = chatY + tolerance > position.y - total;
        if (!toDown) positionOffset.y = total;
        else positionOffset.y = -tolerance;
    });
</script>

<div
    bind:this={popup}
    transition:fly={{
        duration: 300,
        x: 100,
        y: -50,
        opacity: 0,
        easing: quintOut,
    }}
    class="popup {toDown ? 'down' : 'up'}"
    style="left: calc({position.x}px + {positionOffset.x}px);
    top: calc({position.y}px - {positionOffset.y}px);
    background-color: #{Utils.stringToColour(Utils.formatUser(user))}"
>
    <p class="name">{user.firstname} {user.lastname}</p>
    <p class="nickname">
        @{user.pseudo}
        {#if copy}
            <span
                transition:blur={{
                    amount: 10,
                    duration: 300,
                    easing: quintOut,
                }}>copié</span
            >
        {/if}
    </p>
</div>

<style lang="scss">
    .popup {
        position: fixed;
        transition: all 0.3s cubic-bezier(0.61, 1, 0.88, 1);
        border-radius: 0.8rem;
        padding: 0.3rem 1rem;

        &.up {
            border-bottom-left-radius: 0.2rem;
        }

        &.down {
            border-top-left-radius: 0.2rem;
        }
    }

    p {
        color: #121212;

        span {
            margin-left: 0.6rem;
        }
    }

    .name {
        font-size: 0.7rem;
        font-weight: bold;
    }

    .nickname {
        font-size: 0.6rem;
    }
</style>
