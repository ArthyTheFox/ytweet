<script>
    import { push } from "svelte-spa-router";
    import { Islogged } from "../store/store";
    import { onMount } from "svelte";

    onMount(() => {
        if (!$Islogged) {
            push("/auth");
        }
    });
</script>
