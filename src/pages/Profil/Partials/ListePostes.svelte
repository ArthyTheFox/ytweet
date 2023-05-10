<script lang="ts">
  import { link, push, replace } from "svelte-spa-router";
  import { onMount } from "svelte";
  import postesService from "../../../services/postes.service";
  import userService from "../../../services/user.service";
  import DatePost from "../Components/DatePost.svelte";
  import Like from "../../../components/like.svelte";
  import MyStore from "../../../store";
  import Load from "../../../components/load.svelte";
  import FollowService from "../../../services/follow.service";
  import Follow from "../../../components/Follow.svelte";

  let load: boolean = false;
  let postes: any = [];
  let follows: any = [];
  let posteFollow = "poste";
  let user: any;
  let description: any;
  let descriptionInput: any;
  export let username: any;
  let myPoste: boolean = false;
  let myLike: string = "poste";

  let dialogUpdateProfil = false;
  const dialogUpdateProfilHandle = () => {
    dialogUpdateProfil = !dialogUpdateProfil;
  };

  onMount(async () => {
    load = true;
    if (username) {
      user = await userService.getUser(username);
      if (username === MyStore.state.auth.user.username) {
        follows = await FollowService.getFollow();
      }
      description = user.description;
      descriptionInput = user.description;
      myTweetHandle();
    }
  });

  const PostesDetails = (name: String, idPoste: number) => {
    push(`/${name}/poste/${idPoste}`);
  };

  const myTweetHandle = async () => {
    load = true;
    postes = [];
    myLike = "poste";
    myPoste = true;
    postes = await postesService.posteByUser(username);
    load = false;
  };

  const myLikeHandle = async () => {
    load = true;
    posteFollow = "poste";
    postes = [];
    myPoste = false;
    myLike = "like";
    postes = await postesService.postByLiked(username);
    load = false;
  };

  const myFollowHandle = async () => {
    posteFollow = "follow";
  };

  const redirectionUser = (username: string) => {
    replace(`/${username}`);
  };

  export const addPost = (data: any) => {
    data.username = MyStore.state.auth.user.username;
    data.firstname = MyStore.state.auth.user.firstname;
    data.lastname = MyStore.state.auth.user.lastname;
    postes = [data, ...postes];
  };

  const updateProfil = async () => {
    let user = await userService.updateUser(descriptionInput);
    description = user.description;

    dialogUpdateProfil = false;
  };
</script>

{#if dialogUpdateProfil}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="fixed left-0 top-0 w-full h-full flex justify-center items-center z-[99] backdrop-blur-[6px]"
    on:click|self={dialogUpdateProfilHandle}
  >
    <div
      class="relative w-11/12 md:w-1/3 h-fit bg-main rounded-lg border border-extra z-[99] overflow-hidden"
    >
      <div class="flex flex-col border-b border-main">
        <div
          class="py-2 px-4 text-neutral-500 text-sm border-y bg-main-fonce border-main"
        >
          Modifier le profil de <span class="text-extra ml-1"
            >{user?.firstname} {user?.lastname}</span
          >
        </div>
        <div class="flex flex-col">
          <div class="text-gray-400 text-sm p-2">Description</div>
          <textarea
            class="w-full bg-transparent px-2 py-1 text-white border-t border-main outline-none text-xs h-32 resize-none"
            placeholder="Taper une description"
            bind:value={descriptionInput}
          />
        </div>

        <div class="w-full flex justify-center items-center my-4">
          <button
            class="p-2 text-xs flex justify-center items-center rounded-lg bg-extra hover:bg-extra/50 cursor-pointer text-white"
            on:click={updateProfil}>Modifier</button
          >
        </div>
      </div>
    </div>
  </div>
{/if}

<div class="w-full md:w-6/12 relative h-screen md:border-x md:border-main">
  <div
    class="h-[10%] relative flex px-4 items-center uppercase text-white text-[1.75rem] font-bold shadow-nav"
  >
    <a
      href="/"
      use:link
      class="w-8 h-8 flex justify-center items-center p-1 rounded-full hover:bg-extra"
    >
      <ion-icon name="arrow-back-outline" />
    </a>
  </div>
  <div class="h-[90%] relative text-white overflow-y-scroll pb-[45px] md:pb-0">
    <div class="w-full flex flex-col py-2 px-1 md:px-4">
      <div class="flex flex-row">
        <div class="flex justify-center items-center w-2/12 md:w-1/12 h-16">
          <img
            class="w-12 h-12 rounded-full border-main"
            alt="user profile"
            src="https://ui-avatars.com/api/?name=HA&color=23b2a4&background=191820"
          />
        </div>
        <div class="relative ml-1 pt-2 flex flex-row w-8/12 md:w-10/12 h-16">
          <div class="flex flex-col">
            <div class="flex flex-row">
              {user?.firstname}
              {user?.lastname}
            </div>
            <span class="text-[0.75rem] text-gray-400">@{user?.username}</span>
          </div>
        </div>
        <div class="flex justify-center items-center w-2/12 h-16">
          {#if user}
            {#if user?.id !== MyStore.state.auth.user.id}
              {#key user}
                <Follow idUserFollow={user?.id} />
              {/key}
            {/if}
            {#if user?.id === MyStore.state.auth.user.id}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div
                class="p-2 text-xs flex justify-center items-center rounded-lg hover:bg-extra/50 cursor-pointer"
                on:click={dialogUpdateProfilHandle}
              >
                Modifier
              </div>
            {/if}
          {/if}
        </div>
      </div>
      <div class="ml-8 md:ml-16 flex flex-col">
        <div class="text-[0.75rem] text-gray-400">
          A rejoint Ytweet le {new Date(user?.created_at).toLocaleDateString()}
        </div>
      </div>
      <div class="ml-8 md:ml-16 mt-4 flex flex-col">
        <div
          class="text-[0.75rem] {user?.description
            ? 'text-white'
            : 'text-gray-400'}"
        >
          {#if description}
            {description}
          {:else}
            Pas de description
          {/if}
        </div>
      </div>
      <div class="ml-8 md:ml-16 mt-4 mb-4 flex flex-col text-gray-400">
        <div class="text-[0.75rem] w-1/3">
          Postes : {user?.nbrPosts}
        </div>
        <div class="text-[0.75rem] w-1/3">
          Commentaires : {user?.nbrComments}
        </div>
      </div>
    </div>
    <div class="flex flex-row border-b border-main">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="w-1/3 flex justify-center items-center p-4 hover:bg-extra/10 text-sm cursor-pointer {myLike ===
          'poste' && posteFollow === 'poste'
          ? 'border-b-4 border-extra text-white'
          : 'text-gray-400'}"
        on:click|preventDefault={myTweetHandle}
      >
        {#if user?.id === MyStore.state.auth.user.id}
          Mes postes
        {:else}
          Ces postes
        {/if}
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="w-1/3 flex justify-center items-center p-4 text-sm hover:bg-extra/10 cursor-pointer {myLike ===
          'like' && posteFollow === 'poste'
          ? 'border-b-4 border-extra text-white'
          : 'text-gray-400'}"
        on:click|preventDefault={myLikeHandle}
      >
        {#if user?.id === MyStore.state.auth.user.id}
          Mes likes
        {:else}
          Ces likes
        {/if}
      </div>
      {#if user?.id === MyStore.state.auth.user.id}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="w-1/3 flex justify-center items-center p-4 text-sm hover:bg-extra/10 cursor-pointer {posteFollow ===
          'follow'
            ? 'border-b-4 border-extra text-white'
            : 'text-gray-400'}"
          on:click|preventDefault={myFollowHandle}
        >
          Mes Follows
        </div>
      {/if}
    </div>
    {#if load}
      <div class="w-full flex justify-center items-center p-10">
        <Load />
      </div>
    {:else if posteFollow === "poste"}
      {#key postes}
        {#each postes as poste}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class="w-full flex flex-col border-b border-main py-2 px-1 md:px-4 hover:bg-extra/10 cursor-pointer"
            on:click={() => PostesDetails(poste.username, poste.id)}
          >
            <div class="flex flex-row">
              <div
                class="flex justify-center items-center w-2/12 md:w-1/12 h-16"
              >
                <img
                  class="w-12 h-12 rounded-full border-main"
                  alt="user profile"
                  src="https://ui-avatars.com/api/?name=HA&color=23b2a4&background=191820"
                />
              </div>
              <div
                class="relative ml-1 pt-2 flex flex-row w-10/12 md:w-11/12 h-16"
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
            <div class="ml-8 md:ml-16 mt-4 flex flex-col">
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
                    <span class="ml-2 mb-[3px] text-[0.8rem]"
                      >{poste.nbreComment}</span
                    >
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
      {/key}
    {:else if posteFollow === "follow"}
      {#key follows}
        {#each follows as follow}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class="w-full flex flex-col border-b border-main py-2 px-1 md:px-4 hover:bg-extra/10 cursor-pointer"
            on:click={() => redirectionUser(follow.username)}
          >
            <div class="flex flex-row">
              <div
                class="flex justify-center items-center w-2/12 md:w-1/12 h-16"
              >
                <img
                  class="w-12 h-12 rounded-full border-main"
                  alt="user profile"
                  src="https://ui-avatars.com/api/?name=HA&color=23b2a4&background=191820"
                />
              </div>
              <div
                class="relative ml-1 pt-2 flex flex-row w-10/12 md:w-11/12 h-16"
              >
                <div class="flex flex-col">
                  <div class="flex flex-row">
                    {follow.firstname}
                    {follow.lastname}
                    <div class="mx-2">
                      <span class="text-[0.75rem] text-gray-400">-</span>
                    </div>
                    <!-- <div>
                      <DatePost DatePost={poste.publishDate} />
                    </div> -->
                  </div>
                  <span class="text-[0.75rem] text-gray-400"
                    >@{follow.username}</span
                  >
                </div>
              </div>
            </div>
          </div>
        {/each}
      {/key}
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
