<template>
  <header
    class="mb-8 flex justify-between border-b-2 border-indigo-600 py-8 text-2xl"
  >
    <!--div id="nav"-->
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Sign In</router-link> |
    <router-link to="/authors">Authors</router-link> |
    <router-link to="/genres">Genres</router-link> |
    <router-link to="/books">Books</router-link> |
    <router-link to="/copies">Book Copies</router-link> |
    <router-link to="/about">About</router-link>
    <!--/div-->
  </header>
  <router-view />
</template>

<style></style>
