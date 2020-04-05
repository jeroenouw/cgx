import { Answer, ProviderValue } from './models/choice';
import { githubActions, gitlabActions, bitbucketActions, codecommitActions } from './actions';
import { providerQuestion } from './questions';
import { showTitleAndBanner } from './utils/logger.util';

export async function CGX(): Promise<any> {
    showTitleAndBanner();

    const providerAnswer: Answer = await providerQuestion();

    if (providerAnswer.provider === ProviderValue.GITHUB) {
        return githubActions();
    } else if (providerAnswer.provider === ProviderValue.GITLAB)  {
        return gitlabActions();
    } else if (providerAnswer.provider === ProviderValue.BITBUCKET)  {
        return bitbucketActions();
    } else if (providerAnswer.provider === ProviderValue.CODECOMMIT)  {
        return codecommitActions();
    }
}
