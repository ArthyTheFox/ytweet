<script lang="ts">
    import { DateTime } from "luxon";

    let currentUserId: number = 10;

    let messages: Array<any> = [
        {
            idUser1: 12,
            idUser2: 10,
            content: "yo on fait quoi ?",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-18T09:56:20.001Z",
        },
        {
            idUser1: 12,
            idUser2: 10,
            content: "ouais ouais ouais",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-17T09:56:20.001Z",
        },
        {
            idUser1: 10,
            idUser2: 12,
            content: "petit bonjour du lendemain",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-17T09:34:13.001Z",
        },
        {
            idUser1: 10,
            idUser2: 12,
            content: "test triple message",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:45:38.001Z",
        },
        {
            idUser1: 10,
            idUser2: 12,
            content: `j'écris un pavé de texte pour tester l'alignement et le bon retour à la ligne du texte d'un message d'un utilisateur`,
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:45:25.001Z",
        },
        {
            idUser1: 10,
            idUser2: 12,
            content: "je vais voir mes parents",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:45:02.001Z",
        },
        {
            idUser1: 12,
            idUser2: 10,
            content: "et toi ?",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:44:45.001Z",
        },
        {
            idUser1: 12,
            idUser2: 10,
            content: "et on va faire du camping",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:44:45.001Z",
        },
        {
            idUser1: 12,
            idUser2: 10,
            content: "du surf avec des potes",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:44:36.001Z",
        },
        {
            idUser1: 10,
            idUser2: 12,
            content: "tu fais quoi ce week-end ?",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:44:21.001Z",
        },
        {
            idUser1: 12,
            idUser2: 10,
            content: "salut Jean-Last",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2022-11-16T14:43:36.001Z",
        },
        {
            idUser1: 10,
            idUser2: 12,
            content: "bonjour Jaqueline",
            pathMediaMess: null,
            responseMess: null,
            view: true,
            publishDate: "2021-10-24T11:51:31.001Z",
        },
    ];

    function dateWithYearFormat(date: DateTime): string {
        return date.toFormat("d MMMM y, HH:mm");
    }

    function dateWithHourFormat(date: DateTime): string {
        return date.toFormat("d MMMM, HH:mm");
    }

    function sameDate(dateMessage1: string, dateMessage2: string): boolean {
        return (
            sameDay(dateMessage1, dateMessage2) &&
            sameMonth(dateMessage1, dateMessage2) &&
            sameYear(dateMessage1, dateMessage2)
        );
    }

    function sameDay(dateMessage1: string, dateMessage2: string): boolean {
        return (
            DateTime.fromISO(dateMessage1).day ===
            DateTime.fromISO(dateMessage2).day
        );
    }

    function sameMonth(dateMessage1: string, dateMessage2: string): boolean {
        return (
            DateTime.fromISO(dateMessage1).month ===
            DateTime.fromISO(dateMessage2).month
        );
    }

    function sameYear(dateMessage1: string, dateMessage2: string): boolean {
        return (
            DateTime.fromISO(dateMessage1).year ===
            DateTime.fromISO(dateMessage2).year
        );
    }

    function isUserFromNextMessageSame(
        msgs: Array<any>,
        index: number
    ): boolean {
        return (
            msgs[index - 1 >= 0 ? index - 1 : index].idUser1 ===
            msgs[index].idUser1
        );
    }

    function isUserFromLastMessageSame(
        msgs: Array<any>,
        index: number
    ): boolean {
        return (
            msgs[index + 1 < msgs.length ? index + 1 : index].idUser1 ===
            msgs[index].idUser1
        );
    }

    function isAloneMessage(msgs: Array<any>, index: number): boolean {
        if (index === 0)
            return (
                !isUserFromLastMessageSame(msgs, index) ||
                !sameDate(msgs[index].publishDate, msgs[index + 1].publishDate)
            );
        else if (index === msgs.length - 1)
            return (
                !isUserFromNextMessageSame(msgs, index) ||
                !sameDate(msgs[index].publishDate, msgs[index - 1].publishDate)
            );
        else if (
            !isUserFromLastMessageSame(msgs, index) ||
            !sameDate(msgs[index].publishDate, msgs[index + 1].publishDate)
        )
            return (
                !isUserFromNextMessageSame(msgs, index) ||
                !sameDate(msgs[index].publishDate, msgs[index - 1].publishDate)
            );
        else return false;
    }

    function isFirstMessage(msgs: Array<any>, index: number): boolean {
        if (index === msgs.length - 1 || isAloneMessage(msgs, index))
            return false;
        return (
            !isUserFromLastMessageSame(msgs, index) ||
            !sameDate(msgs[index].publishDate, msgs[index + 1].publishDate)
        );
    }

    function isMiddleMessage(msgs: Array<any>, index: number): boolean {
        if (
            index === msgs.length - 1 ||
            index === 0 ||
            isAloneMessage(msgs, index)
        )
            return false;
        return (
            isUserFromLastMessageSame(msgs, index) ||
            (!sameDate(msgs[index].publishDate, msgs[index + 1].publishDate) &&
                isUserFromNextMessageSame(msgs, index)) ||
            !sameDate(msgs[index].publishDate, msgs[index - 1].publishDate)
        );
    }

    function isLastMessage(msgs: Array<any>, index: number): boolean {
        if (index === 0 || isAloneMessage(msgs, index)) return false;
        return (
            !isUserFromNextMessageSame(msgs, index) ||
            !sameDate(msgs[index].publishDate, msgs[index - 1].publishDate)
        );
    }
</script>

<div class="h-full w-full bg-white overflow-y-scroll flex flex-col-reverse">
    {#each messages as message, i}
        <div class="w-full flex flex-col">
            {#if i === messages.length - 1 && 0 < i - 1 && !sameYear(message.publishDate, messages[i - 1].publishDate)}
                <p class="date">
                    {dateWithYearFormat(DateTime.fromISO(message.publishDate))}
                </p>
            {:else if i === messages.length - 1 && 0 < i - 1}
                <p class="date">
                    {dateWithHourFormat(DateTime.fromISO(message.publishDate))}
                </p>
            {/if}
            {#if i < messages.length - 1 && !sameYear(message.publishDate, messages[i + 1].publishDate)}
                <p class="date">
                    {dateWithYearFormat(DateTime.fromISO(message.publishDate))}
                </p>
            {:else if i < messages.length - 1 && (!sameDay(message.publishDate, messages[i + 1].publishDate) || !sameMonth(message.publishDate, messages[i + 1].publishDate))}
                <p class="date">
                    {dateWithHourFormat(DateTime.fromISO(message.publishDate))}
                </p>
            {/if}
            <div
                class="{message.idUser1 === currentUserId
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
                    {#if message.idUser1 !== currentUserId}
                        {#if isAloneMessage(messages, i) || isFirstMessage(messages, i)}
                            <img
                                src="https://ui-avatars.com/api/?name=HA&color=23b2a4&background=191820"
                                alt="user profil picture"
                                class="userPP"
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
                        class="{message.idUser1 === currentUserId
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

<style lang="scss">
    .date {
        text-align: center;
        margin: 0.5rem 0;
    }

    .userPP {
        width: 30px;
        height: 30px;
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
