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

test('input 0 will not trigger run', async () => {
  const subject = new RandomPlugin({ config: {}, stdout: process.stdout })
  subject.prompt.run = () => Promise.resolve(0)

  let count = 0
  await subject.run({}, () => count++)
  t.strictEqual(count, 0)
})

test('input n will run n times', async () => {
  const subject = new RandomPlugin({ config: {}, stdout: process.stdout })
  let complete
  subject.apply({ onTestRunComplete: cb => complete = cb })

  subject.prompt.run = () => Promise.resolve(5)

  let count = 0
  await subject.run({}, () => {
    count++
    complete({ success: true })
  })

  t.strictEqual(count, 5)
})

test('repeat stop if test fails', async () => {
  const subject = new RandomPlugin({ config: {}, stdout: process.stdout })
  let complete
  subject.apply({ onTestRunComplete: cb => complete = cb })

  subject.prompt.run = () => Promise.resolve(5)

  let count = 0
  await subject.run({}, () => {
    count++
    complete({ success: false })
  })

  t.strictEqual(count, 1)
})
