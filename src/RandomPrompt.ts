import ansiEscapes from 'ansi-escapes';
import chalk from 'chalk';
import { Writable } from 'stream';
import { ENTER, ESC, isDigit } from './constants';

export class RandomPrompt {
  constructor(public pipe, public prompt) {
  }

  onKey(key: string) {
    if (isDigit(key) || key === ESC || key === ENTER) this.prompt.put(key)
  }

  run() {
    this.pipe.write(ansiEscapes.cursorHide);
    this.pipe.write(ansiEscapes.clearScreen);

    this.pipe.write(`
Random mode usage:
 ${chalk.dim(`› Press`)} Esc ${chalk.dim(`to exit random mode.`)}
 ${chalk.dim(`› Press`)} Enter ${chalk.dim(`to randomly run `)}${chalk.yellow('n%')}${chalk.dim(` of the tests`)}
`)

    printRepeatCaret('', this.pipe)
    this.pipe.write(ansiEscapes.cursorShow);

    return new Promise<number>((a, r) => {
      this.prompt.enter(value => {
        this.pipe.write(ansiEscapes.eraseLine)
        this.pipe.write(ansiEscapes.cursorLeft)
        printRepeatCaret(value, this.pipe)
        this.pipe.write(' %')
        this.pipe.write(ansiEscapes.cursorRestorePosition)
      }, (v: string) => a(Number.parseInt(v, 10)), r)
    })
  }
}

const printRepeatCaret = (value: string, pipe: Writable) => {
  pipe.write(ansiEscapes.eraseDown);
  pipe.write(`${chalk.dim(' random ›')} ${value}`);
  pipe.write(ansiEscapes.cursorSavePosition);
}
