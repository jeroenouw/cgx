import { injectable, inject } from 'inversify';
import { DefaultTemplate } from '../default/default.template';
import { FileName } from '../../models/file';
import { CommitData } from '../../models/commit-data';
import * as childProcess from 'child_process';

@injectable()
export class Changelog {
    private fileName = FileName.CHANGELOG;

    constructor(@inject('DefaultTemplate') private defaultTemplate: DefaultTemplate) {}

    public generateFile(): void {
        this.defaultTemplate.generateFile(this.fileName, this.generateFileContent());
    }

    private generateFileContent(): string {
        const gitLogCommand: string = 'git log --pretty=format:"%h%n%d%n%an%n%s%n%ai%n%b%ae%n%n" --no-merges -z';
        const gitLog: string = childProcess.execSync(gitLogCommand).toString().trim();
        return this.JSONToMarkdown(gitLog).replace(/,/g, '');
    };

    private JSONToMarkdown(gitLog: string): string {
        const newLine: string = '\n';
        const json = this.gitLogToJSON(gitLog);

        return `# Changelog 
        
` + json.map((commit: CommitData) => {
        return `__Commit:__ [${commit.hash}](${commit.hash}):  
__Message:__ ${commit.message}  
__Author:__ ${commit.author} on ${commit.date} ${newLine} ${newLine}`;
        })
    };

    private gitLogToJSON(gitLog: string): CommitData[] {
        return gitLog.split('\0').map((commit: any) => {
          const commitParts = commit.split('\n');
      
          return {
            hash: commitParts[0],
            author: commitParts[2],
            message: commitParts[3],
            date: commitParts[4].substr(0, 16),
            mail: commitParts[5]
          }
        });
    };
}
