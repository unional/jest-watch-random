"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ansi_escapes_1 = __importDefault(require("ansi-escapes"));
const chalk_1 = __importDefault(require("chalk"));
const constants_1 = require("./constants");
class RandomPrompt {
    constructor(pipe, prompt) {
        this.pipe = pipe;
        this.prompt = prompt;
    }
    onKey(key) {
        if (constants_1.isDigit(key) || key === constants_1.ESC || key === constants_1.ENTER)
            this.prompt.put(key);
    }
    run() {
        this.pipe.write(ansi_escapes_1.default.cursorHide);
        this.pipe.write(ansi_escapes_1.default.clearScreen);
        this.pipe.write(`
Random mode usage:
 ${chalk_1.default.dim(`› Press`)} Esc ${chalk_1.default.dim(`to exit random mode.`)}
 ${chalk_1.default.dim(`› Press`)} Enter ${chalk_1.default.dim(`to randomly run `)}${chalk_1.default.yellow('n%')}${chalk_1.default.dim(` of the tests`)}
`);
        printRepeatCaret('', this.pipe);
        this.pipe.write(ansi_escapes_1.default.cursorShow);
        return new Promise((a, r) => {
            this.prompt.enter(value => {
                this.pipe.write(ansi_escapes_1.default.eraseLine);
                this.pipe.write(ansi_escapes_1.default.cursorLeft);
                printRepeatCaret(value, this.pipe);
                this.pipe.write(' %');
                this.pipe.write(ansi_escapes_1.default.cursorRestorePosition);
            }, (v) => a(Number.parseInt(v, 10)), r);
        });
    }
}
exports.RandomPrompt = RandomPrompt;
const printRepeatCaret = (value, pipe) => {
    pipe.write(ansi_escapes_1.default.eraseDown);
    pipe.write(`${chalk_1.default.dim(' random ›')} ${value}`);
    pipe.write(ansi_escapes_1.default.cursorSavePosition);
};
//# sourceMappingURL=RandomPrompt.js.map