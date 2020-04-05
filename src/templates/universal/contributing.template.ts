import { FileName } from '../../models/file';
import { defaultTemplate } from '../default/default.template';

export function contributing() {
    const fileName = FileName.CONTRIBUTING;

    const fileContent = (): string => {
        return `## Contributing

First fork this project.  

* git clone <your-forked-repo>
* npm install

* git checkout -b my-fix

#### fix some code...

* git commit -m "added this feature"
* git push origin my-fix

Lastly, open a pull request on Github.`;
     }

    return defaultTemplate(fileName, fileContent());
}