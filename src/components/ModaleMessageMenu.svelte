<script lang="ts">
  import { afterUpdate, createEventDispatcher, onMount } from "svelte";
  import { quintOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  import { clickOutside } from "../../script/clickOutside";
  import type { Position, Message } from "../types";
  import MyStore from "../store";
  import UserService from "../services/user.service";
  import MessageService from "../services/message.service";
  import type { User } from "../types";
  import { link } from "svelte-spa-router";
  import { socket } from "../services/socketio.service";

  export let selectedMessage: Message;
  export let position: Position;
  export let indexMessage: Number;

  let messageservice = MessageService;
  let userservice = UserService;
  let user: User;

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
  afterUpdate(() => {
    let total = popup.offsetHeight + tolerance;
    // toDown = chatY + tolerance > position.y - total;
    if (!toDown) positionOffset.y = total;
    else positionOffset.y = -tolerance;
  });

  onMount(() => {
    getUser();
    console.log(selectedMessage);
    let total = popup.offsetHeight + tolerance;
    // toDown = chatY + tolerance > position.y - total;
    if (!toDown) positionOffset.y = total;
    else positionOffset.y = -tolerance;
  });

  const getUser = () => {
    userservice.getUserById(selectedMessage?.id_User).then((u) => {
      user = u[0];
    });
  };

  const deleteMessage = () => {
    messageservice
      .deleteMessage(selectedMessage?.id_conversation, selectedMessage?.id)
      .then((r) => {
        socket.emit(
          "deleteMessage",
          { idConversation: selectedMessage?.id_conversation, indexMessage: indexMessage },
          (error: any) => {
            if (error) {
              console.log(error);
            }
          }
        );
        dispatch("clickOutside");
      });
  };
</script>

<div
  bind:this={popup}
  use:clickOutside
  on:click_outside={() => dispatch("clickOutside")}
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
  {#if selectedMessage?.id_User === MyStore.state.auth.user.id}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <p class="option" on:click={deleteMessage}>Supprimer le message</p>
  {/if}
  <a class="option" href="/{user?.username}" use:link>Voir le profil</a>
</div>

<style lang="scss">
  .popup {
    position: fixed;
    transition: all 0.3s cubic-bezier(0.61, 1, 0.88, 1);
    border-radius: 0.8rem;
    background-color: whitesmoke;
    border: #121212;
    overflow: hidden;

    &.up {
      border-bottom-left-radius: 0.2rem;
    }

    &.down {
      border-top-left-radius: 0.2rem;
    }
  }

  p,
  a {
    margin: 0;
    color: #121212;
    width: 100%;
    padding: 0.3rem 1rem;
  }

  .option {
    display: flex;
    cursor: pointer;
    font-size: 0.7rem;
    font-weight: bold;
    transition: all 0.3s cubic-bezier(0.61, 1, 0.88, 1);

    &:hover {
      background-color: rgb(211, 211, 211);
    }

    &:not(:last-child) {
      border-bottom: 1px solid #121212;
    }
  }
</style>
