<script lang="ts">
    import Nav from "../Partials/Nav/page.svelte";
    import Categorie from "../Partials/Categorie/page.svelte";
    import ListePostes from "./Partials/ListePostes.svelte";
    import AddPoste from "./Partials/AddPoste.svelte";

    let addShow: boolean = false;

    function updateAddShow() {
        addShow = !addShow
    }
</script>

<div class="w-full h-screen flex relative overflow-hidden">
    {#if !addShow}
        <div
            class="absolute bottom-6 left-0 w-full flex justify-center items-center"
        >
            <button
                type="button"
                class="z-[99] rounded-full w-12 h-12 border border-main hover:bg-extra text-white flex justify-center items-center duration-300"
                on:click={() => (addShow = !addShow)}
            >
            <ion-icon name="add-outline"></ion-icon>
            </button>
        </div>
    {/if}
    <Nav />
    <ListePostes />
    <Categorie />
    <AddPoste {addShow} on:quit={updateAddShow}/>
</div>
