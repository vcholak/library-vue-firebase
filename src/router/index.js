import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthorList from '../views/author/AuthorList.vue'
import AuthorDetails from '../views/author/AuthorDetails.vue'
import CreateAuthor from '../views/author/CreateAuthor.vue'
import UpdateAuthor from '../views/author/UpdateAuthor.vue'
import GenreList from '../views/genre/GenreList.vue'
import CreateGenre from '../views/genre/CreateGenre.vue'
import GenreDetails from '../views/genre/GenreDetails.vue'
import UpdateGenre from '../views/genre/UpdateGenre.vue'
import BookList from '../views/book/BookList.vue'
import CreateBook from '../views/book/CreateBook.vue'
import BookDetails from '../views/book/BookDetails.vue'
import UpdateBook from '../views/book/UpdateBook.vue'
import BookCopyList from '../views/copy/BookCopyList.vue'
import CreateBookCopy from '../views/copy/CreateBookCopy.vue'
import BookCopyDetails from '../views/copy/BookCopyDetails.vue'
import UpdateBookCopy from '../views/copy/UpdateBookCopy.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/authors',
    name: 'AuthorList',
    component: AuthorList
  },
  {
    path: '/authors/create',
    name: 'CreateAuthor',
    component: CreateAuthor
  },
  {
    path: '/authors/:id',
    name: 'AuthorDetails',
    component: AuthorDetails,
    props: true
  },
  {
    path: '/authors/:id',
    name: 'UpdateAuthor',
    component: UpdateAuthor,
    props: true
  },
  {
    path: '/genres',
    name: 'GenreList',
    component: GenreList
  },
  {
    path: '/genres/create',
    name: 'CreateGenre',
    component: CreateGenre
  },
  {
    path: '/genres/:id',
    name: 'GenreDetails',
    component: GenreDetails,
    props: true
  },
  {
    path: '/genres/:id',
    name: 'UpdateGenre',
    component: UpdateGenre,
    props: true
  },
  {
    path: '/books',
    name: 'BookList',
    component: BookList
  },
  {
    path: '/books/create',
    name: 'CreateBook',
    component: CreateBook
  },
  {
    path: '/books/:id',
    name: 'BookDetails',
    component: BookDetails,
    props: true
  },
  {
    path: '/books/:id',
    name: 'UpdateBook',
    component: UpdateBook,
    props: true
  },
  {
    path: '/copies',
    name: 'BookCopyList',
    component: BookCopyList
  },
  {
    path: '/copies/create',
    name: 'CreateBookCopy',
    component: CreateBookCopy
  },
  {
    path: '/copies/:id',
    name: 'BookCopyDetails',
    component: BookCopyDetails,
    props: true
  },
  {
    path: '/copies/:id',
    name: 'UpdateBookCopy',
    component: UpdateBookCopy,
    props: true
  },
  {
    path: '/about',
    name: 'AboutView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
