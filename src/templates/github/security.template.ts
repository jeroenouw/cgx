import { injectable, inject } from 'inversify';
import { DefaultTemplate } from '../default/default.template';
import { FileName } from '../../models/file';

@injectable()
export class Security {
    private fileName = FileName.SECURITY;

    constructor(@inject('DefaultTemplate') private defaultTemplate: DefaultTemplate) {}

    public generateFile(): void {
        this.defaultTemplate.generateFile(this.fileName, this.fileContent());
    }

    private fileContent(): string {
        return `# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 5.1.x   | :white_check_mark: |
| 5.0.x   | :x:                |
| 4.0.x   | :white_check_mark: |
| < 4.0   | :x:                |

## Reporting a Vulnerability

Use this section to tell people how to report a vulnerability.

Tell them where to go, how often they can expect to get an update on a
reported vulnerability, what to expect if the vulnerability is accepted or
declined, etc.
`;
     }
}

