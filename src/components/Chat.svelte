<script lang="ts">
    import { DateTime } from "luxon";
    import Utils from "../../script/utils";
    import type { Message, UserMessage } from "../types";
    import ripple from "../../script/ripple";
    import { fly, slide } from "svelte/transition";
    import { quintOut, quintIn, quadOut } from "svelte/easing";
    import TextAreaAutosizeChat from "./TextAreaAutosizeChat.svelte";

    let currentUser: UserMessage = {
        idUser: 12,
        lastname: "Colin",
        firstname: "Pierre",
    };

    let y: number = 0;
    let chat: any;
    let textValue = ``;
    let messages: Array<Message> = [
        {
            userSend: { idUser: 16, lastname: "Raoult", firstname: "Didier" },
            userReceive: {
                idUser: 10,
                lastname: "Houpin",
                firstname: "Armand",
            },
            content: "du surf ?",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-18T09:57:20.001Z",
        },
        {
            userSend: { idUser: 12, lastname: "Colin", firstname: "Pierre" },
            userReceive: {
                idUser: 10,
                lastname: "Houpin",
                firstname: "Armand",
            },
            content: "yo on fait quoi ?",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-18T09:56:20.001Z",
        },
        {
            userSend: { idUser: 12, lastname: "Colin", firstname: "Pierre" },
            userReceive: {
                idUser: 10,
                lastname: "Houpin",
                firstname: "Armand",
            },
            content: "ouais ouais ouais",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-17T09:56:20.001Z",
        },
        {
            userSend: { idUser: 10, lastname: "Houpin", firstname: "Armand" },
            userReceive: { idUser: 12, lastname: "Colin", firstname: "Pierre" },
            content: "petit bonjour du lendemain",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-17T09:34:13.001Z",
        },
        {
            userSend: { idUser: 10, lastname: "Houpin", firstname: "Armand" },
            userReceive: { idUser: 12, lastname: "Colin", firstname: "Pierre" },
            content: "test triple message",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:45:38.001Z",
        },
        {
            userSend: { idUser: 10, lastname: "Houpin", firstname: "Armand" },
            userReceive: { idUser: 12, lastname: "Colin", firstname: "Pierre" },
            content: `j'écris un pavé de texte pour tester l'alignement et le bon retour à la ligne du texte d'un message d'un utilisateur`,
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:45:25.001Z",
        },
        {
            userSend: { idUser: 10, lastname: "Houpin", firstname: "Armand" },
            userReceive: { idUser: 12, lastname: "Colin", firstname: "Pierre" },
            content: "je vais voir mes parents",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:45:02.001Z",
        },
        {
            userSend: { idUser: 12, lastname: "Colin", firstname: "Pierre" },
            userReceive: {
                idUser: 10,
                lastname: "Houpin",
                firstname: "Armand",
            },
            content: "et toi ?",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:44:45.001Z",
        },
        {
            userSend: { idUser: 12, lastname: "Colin", firstname: "Pierre" },
            userReceive: {
                idUser: 10,
                lastname: "Houpin",
                firstname: "Armand",
            },
            content: "et on va faire du camping",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:44:45.001Z",
        },
        {
            userSend: { idUser: 12, lastname: "Colin", firstname: "Pierre" },
            userReceive: {
                idUser: 10,
                lastname: "Houpin",
                firstname: "Armand",
            },
            content: "du surf avec des potes",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:44:36.001Z",
        },
        {
            userSend: { idUser: 10, lastname: "Houpin", firstname: "Armand" },
            userReceive: { idUser: 12, lastname: "Colin", firstname: "Pierre" },
            content: "tu fais quoi ce week-end ?",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:44:21.001Z",
        },
        {
            userSend: { idUser: 12, lastname: "Colin", firstname: "Pierre" },
            userReceive: {
                idUser: 10,
                lastname: "Houpin",
                firstname: "Armand",
            },
            content: "salut Jean-Last",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:43:36.001Z",
        },
        {
            userSend: { idUser: 10, lastname: "Houpin", firstname: "Armand" },
            userReceive: { idUser: 12, lastname: "Colin", firstname: "Pierre" },
            content: "bonjour Jaqueline",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2021-10-24T11:51:31.001Z",
        },
    ];
    let messageClicked: Array<Boolean> = new Array(messages.length).fill(false);

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

    function scrollTo(toTop: boolean) {
        chat.scrollBy({
            top: toTop ? -chat.offsetHeight : chat.offsetHeight,
            left: 0,
            behavior: "smooth",
        });
    }

    function addMessage() {
        // console.log(DateTime.now().toSQL());
        if (textValue.trim() !== "") {
            let newMessage: Message = {
                userSend: {
                    idUser: currentUser.idUser,
                    lastname: currentUser.lastname,
                    firstname: currentUser.firstname,
                },
                userReceive: {
                    idUser: 10,
                    lastname: "Houpin",
                    firstname: "Armand",
                },
                content: textValue.trim(),
                pathMediaMess: null,
                responseMess: null,
                view: true,
                publishDate: DateTime.now().toISO(),
            };
            messages = [newMessage, ...messages];
            messageClicked = [false, ...messageClicked];
            textValue = ``;
        }
    }
</script>

<div class="relative flex h-full w-full flex-col">
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
                on:click={() => scrollTo(true)}
                on:keydown={() => scrollTo(true)}
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
                {#key i !== 0 || message}
                    <div class="w-full flex flex-col">
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
                                <div class="flex">
                                    {#if message.userSend.idUser !== currentUser.idUser}
                                        {#if isAloneMessage(messages, i) || isFirstMessage(messages, i)}
                                            <img
                                                src={Utils.imageUser(
                                                    message.userSend
                                                )}
                                                alt="user profil pic"
                                                class="userPP border select-none"
                                                style="border-color: #{Utils.stringToColour(
                                                    Utils.formatUser(
                                                        message.userSend
                                                    )
                                                )}"
                                                on:click={() => console.log("user profil")}
                                                on:keydown={() => console.log("user profil")}
                                            />
                                        {:else}
                                            <div class="userPP" />
                                        {/if}
                                    {/if}
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
                                        on:click={() =>
                                            (messageClicked[i] =
                                                !messageClicked[i])}
                                        on:keydown={() =>
                                            (messageClicked[i] =
                                                !messageClicked[i])}
                                    >
                                        {message.content}
                                    </p>
                                </div>
                                {#if messageClicked[i]}
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
                on:click={() => scrollTo(false)}
                on:keydown={() => scrollTo(false)}
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
        min-width: 30px;
        max-height: 30px;
        border-radius: 50%;
        margin: auto 5px;
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
