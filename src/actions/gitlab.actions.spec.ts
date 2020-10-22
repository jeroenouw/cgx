import sinon from 'sinon';
import { expect } from 'chai';
import * as questions from '../questions/gitlab-file.question';
import { Answer, ProviderValue, UniversalChoiceValue, LicenseValue, GitlabChoiceValue } from '../models/choice';
import * as ci from '../templates/gitlab/ci.template';
import * as bug from '../templates/gitlab/bug.template';
import * as featureProposal from '../templates/gitlab/feature-proposal.template';
import * as mergeRequest from '../templates/gitlab/merge-request.template';
import * as contributing from '../templates/universal/contributing.template';
import * as codeOfConduct from '../templates/universal/code-of-conduct.template';

import * as logger from '../utils/logger.util';
import { ConsoleMessage } from '../models/console-message';
import { gitlabActions } from './gitlab.actions';

describe('src/actions/gitlab.actions', () => {
    let sandbox: sinon.SinonSandbox;
    let gitlabFileQuestionStub: sinon.SinonStub;
    let ciActionStub: sinon.SinonStub;
    let bugTemplateStub: sinon.SinonStub;
    let featureProposalStub: sinon.SinonStub;
    let mergeRequestStub: sinon.SinonStub;
    let showInfoStub: sinon.SinonStub;
    let contributingStub: sinon.SinonStub;
    let codeOfConductStub: sinon.SinonStub;


    const mockAnswer: Answer = {
        files: {},
        userName: 'someUser',
        licenses: LicenseValue.MIT,
        provider: ProviderValue.GITLAB,
        overwrite: false,
    }

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        showInfoStub = sandbox.stub(logger, 'showInfo');
        gitlabFileQuestionStub = sandbox.stub(questions, 'gitlabFileQuestion').resolves(mockAnswer);
        ciActionStub = sandbox.stub(ci, 'ciTemplate');
        bugTemplateStub = sandbox.stub(bug, 'bug');
        featureProposalStub = sandbox.stub(featureProposal, 'featureProposal');
        mergeRequestStub = sandbox.stub(mergeRequest, 'mergeRequest');
        contributingStub = sandbox.stub(contributing, 'contributing');
        codeOfConductStub = sandbox.stub(codeOfConduct, 'codeOfConduct');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should always call gitlabFunction', async () => {
        await gitlabActions();
        expect(gitlabFileQuestionStub).to.be.called;
    });

    context('actions', () => {

        it(`should call showInfo`, async () => {
            mockAnswer.files = UniversalChoiceValue.ALL;
            await gitlabActions()
            expect(showInfoStub).to.be.calledOnceWithExactly(ConsoleMessage.START_GENERATING);
        })

        it(`should call ci actions when ci-templates requested`, async () => {
            mockAnswer.files = GitlabChoiceValue.CI;
            await gitlabActions()
            expect(ciActionStub).to.be.calledOnce;
        })

        it(`should call bug actions when bug-templates requested`, async () => {
            mockAnswer.files = GitlabChoiceValue.BUG;
            await gitlabActions()
            expect(bugTemplateStub).to.be.calledOnce;
        })

        it(`should call feature-proposal actions when feature-proposal-templates requested`, async () => {
            mockAnswer.files = GitlabChoiceValue.FEATURE_PROPOSAL;
            await gitlabActions()
            expect(featureProposalStub).to.be.calledOnce;
        })

        it(`should call merge-request actions when merge-request-templates requested`, async () => {
            mockAnswer.files = GitlabChoiceValue.MERGE_REQUEST;
            await gitlabActions()
            expect(mergeRequestStub).to.be.calledOnce;
        })

    })
});

