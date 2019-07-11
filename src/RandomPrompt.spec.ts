import { Prompt } from 'jest-watcher';
import { WritableStream } from 'memory-streams';
import { BACKSPACE, ENTER, ESC } from './constants';
import { RandomPrompt } from './RandomPrompt';

test('[Enter] will resolve with value entered', async () => {
  const subject = new RandomPrompt(new WritableStream(), new Prompt())
  const running = subject.run()

  subject.onKey('1')
  subject.onKey('2')
  subject.onKey(ENTER)

  expect(await running).toBe(12)
})

test('enter nothing returns 100', async () => {
  const subject = new RandomPrompt(new WritableStream(), new Prompt())
  const running = subject.run()

  subject.onKey(ENTER)

  expect(await running).toBe(100)
})

test('negative is ignored', async () => {
  const subject = new RandomPrompt(new WritableStream(), new Prompt())
  const running = subject.run()

  subject.onKey('-')
  subject.onKey('1')
  subject.onKey(ENTER)

  expect(await running).toBe(1)
})

test('non-number is ignored', async () => {
  const subject = new RandomPrompt(new WritableStream(), new Prompt())
  const running = subject.run()

  subject.onKey('1')
  subject.onKey('A')
  subject.onKey('2')
  subject.onKey(ENTER)

  expect(await running).toBe(12)
})

test('greater than 100 is not allowed', async () => {
  const subject = new RandomPrompt(new WritableStream(), new Prompt())
  const running = subject.run()

  subject.onKey('1')
  subject.onKey('1')
  subject.onKey('1')
  subject.onKey(ENTER)
  subject.onKey(BACKSPACE)
  subject.onKey(ENTER)

  expect(await running).toBe(11)
})

test('[Esc] rejects', async () => {
  const subject = new RandomPrompt(new WritableStream(), new Prompt())
  const running = subject.run()

  subject.onKey(ESC)

  return running.then(() => { throw new Error('should not reach') }, () => { })
})
