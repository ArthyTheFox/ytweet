<script lang="ts">
    import Nav from "../Partials/Nav/page.svelte";
    import Message from "../../components/Chat.svelte";

    let conversations: Array<any> = [
        {
            id: 1,
            name: 'pierre, armand',
        },
        {
            id: 2,
            name: 'pierre, didier',
        }
    ];

</script>

<div class="w-full h-screen flex relative overflow-hidden">
    <Nav />
    <Message />
    <div class="w-1/4 border-main border-l p-2 flex flex-col">
        <div class="h-[10%] w-full">
            <h2 class="text-white">Message</h2>
        </div>
        <div class="flex-1 border-1 border overflow-y-auto">
            {#each conversations as conversation}
                <a class="ctn-conversation" href="#/message/{conversation.id}">
                    <p>{conversation.name}</p>
                </a>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
    .ctn-conversation {
        display: flex;
        height: 3rem;
        width: 100%;
        border: 1px solid white;
        justify-content: center;
        align-items: center;
        p {
            color: white;
            width: fit-content;
        }
    }
</style>