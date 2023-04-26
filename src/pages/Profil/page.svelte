<script lang="ts">
    import Router, {location, link} from 'svelte-spa-router';
    import Nav from "../Partials/Nav/page.svelte";
    import Categorie from "../Partials/Categorie/page.svelte";
    import ListePostes from "./Partials/ListePostes.svelte";
    import AddPoste from "./Partials/AddPoste.svelte";

    export let params:any = {}

    let addShow: boolean = false;
    let dialogAdd: boolean = false;
    let testAdd;

    function updateAddShow() {
        addShow = !addShow;
    }

    function addShowDialog(data:any) {
        addShow = !addShow;
        testAdd(data.detail)
        dialogAdd = true;

        setTimeout(() => {
            dialogAdd = false
        }, 1500)
    }

    function handleAddShow() {
        addShow = !addShow
    }
</script>

<div class="w-full h-screen flex relative overflow-hidden">
    {#if !addShow}
        <div
            class="hidden absolute bottom-6 left-0 w-full md:flex justify-center items-center"
        >
            <button
                type="button"
                class="z-50 rounded-full bg-main shadow-lg w-12 h-12 hover:bg-extra text-white flex justify-center items-center duration-300"
                on:click={() => (addShow = !addShow)}
            >
                <ion-icon name="add-outline" />
            </button>
        </div>
    {/if}

    {#if dialogAdd}
        <div
            class="absolute top-4 right-4 py-2 px-4 text-white bg-green-500 rounded-md"
        >
            Poste ajouté
        </div>
    {/if}
    <Nav on:showAdd={handleAddShow}/>
    <ListePostes bind:addPost={testAdd} username={params.user}/>
    <Categorie />
    <AddPoste {addShow} on:quit={updateAddShow} on:add={addShowDialog}/>
</div>
