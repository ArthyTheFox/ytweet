<script lang="ts">
    export let checked: boolean, like:number;

    const liked = () => {
        checked = !checked;
        checked? like++ : like--;
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flex justify-center items-center cursor-pointer {checked? 'text-red-500' : 'hover:text-red-500'}" on:click={liked}>
    {#if checked}
        <ion-icon class="text-[1.25rem]" name="heart" />
    {:else} 
        <ion-icon class="text-[1.25rem]" name="heart-outline" />
    {/if}
    <span class="ml-2 mb-[3px] text-[0.8rem]">{like}</span>
</div>
