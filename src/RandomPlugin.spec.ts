import t from 'assert'
import RandomPlugin from '.';

test(`usage info defaults to 'r', 'repeat test runs'`, () => {
  const subject = new RandomPlugin({ config: {}, stdout: process.stdout })

  t.deepStrictEqual(subject.getUsageInfo(), { key: 'R', prompt: 'randomly pick some test suites to run' })
})

test('onKey is redirected to prompt', () => {
  const subject = new RandomPlugin({ config: {}, stdout: process.stdout })
  let actual: string | undefined
  subject.prompt.onKey = key => actual = key

  subject.onKey('x')
  t.strictEqual(actual, 'x')
})

test('threshold defaults to 1', async () => {
  const subject = new RandomPlugin({ config: {}, stdout: process.stdout })
  expect(subject.threshold).toBe(1)
})

test('fill in threshold after prompt success', async () => {
  const subject = new RandomPlugin({ config: {}, stdout: process.stdout })
  subject.prompt.run = () => Promise.resolve(12)

  await subject.run()

  expect(subject.threshold).toBe(0.12)
})

test('will run "threshold" percent of test suites', async () => {
  const subject = new RandomPlugin({ config: {}, stdout: process.stdout })
  let t = 0
  let f = 0
  subject.threshold = 0.3

  for (let i = 0; i < 10000; i++)
    subject.apply({ shouldRunTestSuite(cb) { cb() ? t++ : f++ } })

  expect(t / (t + f)).toBeCloseTo(subject.threshold, 1)
})
