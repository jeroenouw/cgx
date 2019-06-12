# CGX - CLI to Generate recommended documentation/files to improve contribution

[![npmversion](https://img.shields.io/npm/v/cgx.svg)](https://github.com/jeroenouw/cgx)
[![npmlicense](https://img.shields.io/npm/l/cgx.svg)](https://github.com/jeroenouw/cgx/blob/master/LICENSE/)
[![downloads](https://img.shields.io/npm/dy/cgx.svg)](https://github.com/jeroenouw/cgx)

Do you want people to contribute to your project? Make it easy for your contributors. Generate all the recommended documentation/files (pre-filled) for the Github and Gitlab community standards.  

## Useful for every project
* Existing or new
* Large or small
* Every language
* Github or Gitlab

## Files that can be generated
More files in future versions.

### Github & Gitlab
* License (MIT, ISC or Apache 2.0)
* Contributing

### Github specific
* Code of Conduct
* Bug report (issue)
* Feature request (issue)
* Pull request template
* All files at once

### Gitlab specific
* CI template
* Bug (issue)
* Feature proposal (issue)
* Merge request
* All files at once

![](community-score.png)

## Quickstart

Install the CGX CLI as a global CLI.

```shell
npm install -g cgx

cd <your-repo-location>

# Then you run
cgx
```

Or just use via npx:

```shell
cd <your-repo-location>

# Then you run
npx cgx
```

This should start the CLI and ask for questions about which files you want to add!

## Example

Generate all files example:
```shell
   ____    ____  __  __
  / ___|  / ___| \ \/ /
 | |     | |  _   \  /
 | |___  | |_| |  /  \
  \____|  \____| /_/\_\

Generate all recommended files for the Github community standards
? Which files do you want to generate? All files (without license)
INFO: Start generating all recommended files...

GENERATING: CODE_OF_CONDUCT.md...
GENERATING: CONTRIBUTING.md...
GENERATING: bug_report.md...
GENERATING: feature_request.md...
GENERATING: pull_request_template.md...
CREATED: bug_report.md in <path-to-folder>/.github/ISSUE_TEMPLATE/bug_report.md
CREATED: CODE_OF_CONDUCT.md in <path-to-folder>/CODE_OF_CONDUCT.md.md
CREATED: CONTRIBUTING.md in <path-to-folder>/CONTRIBUTING.md
CREATED: feature_request.md in <path-to-folder>/.github/ISSUE_TEMPLATE/feature_request.md
CREATED: pull_request_template.md in <path-to-folder>/.github/PULL_REQUEST_TEMPLATE/pull_request_template.md
```

Git provider question:
```shell
? Select a Git hosting provider: (Use arrow keys)
❯ Github
  Gitlab
```

Generate file question: 
```shell  
? Which files do you want to generate? (Use arrow keys)
❯ All files (without license)
  License
  Code of conduct
  Contributing
  Bug report (issue)
  Feature request (issue)
  Pull request template
```

Generate license example:  
```shell  
   ____    ____  __  __
  / ___|  / ___| \ \/ /
 | |     | |  _   \  /
 | |___  | |_| |  /  \
  \____|  \____| /_/\_\

Generate all recommended files for the Github community standards
? Select which files do you want to generate? License
? Please confirm? Yes
? Please fill in your Github name: jeroenouw
GENERATING: LICENSE...
CREATED: LICENSE in <path-to-folder>/LICENSE
```
