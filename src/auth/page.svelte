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

  function handleClick() {
    visibleLogin = !visibleLogin;
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
  <div class="relative h-full w-full lg:w-1/2 z-[1]">
    {#if visibleLogin}
      <FormLogin {handleClick} />
    {:else}
      <FormRegister {handleClick} />
    {/if}
  </div>
  <div class="h-full w-1/2 hidden lg:flex justify-center items-center z-[1]">
    <img alt="" class="w-3/5" src="" />
  </div>
  <div class="absolute top-0 left-0 w-full h-full z-[0]">
    <Wave />
  </div>
</div>
