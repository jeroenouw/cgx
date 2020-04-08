import sinon from 'sinon';
import { expect } from 'chai';
import { CGX } from './cgx';
import * as logger from './utils/logger.util';
import * as questions from './questions';
import { ProviderValue, Answer, LicenseValue } from './models/choice';
import * as actions from './actions';
import Bluebird from 'bluebird';

describe('src/cgx', () => {
    let sandbox: sinon.SinonSandbox;
    let showTitleAndBannerStub: sinon.SinonStub;
    let providerQuestionStub: sinon.SinonStub;

    const mockAnswer: Answer = {
        files: {},
        userName: 'someUser',
        licenses: LicenseValue.MIT,
        provider: ProviderValue.GITHUB,
        overwrite: false,
    }
    beforeEach(() => {
        sandbox = sinon.createSandbox();
        showTitleAndBannerStub = sandbox.stub(logger, 'showTitleAndBanner');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should always call showTitleAndBanner and providerQuestion', async () => {
        providerQuestionStub = sandbox.stub(questions, 'providerQuestion').resolves(mockAnswer);
        await CGX();
        expect(showTitleAndBannerStub).to.be.calledOnce;
        expect(providerQuestionStub).to.be.calledOnce;
    });
        const cases = [
            {
                name: 'gitlab',
                provider: ProviderValue.GITLAB,
                stub: sinon.stub(actions, 'gitlabActions'),
                function: actions.gitlabActions,
            },
            {
                name: 'github',
                provider: ProviderValue.GITHUB,
                stub: sinon.stub(actions, 'githubActions'),
                function: actions.githubActions,
            },
            {
                name: 'bitbucket',
                provider: ProviderValue.BITBUCKET,
                stub: sinon.stub(actions, 'bitbucketActions'),
                function: actions.bitbucketActions,
            },
            {
                name: 'codecommit',
                provider: ProviderValue.CODECOMMIT,
                stub: sinon.stub(actions, 'codecommitActions'),
                function: actions.codecommitActions,
            },
        ];
        Bluebird.each(cases, (caseItem) => {
            it(`should return ${caseItem.name} actions if the choice is made for it`, async () => {
                sandbox = sinon.createSandbox();
                mockAnswer.provider = caseItem.provider;
                showTitleAndBannerStub = sandbox.stub(logger, 'showTitleAndBanner');
                providerQuestionStub = sandbox.stub(questions, 'providerQuestion').resolves(mockAnswer);
                const cgx: Promise<any> = await CGX();
                expect(caseItem.stub).to.be.calledOnce;
                expect(cgx).to.be.equal(caseItem.function())
                sandbox.restore();
            })
        });
});
