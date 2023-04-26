<script>
	export let value = '';
	export let minRows = 1;
	export let maxRows;
	
	// let minHeight =  `${1 + minRows * 1.2}em`
	$: minHeight = `${1 + minRows * 1.2}em`;
	$: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;
</script>

<div class="relative w-full md:w-[450px] h-fit text-white">
	<pre
		aria-hidden="true"
		style="min-height: {minHeight};"
	>{value + '\n'}</pre>

	<textarea bind:value placeholder="Votre message" required></textarea>	
</div>

<style>
	pre{
        color: transparent;
        /* overflow: hidden; */
    }
	pre, textarea {
		font-family: inherit;
		padding: 0.5em;
		box-sizing: border-box;
        border: none;
        outline: none;
        background: transparent;
		line-height: 1.2;
	}
	
	textarea {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		resize: none;
        color: white;
        overflow-y: auto;
	}

    ::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: transparent;
        border-radius: 25px;
    }

    :hover::-webkit-scrollbar-thumb {
        background: #23b2a4;
    }
</style>