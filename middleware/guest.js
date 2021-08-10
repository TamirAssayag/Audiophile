export default function ({ store, redirect }) {
  if (store.getters['user/isLoggedIn']) {
    return redirect({ name: 'index' })
  }
}
