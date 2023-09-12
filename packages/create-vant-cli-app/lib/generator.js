"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VanGenerator = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const picocolors_1 = __importDefault(require("picocolors"));
const consola_1 = require("consola");
const enquirer_1 = require("enquirer");
const node_path_1 = require("node:path");
const constant_1 = require("./constant");
const PROMPTS = [
    {
        name: 'vueVersion',
        message: 'Select Vue version',
        type: 'select',
        choices: [
            {
                name: 'vue2',
                message: 'Vue 2',
            },
            {
                name: 'vue3',
                message: 'Vue 3',
            },
        ],
    },
    {
        name: 'preprocessor',
        message: 'Select css preprocessor',
        type: 'select',
        choices: ['Less', 'Sass'],
    },
];
class VanGenerator {
    constructor(name) {
        this.outputDir = '';
        this.inputs = {
            name: '',
            cssLang: '',
            vueVersion: '',
            preprocessor: '',
        };
        this.inputs.name = name;
        this.outputDir = (0, node_path_1.join)(constant_1.CWD, name);
    }
    async run() {
        await this.prompting();
        this.writing();
        this.end();
    }
    async prompting() {
        return (0, enquirer_1.prompt)(PROMPTS).then((inputs) => {
            const preprocessor = inputs.preprocessor.toLowerCase();
            const cssLang = preprocessor === 'sass' ? 'scss' : preprocessor;
            this.inputs.cssLang = cssLang;
            this.inputs.vueVersion = inputs.vueVersion;
            this.inputs.preprocessor = preprocessor;
        });
    }
    writing() {
        console.log();
        consola_1.consola.info(`Creating project in ${picocolors_1.default.green(this.outputDir)}\n`);
        // see https://github.com/mrmlnc/fast-glob#how-to-write-patterns-on-windows
        const templatePath = (0, node_path_1.join)(constant_1.GENERATOR_DIR, this.inputs.vueVersion).replace(/\\/g, '/');
        const templateFiles = fast_glob_1.default.sync((0, node_path_1.join)(templatePath, '**', '*').replace(/\\/g, '/'), {
            dot: true,
        });
        templateFiles.forEach((filePath) => {
            const outputPath = filePath
                .replace('.tpl', '')
                .replace(templatePath, this.outputDir);
            this.copyTpl(filePath, outputPath, this.inputs);
        });
    }
    copyTpl(from, to, args) {
        fs_extra_1.default.copySync(from, to);
        let content = fs_extra_1.default.readFileSync(to, 'utf-8');
        Object.keys(args).forEach((key) => {
            const regexp = new RegExp(`<%= ${key} %>`, 'g');
            content = content.replace(regexp, args[key]);
        });
        fs_extra_1.default.writeFileSync(to, content);
        const name = to.replace(this.outputDir + node_path_1.sep, '');
        consola_1.consola.success(`${picocolors_1.default.green('create')} ${name}`);
    }
    end() {
        const { name } = this.inputs;
        console.log();
        consola_1.consola.success(`Successfully created ${picocolors_1.default.yellow(name)}.`);
        consola_1.consola.success(`Run ${picocolors_1.default.yellow(`cd ${name} && git init && yarn && yarn dev`)} to start development!`);
    }
}
exports.VanGenerator = VanGenerator;
