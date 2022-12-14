<script lang="ts">
    import { DateTime } from "luxon";
    import Utils from "../../script/utils";
    import type { Message, UserMessage } from "../types";
    import ripple from "../../script/ripple";
    import { fly } from "svelte/transition";
    import { quintOut, quintIn } from "svelte/easing";

    let currentUserId: number = 10;

    let y: number;
    let chat: any;

    let messages: Array<Message> = [
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

    function isUserFromNextMessageSame(
        msgs: Array<Message>,
        index: number
    ): boolean {
        return (
            msgs[index - 1 >= 0 ? index - 1 : index].userSend.idUser ===
            msgs[index].userSend.idUser
        );
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
            isUserFromLastMessageSame(msgs, index) ||
            (!Utils.sameDateFromStr(
                msgs[index].publishDate,
                msgs[index + 1].publishDate
            ) &&
                isUserFromNextMessageSame(msgs, index)) ||
            !Utils.sameDateFromStr(
                msgs[index].publishDate,
                msgs[index - 1].publishDate
            )
        );
    }

    function isLastMessage(msgs: Array<Message>, index: number): boolean {
        if (index === 0 || isAloneMessage(msgs, index)) return false;
        return (
            !isUserFromNextMessageSame(msgs, index) ||
            !Utils.sameDateFromStr(
                msgs[index].publishDate,
                msgs[index - 1].publishDate
            )
        );
    }
</script>

<div
    class="relative h-full w-full flex justify-center text-white border-4 border-white"
>
    {#if chat && chat.offsetHeight + y < chat.scrollHeight - 100}
        <div
            in:fly={{ duration: 300, y: 50, opacity: 0.5, easing: quintOut }}
            out:fly={{ duration: 300, y: 50, opacity: 0.5, easing: quintIn }}
            use:ripple
            class="absolute top-[3%] arrow-button"
        >
            <ion-icon name="arrow-up-outline" />
        </div>
    {/if}
    <div
        class="h-full w-full overflow-y-scroll flex flex-col-reverse chat"
        bind:this={chat}
        on:scroll={() => (y = Math.abs(chat.scrollTop))}
    >
        {#each messages as message, i}
            <div class="w-full flex flex-col">
                {#if i === messages.length - 1 && 0 < i - 1 && !Utils.sameYearFromStr(message.publishDate, messages[i - 1].publishDate)}
                    <p class="date">
                        {Utils.dateWithYearMessageFormat(
                            DateTime.fromISO(message.publishDate)
                        )}
                    </p>
                {:else if i === messages.length - 1 && 0 < i - 1}
                    <p class="date">
                        {Utils.dateWithHourMessageFormat(
                            DateTime.fromISO(message.publishDate)
                        )}
                    </p>
                {/if}
                {#if i < messages.length - 1 && !Utils.sameYearFromStr(message.publishDate, messages[i + 1].publishDate)}
                    <p class="date">
                        {Utils.dateWithYearMessageFormat(
                            DateTime.fromISO(message.publishDate)
                        )}
                    </p>
                {:else if i < messages.length - 1 && (!Utils.sameDayFromStr(message.publishDate, messages[i + 1].publishDate) || !Utils.sameMonthFromStr(message.publishDate, messages[i + 1].publishDate))}
                    <p class="date">
                        {Utils.dateWithHourMessageFormat(
                            DateTime.fromISO(message.publishDate)
                        )}
                    </p>
                {/if}
                <div
                    class="{message.userSend.idUser === currentUserId
                        ? 'ctnMyMess'
                        : 'ctnOtherMess'} w-full flex"
                >
                    <div
                        class:lastMessFromUser={!isUserFromNextMessageSame(
                            messages,
                            i
                        )}
                        class="flex my-0.5"
                    >
                        {#if message.userSend.idUser !== currentUserId}
                            {#if isAloneMessage(messages, i) || isFirstMessage(messages, i)}
                                <img
                                    src={Utils.imageUser(message.userSend)}
                                    alt="user profil picture"
                                    class="userPP {Utils.borderClass(
                                        message.userSend
                                    )}"
                                />
                            {:else}
                                <div class="userPP" />
                            {/if}
                        {/if}
                        <p
                            class:aloneMess={isAloneMessage(messages, i)}
                            class:firstMess={isFirstMessage(messages, i)}
                            class:middleMess={isMiddleMessage(messages, i)}
                            class:lastMess={isLastMessage(messages, i)}
                            class="{message.userSend.idUser === currentUserId
                                ? 'messMeBG messMe'
                                : 'messOtherBG messOther'}
                            flex whitespace-pre-line shrink w-fit py-2 px-3 text-base"
                        >
                            {message.content}
                        </p>
                    </div>
                </div>
            </div>
        {/each}
    </div>
    {#if y > 100}
        <div
            in:fly={{ duration: 300, y: -50, opacity: 0.5, easing: quintOut }}
            out:fly={{ duration: 300, y: -50, opacity: 0.5, easing: quintIn }}
            use:ripple
            class="absolute bottom-[3%] arrow-button"
        >
            <ion-icon name="arrow-down-outline" />
        </div>
    {/if}
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
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        border: 1px solid #25232e;
        cursor: pointer;
        background-color: #121212;
        transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);

        &:hover {
            background-color: #23b2a4;
        }
    }

    .date {
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
