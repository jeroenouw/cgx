import { FileName } from '../../models/file';
import { CommitData } from '../../models/commit-data';
import * as childProcess from 'child_process';
import { defaultTemplate } from '../default/default.template';
import { showError } from '../../utils/logger.util';

export function changelog() {
    const fileName = FileName.CHANGELOG;

    const gitLogToJSON = (gitLog: string): CommitData[] => {
        return gitLog.split('\0').map((commit: any) => {
          const commitParts = commit.split('\n');
          const [hash, , author, message, date, mail] = commitParts;
          return {hash, author, message, date, mail};
        });
    };

    const JSONToMarkdown = (gitLog: string): string => {
        const newLine: string = '\n';
        const json = gitLogToJSON(gitLog);

        return `# Changelog

` + json.map((commit: CommitData) => {
        return `__Commit:__ [${commit.hash}](${commit.hash}):
__Message:__ ${commit.message}
__Author:__ ${commit.author} on ${commit.date} ${newLine} ${newLine}`;
        })
    };

    const generateFileContent = (): string => {
        try {
            const gitLogCommand: string = 'git log --pretty=format:"%h%n%d%n%an%n%s%n%ai%n%b%ae%n%n" --no-merges -z';
            const gitLog: string = childProcess.execSync(gitLogCommand).toString().trim();
            return JSONToMarkdown(gitLog).replace(/,/g, '');
        } catch(error) {
            showError('This is not a git repository');
            process.exit(1);
        }
    };

    return defaultTemplate(fileName, generateFileContent());
}
