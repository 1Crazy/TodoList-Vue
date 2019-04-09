export default {
  fullName (state) {
    console.log('state', state)
    return `${state.firstName}.${state.lastName}`
  }
}
