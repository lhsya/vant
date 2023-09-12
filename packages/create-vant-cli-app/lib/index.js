#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consola_1 = require("consola");
const enquirer_1 = require("enquirer");
const fs_extra_1 = require("fs-extra");
const generator_1 = require("./generator");
async function run() {
    const { name } = await (0, enquirer_1.prompt)({
        type: 'input',
        name: 'name',
        message: 'Your package name',
    });
    try {
        await (0, fs_extra_1.ensureDir)(name);
        const generator = new generator_1.VanGenerator(name);
        await generator.run();
    }
    catch (e) {
        consola_1.consola.error(e);
    }
}
run();
