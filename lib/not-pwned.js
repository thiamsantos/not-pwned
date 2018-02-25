import simpleSha1 from 'simple-sha1'
import 'isomorphic-fetch'

function sha1(password) {
  return new Promise(resolve => {
    simpleSha1(password, hash => {
      resolve(hash.toUpperCase())
    })
  })
}

const breakLines = range => range.split('\r\n')

const getHashs = range => range.map(hash => hash.split(':')[0])

const hasHash = hash => range => !range.includes(hash)

/**
 * Check if a password was pwned.
 * @param {string} password - The password to check.
 * @returns {Promise<boolean>} returns true if the password was not pwned.
 */
export default function notPwned(password) {
  return sha1(password).then(passwordHash => {
    const head = passwordHash.substr(0, 5)
    const rest = passwordHash.substring(5)

    return fetch('https://api.pwnedpasswords.com/range/' + head)
      .then(response => response.text())
      .then(breakLines)
      .then(getHashs)
      .then(hasHash(rest))
  })
}
