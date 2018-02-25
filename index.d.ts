declare module 'not-pwned' {
  function notPwned(password: string): Promise<boolean>

  export = notPwned
}
