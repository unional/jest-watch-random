import t from 'assert'
import RandomPlugin from '.';

test(`usage info defaults to 'r', 'repeat test runs'`, () => {
  const subject = new RandomPlugin({ config: {}, stdout: process.stdout })

  t.deepStrictEqual(subject.getUsageInfo(), { key: 'R', prompt: 'randomly pick some tests to run' })
})

test('onKey is redirected to prompt', () => {
  const subject = new RandomPlugin({ config: {}, stdout: process.stdout })
  let actual: string | undefined
  subject.prompt.onKey = key => actual = key

  subject.onKey('x')
  t.strictEqual(actual, 'x')
})
