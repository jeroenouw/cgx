import { GithubPath } from '../../models/path';
import { FileName } from '../../models/file';
import { defaultTemplate } from '../default/default.template';

export function nodeCI() {
    const fileName = FileName.NODE_CI;
    const filePath = GithubPath.WORKFLOWS;

    const fileContent = (): string => {
        return `
        name: Node CI

        on:
          push:
            branches:
              - main
        
        jobs:
          build:
            runs-on: ubuntu-latest
        
            strategy:
              matrix:
                node-version: [10.x, 12.x]
        
            steps:
              - uses: actions/checkout@v2
        
              - name: Use Node.js $ {{ matrix.node-version }}
                uses: actions/setup-node@v2
                with:
                  node-version: $ {{ matrix.node-version }}
        
              - name: Run refresh
                run: npm run refresh
        
              - name: Run tscov
                run: npm run tscov
        
              - name: Run build
                run: npm run build
        
              - name: Run docs
                run: npm run docs
                env:
                  CI: true
        `;
    }

    return defaultTemplate(fileName, fileContent(), filePath);
}
