"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENTER = String.fromCharCode(0x0D);
exports.ESC = String.fromCharCode(0x1B);
const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
function isDigit(value) {
    return DIGITS.indexOf(value) >= 0;
}
exports.isDigit = isDigit;
//# sourceMappingURL=constants.js.map