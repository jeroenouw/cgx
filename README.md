# CGX - CLI to Generate recommended Community files

Do you want people to contribute to your project? Make it easy for your contributers. Generate all the recommended files (pre-filled) for the Github community standards.  

Useful for every project (existing or new, large or small, every language)

## Files
* License
* Code of Conduct
* Contributing
* Bug report (issue)
* Feature request (issue)
* Pull request template

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

Generate file question: 
```shell  
? Which files do you want to generate? (Use arrow keys)
❯ All files (without license)
  License (MIT)
  Code of conduct
  Contributing
  Bug report (issue)
  Feature request (issue)
  Pull request template
```

## Todo
* More pre-filled template options per file