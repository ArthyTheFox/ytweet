<script lang="ts">
  import { DateTime } from "luxon";
  import Utils from "../../script/utils";
  import type { Message, Position, User } from "../types";
  import ripple from "../../script/ripple";
  import { fly, slide } from "svelte/transition";
  import { quintOut, quintIn, quadOut } from "svelte/easing";
  import TextAreaAutosizeChat from "./TextAreaAutosizeChat.svelte";
  import ModaleUserProfil from "./ModaleUserProfil.svelte";
  import ModaleMessageMenu from "./ModaleMessageMenu.svelte";
  import MessageService from "../services/message.service";
  import { onMount } from "svelte";
  import MyStore from "../store";

  export let idConv: number;

  let messageService = MessageService;
  let y: number = 0;
  let chat: HTMLElement;
  let textValue = ``;
  let selectedMessage: number | null = null;
  let visibleMessageMenu: boolean = false;
  let menuPosition: Position = {
    x: 0,
    y: 0,
  };
  let load: boolean = false;

  let users: Array<User> = [];
  let messages: Array<Message> = [];

  onMount(() => {
    if (!load) getMessage();
  });

  $: if (idConv) {
    getMessage();
  }

  function getMessage() {
    load = true;
    messageService.getMessages(idConv).then((data) => {
      console.log(data);
      messages = data.message;
      users = data.user;
      messages = messages.map((message) => {
        message.user = users.find((u) => u.id === message.id_User);
        message.params = {};
        return message;
      });
      load = false;
    });
  }

  function isUserFromNextMessageSame(
    msgs: Array<Message>,
    index: number
  ): boolean {
    return index > 0 ? msgs[index - 1].id_User === msgs[index].id_User : true;
  }

  function isUserFromLastMessageSame(
    msgs: Array<Message>,
    index: number
  ): boolean {
    return (
      msgs[index + 1 < msgs.length ? index + 1 : index].id_User ===
      msgs[index].id_User
    );
  }

  function isAloneMessage(msgs: Array<Message>, index: number): boolean {
    if (index === 0)
      return (
        !isUserFromLastMessageSame(msgs, index) ||
        !Utils.sameDateFromStr(
          msgs[index].publishDate,
          msgs[index + 1].publishDate
        )
      );
    else if (index === msgs.length - 1)
      return (
        !isUserFromNextMessageSame(msgs, index) ||
        !Utils.sameDateFromStr(
          msgs[index].publishDate,
          msgs[index - 1].publishDate
        )
      );
    else if (
      !isUserFromLastMessageSame(msgs, index) ||
      !Utils.sameDateFromStr(
        msgs[index].publishDate,
        msgs[index + 1].publishDate
      )
    )
      return (
        !isUserFromNextMessageSame(msgs, index) ||
        !Utils.sameDateFromStr(
          msgs[index].publishDate,
          msgs[index - 1].publishDate
        )
      );
    else return false;
  }

  function isFirstMessage(msgs: Array<Message>, index: number): boolean {
    if (index === msgs.length - 1 || isAloneMessage(msgs, index)) return false;
    return (
      !isUserFromLastMessageSame(msgs, index) ||
      !Utils.sameDateFromStr(
        msgs[index].publishDate,
        msgs[index + 1].publishDate
      )
    );
  }

  function isMiddleMessage(msgs: Array<Message>, index: number): boolean {
    if (index === msgs.length - 1 || index === 0 || isAloneMessage(msgs, index))
      return false;
    return (
      isUserFromLastMessageSame(msgs, index) &&
      Utils.sameDateFromStr(
        msgs[index].publishDate,
        msgs[index + 1].publishDate
      ) &&
      isUserFromNextMessageSame(msgs, index) &&
      Utils.sameDateFromStr(
        msgs[index].publishDate,
        msgs[index - 1].publishDate
      )
    );
  }

  function isLastMessage(msgs: Array<Message>, index: number): boolean {
    if (isAloneMessage(msgs, index)) return false;
    else if (index === 0) return true;
    return (
      !isUserFromNextMessageSame(msgs, index) ||
      !Utils.sameDateFromStr(
        msgs[index].publishDate,
        msgs[index - 1].publishDate
      )
    );
  }

  function displayDate(index: number, message: Message) {
    let date: string = "";
    if (index === messages.length - 1 && 0 < index - 1) {
      if (
        !Utils.sameYearFromStr(
          message.publishDate,
          messages[index - 1].publishDate
        )
      ) {
        date = Utils.dateWithYearMessageFormat(
          DateTime.fromFormat(message.publishDate, Utils.dateFormat)
        );
      } else {
        date = Utils.dateMessageFormat(DateTime.fromFormat(message.publishDate, Utils.dateFormat));
      }
    } else if (index < messages.length - 1) {
      if (
        !Utils.sameYearFromStr(
          message.publishDate,
          messages[index + 1].publishDate
        )
      ) {
        date = Utils.dateWithYearMessageFormat(
          DateTime.fromFormat(message.publishDate, Utils.dateFormat)
        );
      } else if (
        !Utils.sameDayFromStr(
          message.publishDate,
          messages[index + 1].publishDate
        ) ||
        !Utils.sameMonthFromStr(
          message.publishDate,
          messages[index + 1].publishDate
        )
      ) {
        date = Utils.dateMessageFormat(DateTime.fromFormat(message.publishDate, Utils.dateFormat));
      }
    }
    if (date === "") return "";
    return `<p class="date">
            ${date}
        </p>`;
  }

  function scrollTo(msgId: number) {
    let msgElem = document.getElementById(String(msgId));
    msgElem.scrollIntoView({
      behavior: "smooth",
    });
  }

  function scrollToTop(toTop: boolean) {
    chat.scrollBy({
      top: toTop ? -chat.offsetHeight : chat.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  }

  function displayMessageDetail(index: number) {
    if (messages[index].params?.messageClicked)
      messages[index].params.messageClicked =
        !messages[index].params.messageClicked;
    else messages[index].params.messageClicked = true;
  }

  function DisplayMessageMenu(value?: boolean) {
    if (value === null || value === undefined)
      visibleMessageMenu = !visibleMessageMenu;
    visibleMessageMenu = value;
  }

  function displayContentMessage(msgId: number) {
    let mes = messages.find((m) => m.id === msgId);
    return "<b>@" + mes.user.username + "</b> " + mes.content;
  }

  function clickMessage(e: MouseEvent, i: number) {
    e.preventDefault();
    switch (e.button) {
      case 0: //Left button clicked
        DisplayMessageMenu(false);
        displayMessageDetail(i);
        break;
      case 1: //Middle button clicked
        DisplayMessageMenu(false);
        break;
      case 2: //Right button clicked
        console.log("Right button clicked");
        selectedMessage = i;
        menuPosition.x = e.clientX;
        menuPosition.y = e.clientY;
        DisplayMessageMenu(true);
        break;
    }
  }

  function handleClickOutside(event) {
    if (visibleMessageMenu) {
      console.log("outside");
      DisplayMessageMenu(false);
    }
    // alert('Click outside!');
  }

  function clickProfil(index: number) {
    if (messages[index].params?.profilClicked) {
      messages[index].params.copy = true;
      navigator.clipboard.writeText(messages[index].user.username);
      setTimeout(() => {
        messages[index].params.copy = false;
      }, 1500);
    } else {
      messages[index].params.profilClicked = true;
    }
  }

  function mouseMoveValue(event: MouseEvent) {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }

  function addMessage() {
    if (textValue.trim() !== "") {
      let newMessage = {
        id_conversation: idConv,
        id_user: MyStore.state.auth.user.id,
        content: textValue.trim(),
        pathMediaMessage: null,
      };
      console.log(newMessage);
      messageService.sendMessage(newMessage).then(() => {
        getMessage();
      });
      //   messages = [newMessage, ...messages];
      textValue = ``;
    }
  }
</script>

<div class="relative flex h-full w-9/12 flex-col border-l border-main">
  <div
    class="relative flex h-[calc(100%-50px)] w-full justify-center text-white"
  >
    {#if chat && chat.offsetHeight + y < chat.scrollHeight - 100}
      <div
        in:fly={{
          duration: 300,
          y: 50,
          opacity: 0.5,
          easing: quintOut,
        }}
        out:fly={{
          duration: 300,
          y: 50,
          opacity: 0.5,
          easing: quintIn,
        }}
        use:ripple={{ opacity: "0.2", color: "#fff" }}
        class="absolute top-[3%] arrow-button"
        on:click={() => scrollToTop(true)}
        on:keydown={() => scrollToTop(true)}
      >
        <ion-icon name="arrow-up-outline" />
      </div>
    {/if}
    <div
      class="relative h-full w-full overflow-y-scroll flex flex-col-reverse chat"
      bind:this={chat}
      on:scroll={() => (y = Math.abs(chat.scrollTop))}
    >
      {#each messages as message, i}
        {#key i !== 0 || message.publishDate}
          <div id={String(message.id)} class="w-full flex flex-col">
            {@html displayDate(i, message)}
            <div
              class="{message.id_User === MyStore.state.auth.user.id
                ? 'ctnMyMess'
                : 'ctnOtherMess'} w-full flex"
              in:fly={{
                duration: 300,
                y: 30,
                easing: quadOut,
              }}
            >
              <div
                class:lastMessFromUser={!isUserFromNextMessageSame(messages, i)}
                class="flex flex-col my-0.5"
              >
                {#if message.responseMess}
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <div
                    class="flex cursor-pointer opacity-70 {message.id_User ===
                    MyStore.state.auth.user.id
                      ? 'flex-row-reverse'
                      : 'flex-row'}"
                    on:click={() => scrollTo(message.responseMess)}
                  >
                    <div
                      class="w-[30px] mx-[5px] flex justify-center items-center"
                    >
                      <ion-icon name="arrow-redo-outline" />
                    </div>
                    <div class="flex flex-1">
                      <p class="cursor-pointer line-clamp-1">
                        {@html displayContentMessage(message.responseMess)}
                      </p>
                    </div>
                  </div>
                {/if}
                <div class="flex">
                  {#if message.id_User !== MyStore.state.auth.user.id}
                    {#if isAloneMessage(messages, i) || isFirstMessage(messages, i)}
                      <div
                        class="userPP"
                        on:click={() => clickProfil(i)}
                        on:keydown={() => clickProfil(i)}
                        on:mousemove={(e) =>
                          (message.params.positionPopup = mouseMoveValue(e))}
                        on:mouseleave={() =>
                          (message.params.profilClicked = false)}
                      >
                        <img
                          src={message.params?.copy
                            ? "images/clipboard.png"
                            : Utils.imageUser(message.user)}
                          alt="user profil pic"
                          class="border select-none"
                          style="border-color: #{Utils.stringToColour(
                            Utils.formatUser(message.user)
                          )}"
                        />
                        {#if message.params?.profilClicked}
                          <ModaleUserProfil
                            user={message.user}
                            position={message.params.positionPopup}
                            copy={message.params.copy}
                            chatY={chat.getBoundingClientRect().top}
                          />
                        {/if}
                      </div>
                    {:else}
                      <div class="userPP empty" />
                    {/if}
                  {/if}
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <p
                    class:aloneMess={isAloneMessage(messages, i)}
                    class:firstMess={isFirstMessage(messages, i)}
                    class:middleMess={isMiddleMessage(messages, i)}
                    class:lastMess={isLastMessage(messages, i)}
                    class="{message.id_User === MyStore.state.auth.user.id
                      ? 'messMeBG messMe'
                      : 'messOtherBG messOther'}
                                flex whitespace-pre-line shrink w-fit py-2 px-3 text-base"
                    on:click={(e) => clickMessage(e, i)}
                    on:contextmenu={(e) => clickMessage(e, i)}
                    on:blur={(e) => DisplayMessageMenu(false)}
                  >
                    {message.content}
                  </p>
                </div>
                {#if message.params?.messageClicked}
                  <div
                    class="{message.id_User === MyStore.state.auth.user.id
                      ? 'self-start'
                      : 'self-end'} px-[10%]"
                    transition:slide={{
                      duration: 250,
                      easing: quadOut,
                    }}
                  >
                    <p>
                      {Utils.timeFormat(DateTime.fromFormat(message.publishDate, Utils.dateFormat))}
                    </p>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        {/key}
      {/each}
      {#if visibleMessageMenu}
        <ModaleMessageMenu
          on:clickOutside={handleClickOutside}
          position={menuPosition}
          selectedMessage={messages.find((m) => m.id === selectedMessage)}
        />
      {/if}
    </div>
    {#if y > 100}
      <div
        in:fly={{
          duration: 300,
          y: -50,
          opacity: 0.5,
          easing: quintOut,
        }}
        out:fly={{
          duration: 300,
          y: -50,
          opacity: 0.5,
          easing: quintIn,
        }}
        class="absolute bottom-[3%] arrow-button"
        use:ripple={{ opacity: "0.2", color: "#fff" }}
        on:click={() => scrollToTop(false)}
        on:keydown={() => scrollToTop(false)}
      >
        <ion-icon name="arrow-down-outline" />
      </div>
    {/if}
  </div>
  <div class="flex h-[50px] w-full justify-between items-end p-1 z-10">
    <div class="flex h-full px-2 justify-center items-center min-w-[3.5rem]">
      <div
        class="send-button"
        use:ripple={{ opacity: "0.2", color: "#fff" }}
        on:click={() => addMessage()}
        on:keydown={() => addMessage()}
      >
        <ion-icon class="w-8 text-white" name="arrow-up-outline" />
      </div>
    </div>
    <div class="flex h-full overflow-hidden w-full">
      <TextAreaAutosizeChat
        bind:value={textValue}
        minRows={1}
        maxRows={6}
        {addMessage}
      />
    </div>
  </div>
</div>

<style lang="scss">
  .chat {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .chat::-webkit-scrollbar {
    display: none;
  }

  .arrow-button {
    z-index: 1;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    border-width: 1px;
    border-style: solid;
    border-color: #25232e;
    cursor: pointer;
    background-color: #121212;
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);

    &:hover {
      background-color: #23b2a4;
    }
  }
  .send-button {
    position: absolute;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    border-width: 2px;
    border-style: solid;
    border-color: #626666;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);

    &:hover {
      border-color: #23b2a4;
      background-color: #25232e;
    }
  }

  :global(.date) {
    text-align: center;
    margin: 0.5rem 0;
  }

  .userPP {
    padding: 5px;

    &.empty {
      margin: 5px;
      min-width: 30px;
      max-height: 30px;
    }

    img {
      border-radius: 50%;
      min-width: 30px;
      max-height: 30px;
    }
  }

  .ctnMyMess {
    justify-content: flex-end;
    padding-left: 60%;
  }

  .messMeBG {
    background-color: #23b2a4;
  }

  .messMe {
    border-bottom-left-radius: 1.25rem;
    border-top-left-radius: 1.25rem;

    &.aloneMess {
      border-top-right-radius: 1.25rem;
      border-bottom-right-radius: 1.25rem;
    }

    &.firstMess {
      border-top-right-radius: 1.25rem;
      border-bottom-right-radius: 0.35rem;
    }

    &.middleMess {
      border-top-right-radius: 0.35rem;
      border-bottom-right-radius: 0.35rem;
    }

    &.lastMess {
      border-top-right-radius: 0.35rem;
      border-bottom-right-radius: 1.25rem;
    }
  }

  .ctnOtherMess {
    justify-content: flex-start;
    padding-right: 60%;
  }

  .messOtherBG {
    background-color: #626666;
  }

  .messOther {
    border-bottom-right-radius: 1.25rem;
    border-top-right-radius: 1.25rem;

    &.aloneMess {
      border-top-left-radius: 1.25rem;
      border-bottom-left-radius: 1.25rem;
    }

    &.firstMess {
      border-top-left-radius: 1.25rem;
      border-bottom-left-radius: 0.35rem;
    }

    &.middleMess {
      border-top-left-radius: 0.35rem;
      border-bottom-left-radius: 0.35rem;
    }

    &.lastMess {
      border-top-left-radius: 0.35rem;
      border-bottom-left-radius: 1.25rem;
    }
  }

  .lastMessFromUser {
    margin-bottom: 1rem;
  }

  @media (max-width: 1000px) {
    .ctnMyMess {
      padding-left: 30%;
    }

    .ctnOtherMess {
      padding-right: 30%;
    }
  }
</style>
