# CGX - Generate recommended Community files

Generate all pre-filled recommended files for the community standards, so people can easily contribute to your project.

## Files
* License
* Code of Conduct
* Contributing
* Bug report (issue)
* Feature request (issue)
* Pull request template

![](community-score.png)

## WIP

## Quickstart

Install the CGI CLI as a global CLI.

```shell
npm install -g cgi

cd <your-repo-location>

# Then you run
cgi
```

Or just use via npx:

```shell
cd <your-repo-location>

# Then you run
npx cgi
```

This should start the CLI and ask for questions about which files you want to add!

## Example

Generate license example:  
```shell  
   ____    ____  __  __
  / ___|  / ___| \ \/ /
 | |     | |  _   \  /
 | |___  | |_| |  /  \
  \____|  \____| /_/\_\

? Select which files do you want to generate? License
? Please confirm? Yes
? Please fill in your Github name: Jeroenouw
INFO: Start generating LICENSE...

GENERATED: LICENSE in <path-to-folder>/LICENSE
```

Generate file question: 
```shell  
? Select which files do you want to generate? (Use arrow keys)
❯ All files
  License
  Code of conduct
  Contributing
  Bug report (issue)
  Feature request (issue)
  Pull request template
```

## Todo
* More pre-filled template options per file