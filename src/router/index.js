import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthorList from "../views/author/AuthorList.vue";
import AuthorDetails from "../views/author/AuthorDetails.vue";
import CreateAuthor from "../views/author/CreateAuthor.vue";
import UpdateAuthor from "../views/author/UpdateAuthor.vue";
import GenreList from "../views/genre/GenreList.vue";
import CreateGenre from "../views/genre/CreateGenre.vue";
import GenreDetails from "../views/genre/GenreDetails.vue";
import UpdateGenre from "../views/genre/UpdateGenre.vue";
import BookList from "../views/book/BookList.vue";
import CreateBook from "../views/book/CreateBook.vue";
import BookDetails from "../views/book/BookDetails.vue";
import UpdateBook from "../views/book/UpdateBook.vue";
import BookCopyList from "../views/copy/BookCopyList.vue";
import CreateBookCopy from "../views/copy/CreateBookCopy.vue";
import BookCopyDetails from "../views/copy/BookCopyDetails.vue";
import UpdateBookCopy from "../views/copy/UpdateBookCopy.vue";
import LoginForm from "../components/LoginForm.vue";
import SignupForm from "../components/SignupForm.vue";
import DashboardView from "../views/DashboardView.vue";
import { auth } from "../firebase/config";

// auth guards
const requireAuth = (to, from, next) => {
  let user = auth.currentUser;
  console.log("current user in auth guard: ", user);
  if (!user) {
    next({ name: "LoginForm" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/login",
    name: "LoginForm",
    component: LoginForm,
  },
  {
    path: "/signup",
    name: "SignupForm",
    component: SignupForm,
  },
  {
    path: "/dashboard",
    name: "DashboardView",
    component: DashboardView,
    beforeEnter: requireAuth,
  },
  {
    path: "/authors",
    name: "AuthorList",
    component: AuthorList,
  },
  {
    path: "/authors/create",
    name: "CreateAuthor",
    component: CreateAuthor,
    beforeEnter: requireAuth,
  },
  {
    path: "/authors/:id",
    name: "AuthorDetails",
    component: AuthorDetails,
    props: true,
  },
  {
    path: "/authors/:id",
    name: "UpdateAuthor",
    component: UpdateAuthor,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/genres",
    name: "GenreList",
    component: GenreList,
  },
  {
    path: "/genres/create",
    name: "CreateGenre",
    component: CreateGenre,
    beforeEnter: requireAuth,
  },
  {
    path: "/genres/:id",
    name: "GenreDetails",
    component: GenreDetails,
    props: true,
  },
  {
    path: "/genres/:id",
    name: "UpdateGenre",
    component: UpdateGenre,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/books",
    name: "BookList",
    component: BookList,
  },
  {
    path: "/books/create",
    name: "CreateBook",
    component: CreateBook,
    beforeEnter: requireAuth,
  },
  {
    path: "/books/:id",
    name: "BookDetails",
    component: BookDetails,
    props: true,
  },
  {
    path: "/books/:id",
    name: "UpdateBook",
    component: UpdateBook,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/copies",
    name: "BookCopyList",
    component: BookCopyList,
  },
  {
    path: "/copies/create",
    name: "CreateBookCopy",
    component: CreateBookCopy,
    beforeEnter: requireAuth,
  },
  {
    path: "/copies/:id",
    name: "BookCopyDetails",
    component: BookCopyDetails,
    props: true,
  },
  {
    path: "/copies/:id",
    name: "UpdateBookCopy",
    component: UpdateBookCopy,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/about",
    name: "AboutView",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
