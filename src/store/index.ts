import { createStore } from "vuex";
import { auth } from "./auth.module";

const store = createStore<any>({
  modules: {
    auth,
  },
});

export default store;
