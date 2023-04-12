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
        <div class="flex-1 border-1 border-t border-main overflow-y-auto p-4">
            {#each conversations as conversation, i}
                <a class="ctn-conversation" class:border-top="{i !== 0}" href="#/message/{conversation.id}">
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
        justify-content: center;
        align-items: center;
        
        &.border-top {
            border-top: 1px solid #25232e;
        }
        
        p {
            color: white;
            width: fit-content;
            transition: all 0.4s cubic-bezier(0.37, 0, 0.63, 1);
        }

        &:hover p {
            color: rgb(165, 165, 165);
        }
    }
</style>