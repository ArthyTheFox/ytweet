<script>
    export let value = "";
    export let minRows = 1;
    export let maxRows;
    export let addMessage = () => {};

    $: minHeight = `${1 + minRows * 1.2}em`;
    $: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;

    function onKeyPress(e) {
        console.log(e)
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            addMessage();
        }
    }
</script>

<div class="container">
    <pre
        aria-hidden="true"
        style="min-height: {minHeight}; max-height: {maxHeight}">{value +
            "\n"}</pre>
    <textarea
        bind:value
        placeholder="Entrez votre message"
        on:keypress={onKeyPress}
        />
</div>

<style lang="scss">
    .container {
        min-height: 100%;
        position: relative;
    }

    pre,
    textarea {
        font-family: inherit;
        padding: 0.5em;
        box-sizing: border-box;
        line-height: 1.2;
        overflow: hidden;
    }

    textarea {
        overflow-y: scroll;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        resize: none;
        border: #626666 2px solid;
        border-radius: 25px;
        background-color: #25232e;
        color: white;
        padding: 2px 15px;
        outline: 2px solid #121212;

        &::-webkit-scrollbar {
            display: none;
        }

        &:focus {
            border-color: #23b2a4;
        }
    }
</style>
