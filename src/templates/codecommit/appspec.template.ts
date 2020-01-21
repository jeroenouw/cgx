import { injectable, inject } from 'inversify';
import { DefaultTemplate } from '../default/default.template';
import { FileName } from '../../models/file';

@injectable()
export class Appspec {
    private fileName = FileName.APPSPEC;

    constructor(@inject('DefaultTemplate') private defaultTemplate: DefaultTemplate) {}

    public generateFile(): void {
        this.defaultTemplate.generateFile(this.fileName, this.fileContent());
    } 

    private fileContent(): string {
        return `version: 0.0
os: linux
files:
    - source: /index.html
      destination: /var/www/html/
hooks:
    BeforeInstall:
        - location: scripts/install_dependencies
          timeout: 300
          runas: root
        - location: scripts/start_server
          timeout: 300
          runas: root
    ApplicationStop:
        - location: scripts/stop_server
          timeout: 300
          runas: root
        `;
     }
}
