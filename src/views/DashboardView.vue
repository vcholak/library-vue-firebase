<template>
  <h1>My Library Dashboard</h1>
  <div>
    <p>Hey there {{ user.displayName }}</p>
    <p>Currently logged in as {{ user.email }}</p>
  </div>
  <button @click="logout">Logout</button>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authService } from "@/firebase/config";

// refs
const error = ref(null);
const user = ref(authService.currentUser);

const router = useRouter();

// listen for auth changes outside of function, so only 1 listener is ever attached
authService.onAuthStateChanged((_user) => {
  console.log("User state change. Current user is:", _user);
  user.value = _user;
});

const logout = async () => {
  error.value = null;

  try {
    await authService.signOut();
    router.push("/"); // redirect to Home page
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
  }
};
</script>

<style scoped></style>
