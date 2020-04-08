import { codeOfConduct, contributing, license, toDo, readme, changelog } from '../templates/universal';
import { UniversalChoiceValue,Answer } from '../models/choice';
import { bitbucketFileQuestion } from '../questions';
import { ConsoleMessage } from '../models/console-message';
import { showInfo } from '../utils/logger.util';

export async function bitbucketActions(): Promise<any>  {
    const bitbucketFileAnswer: Answer = await bitbucketFileQuestion();

    switch (bitbucketFileAnswer.files) {
        case UniversalChoiceValue.ALL: {
            showInfo(ConsoleMessage.START_GENERATING);

            contributing();
            return codeOfConduct();
        }
        case UniversalChoiceValue.LICENSE: {
            return license();
        }
        case UniversalChoiceValue.CHANGELOG: {
            return changelog();
        }
        case UniversalChoiceValue.CONTRIBUTING: {
            return contributing();
        }
        case UniversalChoiceValue.CODE_OF_CONDUCT: {
            return codeOfConduct();
        }
        case UniversalChoiceValue.TODO: {
            return toDo();
        }
        case UniversalChoiceValue.README: {
            return readme();
        }
    }
}
