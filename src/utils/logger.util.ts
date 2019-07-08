import { red, green, cyan } from 'kleur';
import * as figlet from 'figlet';

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
        console.error(red(ConsoleMessage.ERROR) + message);
    }
      
    public showSuccess(message: string): void {
        console.log(green(ConsoleMessage.SUCCESS) + message + this.newLine);
    }
      
    public showInfo(message: string): void {
        console.info(cyan(ConsoleMessage.INFO) + message + this.newLine);
    }

    public showGenerate(fileName: string): void {
        console.log(cyan(ConsoleMessage.GENERATE) + `${fileName}...`);
    }
      
    public showCreate(fileName: string, filePath: string): void {
        filePath 
        ? console.log(green(ConsoleMessage.CREATE) + `${fileName} in ${filePath}`) 
        : console.log(green(ConsoleMessage.CREATE) + `${fileName}`);
    }
      
    public showUpdate(fileName: string, filePath: string): void {
        filePath 
        ? console.log(green(ConsoleMessage.UPDATE) + `${fileName} in ${filePath}`) 
        : console.log(green(ConsoleMessage.UPDATE) + `${fileName}`);
    }
}