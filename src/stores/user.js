import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userName = ref("");
  const token = ref("");

  function setUser(uname, tkn) {
    userName.value = uname ?? "";
    token.value = tkn ?? "";
  }

  function $reset() {
    userName.value = "";
    token.value = "";
  }

  return { userName, token, setUser, $reset };
});
