import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import AuthorList from '../views/author/AuthorList'
import AuthorDetails from '../views/author/AuthorDetails'
import CreateAuthor from '../views/author/CreateAuthor'
import UpdateAuthor from '../views/author/UpdateAuthor'
import GenreList from '../views/genre/GenreList'
import CreateGenre from '../views/genre/CreateGenre'
import GenreDetails from '../views/genre/GenreDetails'
import BookList from '../views/book/BookList'
import CreateBook from '../views/book/CreateBook'
import BookDetails from '../views/book/BookDetails'
import UpdateBook from '../views/book/UpdateBook'
import BookCopyList from '../views/copy/BookCopyList'
import CreateBookCopy from '../views/copy/CreateBookCopy'
import BookCopyDetails from '../views/copy/BookCopyDetails'
import UpdateBookCopy from '../views/copy/UpdateBookCopy'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
