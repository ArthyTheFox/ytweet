<script lang="ts">
    import {DateTime, Duration} from "luxon";
    export let DatePost: string;

    function formatDatePost(datePost:string) {
        const now: DateTime = DateTime.now();
        const date: DateTime = DateTime.fromISO(datePost);
        const diff: Duration = now.diff(date);
        // console.log(diff)
        if (diff.as('days') > 0) {
            if (now.year !== date.year) return date.toFormat("d MMMM");
            return date.toFormat("d MMMM y");
        } else if (diff.as('hours') > 0) {
            return `il y a ${diff.as('hours')} heure` + (diff.as('hours') > 1 ? "s" : "");
        } else if (diff.as('minutes') >= 5) {
            if (diff.as('minutes') >= 30) return "il y a 30 minutes";
            return "il y a 5 minutes";
        } else return "il y a quelques instants";
    }


    let DateCurrent = formatDatePost(DatePost);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="text-[0.8rem] text-gray-400 hover:text-extra cursor-default"
    >{DateCurrent}</span
>
