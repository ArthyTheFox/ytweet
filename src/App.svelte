<script lang="ts">
  //import Home from "./pages/Home.svelte";
  import AuthPage from "./auth/page.svelte";
  import NotFound from "./pages/pageNotFound.svelte";
  import Postes from "./pages/Postes/page.svelte";
  import Poste from "./pages/Poste/page.svelte";
  import Message from "./pages/Messages/page.svelte";
  import Router from "svelte-spa-router";
  import Profil from "./pages/Profil/page.svelte";
  import Test from './pages/Test/page.svelte';
  import { Islogged } from "./store/store";
  import MyStore from "./store";

  Islogged.set(MyStore.state.auth.status.loggedIn);

  const routes = {
    "/": Postes,
    "/test": Test,
    "/auth": AuthPage,
    "/message": Message,
    "/:user": Profil,
    "/:iduser/poste/:idposte": Poste,
    "*": NotFound,
  };
</script>

<Router {routes} />
