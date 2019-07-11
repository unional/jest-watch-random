import ansiEscapes from 'ansi-escapes';
import chalk from 'chalk';
import { Writable } from 'stream';
import { BACKSPACE, ENTER, ESC, isDigit } from './constants';
import { Prompt } from 'jest-watcher';

export class RandomPrompt {
  input = ''
  constructor(public pipe, public prompt: Pick<Prompt, 'put' | 'enter'>) {
  }

  onKey(key: string) {
    if (isDigit(key)) {
      this.input += key
    }
    else if (key === BACKSPACE) {
      this.input = this.input.slice(0, this.input.length - 1)
    }
    else if (key === ENTER && Number.parseInt(this.input, 10) > 100) {
      return
    }

    if (isDigit(key) || key === ESC || key === ENTER || key === BACKSPACE) this.prompt.put(key)
  }

  run() {
    this.pipe.write(ansiEscapes.cursorHide);
    this.pipe.write(ansiEscapes.clearScreen);

    this.pipe.write(`
Random mode usage:
 ${chalk.dim(`› Press`)} Esc ${chalk.dim(`to exit random mode.`)}
 ${chalk.dim(`› Press`)} Enter ${chalk.dim(`to randomly run `)}${chalk.yellow('n%')}${chalk.dim(` of the tests`)}
`)

    printInputLine(this.pipe, '')
    this.pipe.write(ansiEscapes.cursorShow);

    return new Promise<number>((a, r) => {
      this.prompt.enter(value => {
        this.pipe.write(ansiEscapes.eraseLine)
        this.pipe.write(ansiEscapes.cursorLeft)
        const inputValue = Number.parseInt(value, 10)
        if (inputValue > 100) printTooLarge(this.pipe, value)
        else printInputLine(this.pipe, value)
      }, (v: string) => a(v === '' ? 100 : Number.parseInt(v, 10)), r)
    })
  }
}

const printTooLarge = (pipe: Writable, value: string) => {
  pipe.write(ansiEscapes.eraseDown);
  pipe.write(`${chalk.dim(' random ›')} ${value}`);
  pipe.write(ansiEscapes.cursorSavePosition);
  pipe.write(` % ${chalk.red(' between 0 to 100')}`)
  pipe.write(ansiEscapes.cursorRestorePosition)
}

const printInputLine = (pipe: Writable, value: string) => {
  pipe.write(ansiEscapes.eraseDown);
  pipe.write(`${chalk.dim(' random ›')} ${value}`);
  pipe.write(ansiEscapes.cursorSavePosition);
  pipe.write(' %')
  pipe.write(ansiEscapes.cursorRestorePosition)
}
