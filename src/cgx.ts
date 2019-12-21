import { injectable, inject } from 'inversify';
import { Logger } from './utils/logger.util';
import { Answer, ProviderValue } from './models/choice';
import { GithubActions, GitlabActions, BitbucketActions } from './actions';
import { providerQuestion } from './questions';

@injectable()
export class CGX {

    constructor(@inject('Logger') private logger: Logger,
                @inject('GithubActions') private githubActions: GithubActions,
                @inject('GitlabActions') private gitlabActions: GitlabActions,
                @inject('BitbucketActions') private bitbucketActions: BitbucketActions) {
        this.logger.showTitleAndBanner();
        this.executeCGX();
    }

    public async executeCGX(): Promise<any> {
        let providerAnswer: Answer = await providerQuestion();

        if (providerAnswer.provider === ProviderValue.GITHUB) {
            return this.githubActions.runActions();
        } else if (providerAnswer.provider === ProviderValue.GITLAB)  {
            return this.gitlabActions.runActions();
        } else if (providerAnswer.provider === ProviderValue.BITBUCKET)  {
            return this.bitbucketActions.runActions();
        }
    }
}