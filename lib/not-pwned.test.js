import nock from 'nock'
import notPwned from './not-pwned'

describe('notpwned', () => {
  beforeAll(() => {
    nock('https://api.pwnedpasswords.com/range')
      .get('/21BD1')
      .reply(
        200,
        '0018A45C4D1DEF81644B54AB7F969B88D65:1\r\n00D4F6E8FA6EECAD2A3AA415EEC418D38EC:2\r\n2DC183F740EE76F27B78EB39C8AD972A757:47205'
      )
    nock('https://api.pwnedpasswords.com/range')
      .get('/F9E0D')
      .reply(
        200,
        '0028B733054B5585121F1BB5F7ED30F18DA:14\r\n005B0B1E780BA4673507515800B40457170:1\r\n018D42EC45B04DF34A0258911661EDDDBCC:6\r\n01E74FE861F33EA2E8FF1E1B695F1E50289:4'
      )
  })

  it('should should return true when the password was not pwned', async () => {
    const actual = await notPwned(
      'Z76okiy2X1m5PFud8iPUQGqusShCJhg+xiKeS91iOZw='
    )
    const expected = true

    expect(actual).toBe(expected)
  })

  it('should should return false when the password was pwned', async () => {
    const actual = await notPwned('P@ssw0rd')
    const expected = false

    expect(actual).toBe(expected)
  })
})
