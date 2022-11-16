<script lang="ts">
    import { onMount } from 'svelte';
    import Table from "../components/Table.svelte"
  
    type Post = {
      createdAt: Date;
      image: any;
      content: string;
      title: string;
      id: number;
     };
  
      let items: Post[] = [];
      let loaded = false;
  
      onMount(() => loadThings(false))
  
      function loadThings(wait: boolean) {
              if (typeof fetch !== 'undefined') {
                  loaded = false;
  
                  fetch('https://api.fake-rest.refine.dev/posts')
                      .then((response) => response.json())
                      .then((json) => {
                                  items = json;
                                  loaded = true;                         
                        });
              }
      }
  </script>

<svelte:head>
	<title>Compte</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<h1 class="text-5xl">Mon compte</h1>
</div>

<Table items={items} loaded={loaded}/>