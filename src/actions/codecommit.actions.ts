import { codeOfConduct, contributing, license, toDo, readme, changelog, dockerFile } from '../templates/universal';
import { appspec, buildspec } from '../templates/codecommit';
import { UniversalChoiceValue, CodecommitChoiceValue, Answer } from '../models/choice';
import { codecommitFileQuestion } from '../questions';
import { ConsoleMessage } from '../models/console-message';
import { showInfo } from '../utils/logger.util';

export async function codecommitActions(): Promise<any> {
    const codecommitFileAnswer: Answer = await codecommitFileQuestion();

    switch (codecommitFileAnswer.files) {
        case UniversalChoiceValue.ALL: {
            showInfo(ConsoleMessage.START_GENERATING);

            codeOfConduct();
            contributing();
            appspec();
            return buildspec();
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
        case CodecommitChoiceValue.APPSPEC: {
            return appspec();
        }
        case CodecommitChoiceValue.BUILDSPEC: {
            return buildspec();
        }
        case UniversalChoiceValue.DOCKERFILE: {
            return dockerFile();
        }
    }
}