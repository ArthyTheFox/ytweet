<script lang="ts">
  import { link, push } from "svelte-spa-router";
  import { onMount, createEventDispatcher } from "svelte";
  import postesService from "../../../services/postes.service";
  import DatePost from "../Components/DatePost.svelte";
  import Like from "../../../components/like.svelte";
  import MyStore from "../../../store";
  import Menu from "../../../components/menuPoste.svelte";
  import { slide } from "svelte/transition";
  import Load from "../../../components/load.svelte";
  import Follow from "../../../components/Follow.svelte";

  let postes: any = [];
  let load: boolean = true;
  let searchInput: string = "";
  let messageSearch: string = "";
  const dispatch = createEventDispatcher();

  onMount(async () => {
    postes = await postesService.postes();
    load = false;
  });

  const PostesDetails = (name: String, idPoste: number) => {
    push(`/${name}/poste/${idPoste}`);
  };

  const searchPosts = async () => {
    load = true;
    if (searchInput.length > 0) {
      const data = await postesService.searchPost(searchInput);
      if (!data.message) {
        messageSearch = null
        postes = data;
        load = false;
      } else {
        messageSearch = data.message;
        load = false;
      }
    } else {
      messageSearch = null;
      postes = await postesService.postes();
      load = false;
    }
  };

  function HandleMenuRight() {
    dispatch("menuRight");
  }

  export const addPost = (data: any) => {
    data.username = MyStore.state.auth.user.username;
    data.firstname = MyStore.state.auth.user.firstname;
    data.lastname = MyStore.state.auth.user.lastname;
    postes = [data, ...postes];
  };
</script>

<div class="w-full md:w-6/12 relative h-screen md:border-x md:border-main">
  <div
    class="h-[10%] relative flex justify-center items-center border-b border-main shadow-nav"
  >
    <div
      class="absolute hidden left-0 top-0 px-4 w-full h-full items-center text-[1.5rem] text-gray-500/20 font-bold"
    >
      Accueil
    </div>
    <div class="relative w-2/12 md:hidden" />
    <div class="relative w-8/12">
      <input
        class="bg-main w-full text-sm text-white rounded-xl flex flex-row pt-3 pb-3 pl-3 pr-12 drop-shadow-sm hover:outline-none hover:ring-extra/75 focus:outline-none hover:ring focus:ring focus:ring-extra focus:border-none"
        type="text"
        placeholder="Rechercher par postes, par @pseudo"
        bind:value={searchInput}
        on:input={searchPosts}
      />
      <div
        class="absolute right-0 top-0 w-12 h-full flex justify-center items-center"
      >
        <ion-icon class="text-white visible" name="search-outline" />
      </div>
    </div>
    <div class="relative w-2/12 flex justify-center items-center md:hidden">
      <button
        type="button"
        class="text-white text-xl border border-main rounded w-8 h-8 flex justify-center items-center hover:bg-extra"
        on:click={HandleMenuRight}><ion-icon name="menu-outline" /></button
      >
    </div>
  </div>
  <div class="h-[90%] relative text-white overflow-y-scroll pb-[45px] md:pb-0">
    {#if load}
      <div class="w-full flex justify-center items-center p-10">
        <Load />
      </div>
    {:else if messageSearch}
      <div class="py-2 text-center">
        {messageSearch}
      </div>
    {:else}
      {#each postes as poste}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="w-full flex flex-col border-b border-main py-2 px-2 md:px-4 hover:bg-extra/10 cursor-pointer"
          on:click={() => PostesDetails(poste.username, poste.id)}
        >
          <div class="flex flex-row">
            <div class="flex justify-center items-center w-2/12 md:w-1/12 h-16">
              <img
                class="w-12 h-12 shrink-0 rounded-full border-main"
                alt="user profile"
                src="https://ui-avatars.com/api/?name=HA&color=23b2a4&background=191820"
              />
            </div>
            <div
              class="relative ml-1 pt-2 flex flex-row w-9/12 md:w-10/12 h-16"
            >
              <div class="flex flex-col">
                <div class="flex flex-row">
                  {poste.firstname}
                  {poste.lastname}
                  <div class="mx-2">
                    <span class="text-[0.75rem] text-gray-400">-</span>
                  </div>
                  <div>
                    <DatePost DatePost={poste.publishDate} />
                  </div>
                </div>
                <span class="text-[0.75rem] text-gray-400"
                  >@{poste.username}</span
                >
              </div>
            </div>
            <div class="flex flew-row gap-6 justify-center items-center w-1/12 md:w-1/12 h-16">
              <Menu username={poste.username} idUserFollow={poste.idUser} />
            </div>
          </div>
          <div class="ml-8 md:ml-16 flex flex-col">
            <div class="line-clamp-[10] whitespace-pre-line">
              {poste.content}
            </div>
          </div>
          {#if poste.pathMedia}
            <div class="ml-8 md:ml-16 mt-4 flex flex-col">
              <div class="mr-8 border rounded-lg border-main">
                <img
                  class="rounded-lg"
                  src="http://162.19.33.222:1331/media/{poste.pathMedia}"
                  alt="#"
                />
              </div>
            </div>
          {/if}
          <div class="ml-0 md:ml-16 mt-4 flex flex-col">
            <div class="mr-8 rounded-lg w-full md:w-3/5 flex">
              <div
                class="w-1/3 flex justify-center items-center py-1 text-gray-400"
              >
                <div
                  class="flex justify-center items-center hover:text-extra cursor-pointer"
                >
                  <ion-icon
                    class="text-[1.25rem]"
                    name="chatbox-ellipses-outline"
                  />
                  {#key poste.nbreComment}
                    <span class="ml-2 mb-[3px] text-[0.8rem]" transition:slide>
                      {#if poste.nbreComment}
                        {poste.nbreComment}
                      {:else}
                        0
                      {/if}</span
                    >
                  {/key}
                </div>
              </div>
              <!-- <div
              class="w-1/3 flex justify-center items-center py-1 text-gray-400"
            >
              <div
                class="flex justify-center items-center hover:text-green-500 cursor-pointer"
              >
                <ion-icon
                  class="text-[1.25rem]"
                  name="return-down-forward-outline"
                />
                <span class="ml-2 mb-[3px] text-[0.8rem]">0</span>
              </div>
            </div> -->
              <div
                class="w-1/3 flex justify-center items-center py-1 text-gray-400"
              >
                <Like
                  isLike={poste.isLike}
                  like={poste.nbreLike}
                  idPost={poste.id}
                />
              </div>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  /* width */
  ::-webkit-scrollbar {
    display: none;
  }

  /* ::-webkit-scrollbar {
        height: 5px;
    } */

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

  .shadow-nav {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
</style>
