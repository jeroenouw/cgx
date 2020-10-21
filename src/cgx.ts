import { Answer, ProviderValue } from './models/choice';
import { githubActions, gitlabActions, bitbucketActions, codecommitActions } from './actions';
import { providerQuestion } from './questions';
import { showTitleAndBanner } from './utils/logger.util';

export async function CGX(): Promise<any> {
    showTitleAndBanner();

    const providerAnswer: Answer = await providerQuestion();

    if (providerAnswer.provider === ProviderValue.GITHUB) {
        return await githubActions();
    } else if (providerAnswer.provider === ProviderValue.GITLAB)  {
        return await gitlabActions();
    } else if (providerAnswer.provider === ProviderValue.BITBUCKET)  {
        return await bitbucketActions();
    } else if (providerAnswer.provider === ProviderValue.CODECOMMIT)  {
        return await codecommitActions();
    }
}
