import { red, green, cyan } from 'kleur';
// import * as packageJson from '../../package.json';
const program = require('commander');
const figlet = require('figlet');

import { injectable } from 'inversify';

@injectable()
export class Logger {
    private newLine = '\n';

    constructor() {}

    public showHelp(): void {
        return program
            // .version(packageJson.version)
            .version('0.0.1')
            .description(cyan('Generate all recommended files for the Github community standards'))
            .option('--all, --all-files', 'Generate all files')
            .option('--coc, --code-of-conduct', 'Generate CODE OF CONDUCT markdown')
            .option('--l, --license', 'Generate LICENSE')
            .outputHelp();
    }

    public showBanner(): void {
        console.log(cyan(figlet.textSync('CGX', { horizontalLayout: 'full' })));
    }
      
    public showError(message: string | Error, includeHelp = false): void {
        console.error(red('ERROR: ') + message + this.newLine);

        if (includeHelp) {
            this.showHelp();
        } else {
            console.log('');
        }
    }
      
    public showSuccess(message: string): void {
        console.log(green('SUCCESS: ') + message + this.newLine);
    }
      
    public showInfo(message: string): void {
        console.info(cyan('INFO: ') + message + this.newLine);
    }
      
    public showGenerated(message: string, filePath: string): void {
        console.log(green('GENERATED: ') + `${message} in ${filePath}` + this.newLine);
    }
}