import sinon from 'sinon';
import { expect } from 'chai';
import * as questions from '../questions/github-file.question';
import { Answer, ProviderValue, UniversalChoiceValue, LicenseValue, GithubChoiceValue } from '../models/choice';
import * as bugreport from '../templates/github/bug-report.template';
import * as pullrequest from '../templates/github/pull-request.template';
import * as featureRequest from '../templates/github/feature-request.template';
import * as security from '../templates/github/security.template';
import * as contributing from '../templates/universal/contributing.template';
import * as codeOfConduct from '../templates/universal/code-of-conduct.template';
import * as logger from '../utils/logger.util';
import { ConsoleMessage } from '../models/console-message';
import { githubActions } from './github.actions';

describe('src/actions/github.actions', () => {
    let sandbox: sinon.SinonSandbox;
    let githubFileQuestionStub: sinon.SinonStub;
    let bugReportStub: sinon.SinonStub;
    let featureRequestStub: sinon.SinonStub;
    let pullrequestStub: sinon.SinonStub;
    let securityStub: sinon.SinonStub;
    let contributingStub: sinon.SinonStub;
    let codeOfConductStub: sinon.SinonStub;
    let showInfoStub: sinon.SinonStub;


    const mockAnswer: Answer = {
        files: {},
        userName: 'someUser',
        licenses: LicenseValue.MIT,
        provider: ProviderValue.GITHUB,
        overwrite: false,
    }

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        githubFileQuestionStub = sandbox.stub(questions, 'githubFileQuestion').resolves(mockAnswer);
        showInfoStub = sandbox.stub(logger, 'showInfo');
        bugReportStub = sandbox.stub(bugreport, 'bugReport');
        featureRequestStub = sandbox.stub(featureRequest, 'featureRequest');
        pullrequestStub = sandbox.stub(pullrequest, 'pullRequest');
        securityStub = sandbox.stub(security, 'security');
        contributingStub = sandbox.stub(contributing, 'contributing');
        codeOfConductStub = sandbox.stub(codeOfConduct, 'codeOfConduct');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should always call githubFunction', async () => {
        await githubActions();
        expect(githubFileQuestionStub).to.be.called;
    });

    context('actions', () => {


        it(`should call showInfo`, async () => {
            mockAnswer.files = UniversalChoiceValue.ALL;
            await githubActions()
            expect(showInfoStub).to.be.calledOnceWithExactly(ConsoleMessage.START_GENERATING);
            expect(bugReportStub).to.be.calledOnce;
            expect(featureRequestStub).to.be.calledOnce;
            expect(pullrequestStub).to.be.calledOnce;
        })

        it(`should call bugreport if bugreport template is requested`, async () => {
            mockAnswer.files = GithubChoiceValue.BUG_REPORT;
            await githubActions()
            expect(bugReportStub).to.be.calledOnce;
        })

        it(`should call feature request if feature request template is requested`, async () => {
            mockAnswer.files = GithubChoiceValue.FEATURE_REQUEST;
            await githubActions()
            expect(featureRequestStub).to.be.calledOnce;
        })

        it(`should call pull-request if pull-request template is requested`, async () => {
            mockAnswer.files = GithubChoiceValue.PULL_REQUEST;
            await githubActions()
            expect(pullrequestStub).to.be.calledOnce;
        })

        it(`should call security if security template is requested`, async () => {
            mockAnswer.files = GithubChoiceValue.SECURITY;
            await githubActions()
            expect(securityStub).to.be.calledOnce;
        })
    })
});

