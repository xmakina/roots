import SignIn from './components/SignIn.vue'
import Dashboard from './components/Dashboard.vue'
import ErrorPage from './components/ErrorPage.vue'

export const routes = [
  {
    path: '/',
    component: SignIn,
    children: [
    ]
  },
  {
    path: '/Dashboard',
    component: Dashboard,
    children: [
    ]
  },
  {
    path: '/ErrorPage',
    component: ErrorPage,
    children: [
    ]
  }
]
