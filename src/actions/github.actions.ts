import { codeOfConduct, contributing, license, toDo, readme, changelog, dockerFile } from '../templates/universal';
import { bugReport, featureRequest, pullRequest, security, codeqlAnalysis, nodeCI } from '../templates/github';
import { UniversalChoiceValue, GithubChoiceValue, Answer } from '../models/choice';
import { githubFileQuestion } from '../questions';
import { ConsoleMessage } from '../models/console-message';
import { showInfo } from '../utils/logger.util';

export async function githubActions(): Promise<any> {
    const githubFileAnswer: Answer = await githubFileQuestion();

    switch (githubFileAnswer.files) {
        case UniversalChoiceValue.ALL: {
            showInfo(ConsoleMessage.START_GENERATING);

            codeOfConduct();
            contributing();
            bugReport();
            featureRequest();
            codeqlAnalysis();
            nodeCI();
            return pullRequest();
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
        case GithubChoiceValue.SECURITY: {
            return security();
        }
        case GithubChoiceValue.BUG_REPORT: {
            return bugReport();
        }
        case GithubChoiceValue.CODEQL_ANALYSIS: {
            return codeqlAnalysis();
        }
        case GithubChoiceValue.NODE_CI: {
            return nodeCI();
        }
        case GithubChoiceValue.FEATURE_REQUEST: {
            return featureRequest();
        }
        case GithubChoiceValue.PULL_REQUEST: {
            return pullRequest();
        }
        case UniversalChoiceValue.DOCKERFILE: {
            return dockerFile();
        }
    }
}
