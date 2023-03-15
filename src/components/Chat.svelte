<script lang="ts">
    import { DateTime } from "luxon";
    import Utils from "../../script/utils";
    import type { Message, Position, UserMessage } from "../types";
    import ripple from "../../script/ripple";
    import { fly, slide } from "svelte/transition";
    import { quintOut, quintIn, quadOut } from "svelte/easing";
    import TextAreaAutosizeChat from "./TextAreaAutosizeChat.svelte";
    import ModaleUserProfil from "./ModaleUserProfil.svelte";
    import ModaleMessageMenu from "./ModaleMessageMenu.svelte";
    import { clickOutside } from "../../script/clickOutside";

    let currentUser: UserMessage = {
        idUser: 12,
        email: "pierre.colin@ynov.com",
        pseudo: "HellyGelly",
        lastname: "Colin",
        firstname: "Pierre",
        faculty: {
            idFaculty: 1,
            nameFaculty: "Informatique Dev Web",
        },
    };

    const Pierre: UserMessage = {
        idUser: 12,
        email: "pierre.colin@ynov.com",
        pseudo: "HellyGelly",
        lastname: "Colin",
        firstname: "Pierre",
        faculty: {
            idFaculty: 1,
            nameFaculty: "Informatique Dev Web",
        },
    };
    const Armand: UserMessage = {
        idUser: 10,
        email: "armand.houpin@ynov.com",
        pseudo: "Gafy33",
        lastname: "Houpin",
        firstname: "Armand",
        faculty: {
            idFaculty: 1,
            nameFaculty: "Informatique Dev Web",
        },
    };
    const Didier: UserMessage = {
        idUser: 16,
        email: "didier.raoult@ynov.com",
        pseudo: "le King",
        lastname: "Raoult",
        firstname: "Didier",
        faculty: {
            idFaculty: 3,
            nameFaculty: "Santé",
        },
    };

    let y: number = 0;
    let chat: HTMLElement;
    let textValue = ``;
    let selectedMessage: number | null = null;
    let visibleMessageMenu: boolean = false;
    let menuPosition: Position = {
        x: 0,
        y: 0,
    }
    
    let messages: Array<Message> = [
        {
            id: 0,
            userSend: Didier,
            userReceive: Armand,
            content: "du surf ?",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-18T09:57:20.001Z",
            params: {},
        },
        {
            id: 1,
            userSend: Pierre,
            userReceive: Armand,
            content: "yo on fait quoi ?",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-18T09:56:20.001Z",
            params: {},
        },
        {
            id: 2,
            userSend: Pierre,
            userReceive: Armand,
            content: "ouais ouais ouais",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-17T09:56:20.001Z",
            params: {},
        },
        {
            id: 3,
            userSend: Armand,
            userReceive: Pierre,
            content: "petit bonjour du lendemain",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-17T09:34:13.001Z",
            params: {},
        },
        {
            id: 4,
            userSend: Armand,
            userReceive: Pierre,
            content: "test triple message",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:45:38.001Z",
            params: {},
        },
        {
            id: 5,
            userSend: Armand,
            userReceive: Pierre,
            content: `j'écris un pavé de texte pour tester l'alignement et le bon retour à la ligne du texte d'un message d'un utilisateur`,
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:45:25.001Z",
            params: {},
        },
        {
            id: 6,
            userSend: Armand,
            userReceive: Pierre,
            content: "je vais voir mes parents",
            pathMediaMess: null,
            responseMess: 11,
            view: true,
            publishDate: "2022-11-16T14:45:02.001Z",
            params: {},
        },
        {
            id: 7,
            userSend: Pierre,
            userReceive: Armand,
            content: "et toi ?",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:44:45.001Z",
            params: {},
        },
        {
            id: 8,
            userSend: Pierre,
            userReceive: Armand,
            content: "et on va faire du camping",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:44:45.001Z",
            params: {},
        },
        {
            id: 9,
            userSend: Pierre,
            userReceive: Armand,
            content: "du surf avec des potes",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:44:36.001Z",
            params: {},
        },
        {
            id: 10,
            userSend: Armand,
            userReceive: Pierre,
            content: "tu fais quoi ce week-end ?",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:44:21.001Z",
            params: {},
        },
        {
            id: 11,
            userSend: Pierre,
            userReceive: Armand,
            content: "salut Jean-Last",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:43:36.001Z",
            params: {},
        },
        {
            id: 12,
            userSend: Armand,
            userReceive: Pierre,
            content: "bonjour Jaqueline",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2021-10-24T11:51:31.001Z",
            params: {},
        },
    ];

    function isUserFromNextMessageSame(
        msgs: Array<Message>,
        index: number
    ): boolean {
        return index > 0
            ? msgs[index - 1].userSend.idUser === msgs[index].userSend.idUser
            : true;
    }

    function isUserFromLastMessageSame(
        msgs: Array<Message>,
        index: number
    ): boolean {
        return (
            msgs[index + 1 < msgs.length ? index + 1 : index].userSend
                .idUser === msgs[index].userSend.idUser
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
        if (index === msgs.length - 1 || isAloneMessage(msgs, index))
            return false;
        return (
            !isUserFromLastMessageSame(msgs, index) ||
            !Utils.sameDateFromStr(
                msgs[index].publishDate,
                msgs[index + 1].publishDate
            )
        );
    }

    function isMiddleMessage(msgs: Array<Message>, index: number): boolean {
        if (
            index === msgs.length - 1 ||
            index === 0 ||
            isAloneMessage(msgs, index)
        )
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
                    DateTime.fromISO(message.publishDate)
                );
            } else {
                date = Utils.dateMessageFormat(
                    DateTime.fromISO(message.publishDate)
                );
            }
        } else if (index < messages.length - 1) {
            if (
                !Utils.sameYearFromStr(
                    message.publishDate,
                    messages[index + 1].publishDate
                )
            ) {
                date = Utils.dateWithYearMessageFormat(
                    DateTime.fromISO(message.publishDate)
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
                date = Utils.dateMessageFormat(
                    DateTime.fromISO(message.publishDate)
                );
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
        if (value === null || value === undefined) visibleMessageMenu = !visibleMessageMenu;
        visibleMessageMenu = value;
    }

    function displayContentMessage(msgId: number) {
        let mes = messages.find((m) => m.id === msgId);
        return '<b>@' + mes.userSend.pseudo + '</b> ' + mes.content;
    }

    function clickMessage(e: MouseEvent, i: number) {
        e.preventDefault();
        switch (e.button) {
            case 0: //Left button clicked
                DisplayMessageMenu(false);
                displayMessageDetail(i)
                break;
            case 1: //Middle button clicked
                DisplayMessageMenu(false);
                break;
            case 2: //Right button clicked
                console.log("Right button clicked")
                selectedMessage = i;
                menuPosition.x = e.clientX;
                menuPosition.y = e.clientY;
                DisplayMessageMenu(true);
                break;
        }
    }

    function handleClickOutside(event) {
        if (visibleMessageMenu) {
            console.log("outside")
            DisplayMessageMenu(false);
        }
		// alert('Click outside!');
	}

    function clickProfil(index: number) {
        if (messages[index].params?.profilClicked) {
            messages[index].params.copy = true;
            navigator.clipboard.writeText(messages[index].userSend.pseudo);
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
            let newMessage: Message = {
                id: messages[0].id + 1,
                userSend: currentUser,
                userReceive: Armand,
                content: textValue.trim(),
                pathMediaMess: null,
                responseMess: selectedMessage,
                view: true,
                publishDate: DateTime.now().toISO(),
                params: {},
            };
            messages = [newMessage, ...messages];
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
                            class="{message.userSend.idUser ===
                            currentUser.idUser
                                ? 'ctnMyMess'
                                : 'ctnOtherMess'} w-full flex"
                            in:fly={{
                                duration: 300,
                                y: 30,
                                easing: quadOut,
                            }}
                        >
                            <div
                                class:lastMessFromUser={!isUserFromNextMessageSame(
                                    messages,
                                    i
                                )}
                                class="flex flex-col my-0.5"
                            >
                            {#if message.responseMess}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <div class="flex cursor-pointer opacity-70 {message.userSend.idUser ===
                                    currentUser.idUser ? 'flex-row-reverse' : 'flex-row'}"
                                    on:click={() => scrollTo(message.responseMess)}>
                                    <div class="w-[30px] mx-[5px] flex justify-center items-center">
                                        <ion-icon name="arrow-redo-outline" />
                                    </div>
                                    <div class="flex flex-1">
                                        <p class="cursor-pointer line-clamp-1" >{@html displayContentMessage(message.responseMess)}</p>
                                    </div>
                                </div>
                            {/if}
                                <div class="flex">
                                    {#if message.userSend.idUser !== currentUser.idUser}
                                        {#if isAloneMessage(messages, i) || isFirstMessage(messages, i)}
                                            <div
                                                class="userPP"
                                                on:click={() => clickProfil(i)}
                                                on:keydown={() =>
                                                    clickProfil(i)}
                                                on:mousemove={(e) =>
                                                    (message.params.positionPopup =
                                                        mouseMoveValue(e))}
                                                on:mouseleave={() =>
                                                    (message.params.profilClicked = false)}
                                            >
                                                <img
                                                    src={message.params.copy
                                                        ? "images/clipboard.png"
                                                        : Utils.imageUser(
                                                              message.userSend
                                                          )}
                                                    alt="user profil pic"
                                                    class="border select-none"
                                                    style="border-color: #{Utils.stringToColour(
                                                        Utils.formatUser(
                                                            message.userSend
                                                        )
                                                    )}"
                                                />
                                                {#if message.params?.profilClicked}
                                                    <ModaleUserProfil
                                                        user={message.userSend}
                                                        position={message.params
                                                            .positionPopup}
                                                        copy={message.params
                                                            .copy}
                                                        chatY={chat.getBoundingClientRect()
                                                            .top}
                                                    />
                                                {/if}
                                            </div>
                                        {:else}
                                            <div class="userPP empty" />
                                        {/if}
                                    {/if}
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <p
                                        class:aloneMess={isAloneMessage(
                                            messages,
                                            i
                                        )}
                                        class:firstMess={isFirstMessage(
                                            messages,
                                            i
                                        )}
                                        class:middleMess={isMiddleMessage(
                                            messages,
                                            i
                                        )}
                                        class:lastMess={isLastMessage(
                                            messages,
                                            i
                                        )}
                                        class="{message.userSend.idUser ===
                                        currentUser.idUser
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
                                        class="{message.userSend.idUser ===
                                        currentUser.idUser
                                            ? 'self-start'
                                            : 'self-end'} px-[10%]"
                                        transition:slide={{
                                            duration: 250,
                                            easing: quadOut,
                                        }}
                                    >
                                        <p>
                                            {Utils.timeFormat(
                                                DateTime.fromISO(
                                                    message.publishDate
                                                )
                                            )}
                                        </p>
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </div>
                {/key}
            {/each}
            {#if visibleMessageMenu}
                <ModaleMessageMenu on:clickOutside={handleClickOutside} position={menuPosition} selectedMessage={messages.find(m => m.id === selectedMessage)} />
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
        <div
            class="flex h-full px-2 justify-center items-center min-w-[3.5rem]"
        >
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
