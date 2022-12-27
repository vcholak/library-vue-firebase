<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="email" type="email" required placeholder="email" />
    <input v-model="password" type="password" required placeholder="password" />
    <div>{{ error }}</div>
    <button>Log In</button>
  </form>
  <div>
    <router-link to="/signup">Not registered yet?</router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authService } from "@/firebase/config";

const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref(null);

const handleSubmit = async () => {
  error.value = null;
  try {
    const resp = await authService.signInWithEmailAndPassword(
      email.value,
      password.value
    );
    if (!resp) {
      throw new Error("Could not complete the login");
    }
    error.value = null;
    console.log(resp.user);
    router.push("/dashboard"); // redirect to Dashboard
  } catch (err) {
    console.log(err.message);
    error.value = "Incorrect login credentials";
  }
};
</script>

<style scoped></style>
