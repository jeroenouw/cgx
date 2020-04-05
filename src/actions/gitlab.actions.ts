import { codeOfConduct, contributing, license, toDo, readme, changelog } from '../templates/universal';
import { UniversalChoiceValue, GitlabChoiceValue, Answer } from '../models/choice';
import { bug, ciTemplate, featureProposal, mergeRequest } from '../templates/gitlab';
import { gitlabFileQuestion } from '../questions';
import { ConsoleMessage } from '../models/console-message';
import { showInfo } from '../utils/logger.util';

export async function gitlabActions(): Promise<any> {
    const gitlabFileAnswer: Answer = await gitlabFileQuestion();
    
    switch (gitlabFileAnswer.files) {
        case UniversalChoiceValue.ALL: {
            showInfo(ConsoleMessage.START_GENERATING);

            contributing();
            codeOfConduct();
            ciTemplate();
            bug();
            featureProposal();
            return mergeRequest();
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
        case GitlabChoiceValue.CI: {
            return ciTemplate();
        }
        case GitlabChoiceValue.BUG: {
            return bug();
        }
        case GitlabChoiceValue.FEATURE_PROPOSAL: {
            return featureProposal();
        }
        case GitlabChoiceValue.MERGE_REQUEST: {
            return mergeRequest();
        }
    }
}
