import sinon from 'sinon';
import { expect } from 'chai';
import * as questions from '../questions';
import { Answer, ProviderValue, UniversalChoiceValue, LicenseValue, GithubChoiceValue } from '../models/choice';
import * as githubTemplates from '../templates/github';
import Bluebird from 'bluebird';
import * as logger from '../utils/logger.util';
import { ConsoleMessage } from '../models/console-message';
import { githubActions } from './github.actions';

describe('src/actions/github.actions', () => {
    let sandbox: sinon.SinonSandbox;
    let githubFileQuestionStub: sinon.SinonStub;

    const mockAnswer: Answer = {
        files: {},
        userName: 'someUser',
        licenses: LicenseValue.MIT,
        provider: ProviderValue.GITHUB,
        overwrite: false,
    }

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should always call githubFunction', async () => {
        githubFileQuestionStub = sandbox.stub(questions, 'githubFileQuestion').resolves(mockAnswer);
        await githubActions();
        expect(githubFileQuestionStub).to.be.called;
    });

    context('actions', () => {
        const cases = [
            {
                name: 'bugReport',
                files: GithubChoiceValue.BUG_REPORT,
                stub: sinon.stub(githubTemplates, 'bugReport'),
                function: githubTemplates.bugReport,
            },
            {
                name: 'featureRequest',
                files: GithubChoiceValue.FEATURE_REQUEST,
                stub: sinon.stub(githubTemplates, 'featureRequest'),
                function: githubTemplates.featureRequest,
            },
            {
                name: 'pullRequest',
                files: GithubChoiceValue.PULL_REQUEST,
                stub: sinon.stub(githubTemplates, 'pullRequest'),
                function: githubTemplates.pullRequest,
            },
            {
                name: 'security',
                files: GithubChoiceValue.SECURITY,
                stub: sinon.stub(githubTemplates, 'security'),
                function: githubTemplates.security,
            },
        ];

        it(`should call showInfo`, async () => {
            mockAnswer.files = UniversalChoiceValue.ALL;
            const showInfoStub = sandbox.stub(logger, 'showInfo');
            githubFileQuestionStub = sandbox.stub(questions, 'githubFileQuestion').resolves(mockAnswer);
            await githubActions()
            expect(showInfoStub).to.be.calledOnceWithExactly(ConsoleMessage.START_GENERATING);
        })

        Bluebird.each(cases, (caseItem) => {
            it(`should return ${caseItem.name} template if chosen`, async () => {
                sandbox = sinon.createSandbox();
                mockAnswer.files = caseItem.files;
                githubFileQuestionStub = sandbox.stub(questions, 'githubFileQuestion').resolves(mockAnswer);
                const github: Promise<any> = await githubActions()
                expect(caseItem.stub).to.be.calledOnce;
                expect(github).to.equal(caseItem.function());
                sandbox.restore();
            })
        });
    })
});

