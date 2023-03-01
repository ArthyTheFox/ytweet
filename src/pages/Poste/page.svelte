<script lang="ts">
    import Nav from "../Partials/Nav/page.svelte";
    import Categorie from "../Partials/Categorie/page.svelte";
    import PosteDetail from "./Partials/PosteDetail.svelte";
    import AddComment from "./Partials/AddComment.svelte";

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
</script>

<div class="w-full h-screen flex relative overflow-hidden">
    <Nav />
    <PosteDetail idPoste={params.idposte} on:addComment={updateAddShow}/>
    <Categorie/>
    <AddComment {addShow} on:quit={updateAddShow} on:add={addShowDialog}/>
</div>