<script>
	export let pathMedia;
    
    console.log(pathMedia)
	$: srcMedia = pathMedia;

    console.log(srcMedia)
</script>

<!-- {#if pathMedia}
<div class="w-full min-h-20 max-h-80 flex justify-center items-center border relative overflow-hidden">
    <img class="rounded-lg w-full h-full" alt=""/>
</div>
{/if} -->