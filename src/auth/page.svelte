<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import FormLogin from "./Partials/login/form_login.svelte";
  import FormRegister from "./Partials/register/form_register.svelte";
  import Wave from "./Partials/wave/wave.svelte";
  import { Islogged } from "../store/store";

  onMount(() => {
    if ($Islogged) {
      push("/");
    }
  });

  let visibleLogin = true;
  let visibleMessage = false;

  function handleClick() {
    visibleLogin = !visibleLogin;
  }

  function RegisterHandle() {
    handleClick();
    visibleMessage = true

    setTimeout(() => {
      visibleMessage = false
    }, 3000)
  }
</script>

<svelte:head>
  <title>Connection</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div
  id="div_app"
  class="relative h-screen flex flex-row bg-main-fonce text-white"
>
  {#if visibleMessage}
    <div
      class="absolute right-4 top-4 w-fit bg-green-500 rounded-xl py-2 px-6 whitespace-nowrap"
    >
      Votre compte à bien été créé
    </div>
  {/if}
  <div class="relative h-full w-full lg:w-1/2 z-[1]">
    {#if visibleLogin}
      <FormLogin {handleClick} />
    {:else}
      <FormRegister {handleClick} on:RegisterGood={RegisterHandle} />
    {/if}
  </div>
  <div class="h-full w-1/2 hidden lg:flex justify-center items-center z-[1]">
    <img alt="" class="w-3/5" src="" />
  </div>
  <div class="absolute top-0 left-0 w-full h-full z-[0]">
    <Wave />
  </div>
</div>
