
const tokenName = 'itinero-token'

export const setToken = (token) => {
  localStorage.setItem(tokenName, token)
}

export const getToken = () => {
  return localStorage.getItem(tokenName)
}

export const removeToken = () => {
    localStorage.removeItem(tokenName)
  }

  export const getUserFromToken = () => {
    // 1. Get the token from storage
    const token = getToken()
    // 2. Check if the token was defined, if not, return `null`
    if (!token) return null
    // 3. If the user exists, we need to get the second string of the token
    const payload = token.split('.')[1]
    // 4. Decode that string to get the user object within
    const payloadAsObj = JSON.parse(atob(payload))
    // 5. Check that the expiry date is valid
    const timeNow = Date.now() / 1000
    const expTime = payloadAsObj.exp
    // 6. If the token is expired, remove it from storage, return null
    // If the expiry time (in seconds) is smaller than the time right now, it's in the past
    if (expTime < timeNow) {
      removeToken()
      return null
    }
    // 7. If the token is NOT expired, return the user object
    return payloadAsObj.user
}