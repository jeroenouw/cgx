import { red, green, cyan } from 'kleur';
const figlet = require('figlet');

import { injectable } from 'inversify';
import { ConsoleMessage } from '../models/console-message';

@injectable()
export class Logger {
    private newLine = '\n';

    public showTitleAndBanner(): void {
        console.log(cyan(figlet.textSync(ConsoleMessage.TITLE, { horizontalLayout: 'full' })));
        console.info(cyan(ConsoleMessage.BANNER));
    }
      
    public showError(message: string | Error): void {
        console.error(red(ConsoleMessage.ERROR) + message + this.newLine);
    }
      
    public showSuccess(message: string): void {
        console.log(green(ConsoleMessage.SUCCESS) + message + this.newLine);
    }
      
    public showInfo(message: string): void {
        console.info(cyan(ConsoleMessage.INFO) + message + this.newLine);
    }

    public showStartGenerating(fileName: string): void {
        console.log(cyan(ConsoleMessage.GENERATING) + `${fileName}...`);
    }
      
    public showCreated(fileName: string, filePath: string): void {
        console.log(green(ConsoleMessage.CREATED) + `${fileName} in ${filePath}`);
    }
}