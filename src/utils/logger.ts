import { red, green, cyan } from 'kleur';
const figlet = require('figlet');

import { injectable } from 'inversify';

@injectable()
export class Logger {
    private newLine = '\n';

    public showBanner(): void {
        console.log(cyan(figlet.textSync('CGX', { horizontalLayout: 'full' })));
        console.info(cyan('Generate all recommended files for the Github community standards'));
    }
      
    public showError(message: string | Error): void {
        console.error(red('ERROR: ') + message + this.newLine);
    }
      
    public showSuccess(message: string): void {
        console.log(green('SUCCESS: ') + message + this.newLine);
    }
      
    public showInfo(message: string): void {
        console.info(cyan('INFO: ') + message + this.newLine);
    }

    public showStartGenerating(fileName: string): void {
        console.log(cyan('GENERATING: ') + `${fileName}...`);
    }
      
    public showCreated(message: string, filePath: string): void {
        console.log(green('CREATED: ') + `${message} in ${filePath}`);
    }
}