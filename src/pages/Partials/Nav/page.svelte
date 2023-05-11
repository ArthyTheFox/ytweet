<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import { push } from "svelte-spa-router";
  import MyStore from "../../../store";
  import { Islogged } from "../../../store/store";

  const dispatch = createEventDispatcher();

  $: logout = () => {
    MyStore.dispatch("auth/logout").then(
      async () => {
        Islogged.set(false);
        await push("/auth");
      },
      (error) => {}
    );
  };

  const handleAddShow = () => {
    dispatch("showAdd");
  }
</script>

<div class="hidden md:block w-3/12 h-screen text-white">
  <div class="h-[10%] flex items-center px-6 text-[2.5rem] uppercase font-bold">
    Ytweet
  </div>
  <div class="h-[73%] flex flex-col p-6">
    <div class="w-4/5 my-1">
      <a
        class="px-6 py-2 hover:bg-extra/20 rounded-3xl text-[1rem] flex flex-row items-center"
        href="#/"
      >
        <ion-icon class="mr-4" name="home-outline" />
        Accueil
      </a>
    </div>
    <div class="w-4/5 my-1">
      <a
        class="px-6 py-2 hover:bg-extra/20 flex rounded-3xl text-[1rem] flex-row items-center"
        href="#/message"
      >
        <ion-icon class="mr-4" name="chatbubbles-outline" />
        Messages
      </a>
    </div>
    <div class="w-4/5 my-1">
      {#if $Islogged}
        <a
          class="px-6 py-2 hover:bg-extra/20 block rounded-3xl text-[1rem] flex-row items-center"
          href="#/{MyStore.state.auth.user.username}"
        >
          <ion-icon class="mr-4" name="person-outline" />
          Profile
        </a>
      {/if}
    </div>
  </div>
  <div class="h-[17%] flex flex-col px-6">
    <div class="w-4/5 mb-2 px-3 flex flex-row">
      <div>
        {#if $Islogged}
        <img
          class="w-10 h-10 rounded-full border-main"
          alt="user profile"
          src={`https://ui-avatars.com/api/?name=${(MyStore.state.auth.user.lastname).substring(0,1)}${(MyStore.state.auth.user.firstname).substring(0,1)}&color=23b2a4&background=191820`}
        />
        {/if}
      </div>
      <div class="ml-4">
        {#if $Islogged}
          <div class="text-[1rem]">
            {MyStore.state.auth.user.lastname}
            {MyStore.state.auth.user.firstname}
          </div>
          <div class="text-[0.75rem] text-gray-400">
            @{MyStore.state.auth.user.username}
          </div>
        {/if}
      </div>
    </div>
    <div class="w-4/5 my-1 z-[99]">
      <button
        class="px-6 py-2 hover:bg-red-500 rounded-3xl text-[1rem] flex flex-row items-center"
        href="#"
        on:click={logout}
      >
        <ion-icon class="mr-4" name="log-out-outline" />
        Déconnexion
      </button>
    </div>
  </div>
</div>

<div
  class="flex fixed left-0 bottom-0 bg-[#151515] border-t-2 border-main md:hidden w-full h-[50px] text-white z-[99] shadow"
>
  <div class="w-full h-full flex flex-row">
    <div class="w-1/5 h-full">
      <a
        class="w-full h-full hover:bg-extra/20 text-[1rem] flex items-center justify-center"
        href="#/"
      >
        <ion-icon name="home-outline" />
      </a>
    </div>
    <div class="w-1/5 h-full">
      <a
        class="w-full h-full hover:bg-extra/20 flex text-[1rem] items-center justify-center"
        href="#/message"
      >
        <ion-icon name="chatbubbles-outline" />
      </a>
    </div>
    <div class="w-1/5 h-full">
      {#if $Islogged}
        <a
          class="w-full h-full hover:bg-extra/20 flex text-[1rem] items-center justify-center"
          href="#/{MyStore.state.auth.user.username}"
        >
          <ion-icon name="person-outline" />
        </a>
      {/if}
    </div>
    <div class="w-1/5 h-full">
        <button on:click={handleAddShow} class="w-full h-full hover:bg-extra/20 text-[1rem] flex items-center justify-center">
            <ion-icon name="add-outline" />
        </button>
    </div>
    <div class="w-1/5 h-full">
      <button
        class="w-full h-full hover:bg-red-500 text-[1rem] flex items-center justify-center"
        on:click={logout}
      >
        <ion-icon name="log-out-outline" />
      </button>
    </div>
  </div>
</div>
