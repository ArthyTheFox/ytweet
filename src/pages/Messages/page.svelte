<script lang="ts">
  import Nav from "../Partials/Nav/page.svelte";
  import Message from "../../components/Chat.svelte";
  import { params } from "svelte-spa-router";
  import { onMount } from "svelte";
  import MessageService from "../../services/message.service";
  import MyStore from "../../store";

  let isNotConv: boolean = false;
  let idConv: number = 0;
  let messageService = MessageService;

  let conversations: Array<any> = [];

  const getConvs = () => {
    messageService.getConversations(MyStore.state.auth.user.id).then((c) => {
      console.log(c);
      conversations = c;
    });
  };

  onMount(() => {
    getConvs();
    params.subscribe((e) => {
      isNotConv = Boolean(e?.id);
      if (isNotConv) idConv = Number(e?.id);
    });
  });
</script>

<div class="w-full h-screen flex relative overflow-hidden">
  <Nav />
  {#if isNotConv}
    <Message {idConv} />
  {:else}
    <div class="h-full w-9/12 border-l border-main" />
  {/if}
  <div class="w-1/4 border-main border-l p-2 flex flex-col">
    <div class="h-[10%] w-full">
      <h2 class="text-white">Message</h2>
    </div>
    <div class="flex-1 border-1 border-t border-main overflow-y-auto p-4">
      {#each conversations as conversation, i}
        <a
          class="ctn-conversation"
          class:border-top={i !== 0}
          href="#/message/{conversation.id_conversation}"
        >
          <p>{conversation.titre}</p>
        </a>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .ctn-conversation {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    padding: 0.5rem;

    &.border-top {
      border-top: 1px solid #25232e;
    }

    p {
      text-align: start;
      color: white;
      width: fit-content;
      transition: all 0.4s cubic-bezier(0.37, 0, 0.63, 1);
    }

    &:hover p {
      color: rgb(165, 165, 165);
    }
  }
</style>
