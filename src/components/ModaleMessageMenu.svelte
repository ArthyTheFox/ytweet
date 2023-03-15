<script lang="ts">
    import { afterUpdate, createEventDispatcher, onMount } from "svelte";
    import { quintOut } from "svelte/easing";
    import { fly, blur } from "svelte/transition";
    import { clickOutside } from "../../script/clickOutside";
    import type { Position, Message } from "../types";

    export let selectedMessage: Message;
    export let position: Position;

    const dispatch = createEventDispatcher();

    let toDown: boolean = false;
    let toLeft: boolean = false;
    let popup: HTMLElement;
    const tolerance: number = 5;
    let positionOffset = {
        x: tolerance,
        y: tolerance,
    };
    // repondre
    // supprimer son message
    afterUpdate(() => {
        let total = popup.offsetHeight + tolerance;
        // toDown = chatY + tolerance > position.y - total;
        if (!toDown) positionOffset.y = total;
        else positionOffset.y = -tolerance;
    });

    onMount(() => {
        console.log(selectedMessage)
        let total = popup.offsetHeight + tolerance;
        // toDown = chatY + tolerance > position.y - total;
        if (!toDown) positionOffset.y = total;
        else positionOffset.y = -tolerance;
    });
</script>

<div
    bind:this={popup}
    use:clickOutside on:click_outside={() => dispatch('clickOutside')}
    transition:fly={{
        duration: 300,
        x: 100,
        y: -50,
        opacity: 0,
        easing: quintOut,
    }}
    class="popup {toDown ? 'down' : 'up'}"
    style="left: calc({position.x}px + {positionOffset.x}px);
    top: calc({position.y}px - {positionOffset.y}px)"
>
    <p class="name">jean castex</p>
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
    }

    .name {
        font-size: 0.7rem;
        font-weight: bold;
        background-color: blue;
    }
</style>
