import { FileName } from '../../models/file';
import { defaultTemplate } from '../default/default.template';

export function appspec() {
    const fileName = FileName.APPSPEC;

    const fileContent = (): string => {
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
    
    return defaultTemplate(fileName, fileContent());
}
