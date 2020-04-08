import sinon from 'sinon';
import { expect } from 'chai';
import * as questions from '../questions';
import { Answer, ProviderValue, UniversalChoiceValue, LicenseValue, GitlabChoiceValue } from '../models/choice';
import * as gitlabTemplates from '../templates/gitlab';
import Bluebird from 'bluebird';
import * as logger from '../utils/logger.util';
import { ConsoleMessage } from '../models/console-message';
import { gitlabActions } from './gitlab.actions';

describe('src/actions/gitlab.actions', () => {
    let sandbox: sinon.SinonSandbox;
    let gitlabFileQuestionStub: sinon.SinonStub;

    const mockAnswer: Answer = {
        files: {},
        userName: 'someUser',
        licenses: LicenseValue.MIT,
        provider: ProviderValue.GITLAB,
        overwrite: false,
    }

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should always call gitlabFunction', async () => {
        gitlabFileQuestionStub = sandbox.stub(questions, 'gitlabFileQuestion').resolves(mockAnswer);
        await gitlabActions();
        expect(gitlabFileQuestionStub).to.be.called;
    });

    context('actions', () => {
        const cases = [
            {
                name: 'ciTemplate',
                files: GitlabChoiceValue.CI,
                stub: sinon.stub(gitlabTemplates, 'ciTemplate'),
                function: gitlabTemplates.ciTemplate,
            },
            {
                name: 'bug',
                files: GitlabChoiceValue.BUG,
                stub: sinon.stub(gitlabTemplates, 'bug'),
                function: gitlabTemplates.bug,
            },
            {
                name: 'featureProposal',
                files: GitlabChoiceValue.FEATURE_PROPOSAL,
                stub: sinon.stub(gitlabTemplates, 'featureProposal'),
                function: gitlabTemplates.featureProposal,
            },
            {
                name: 'mergeRequest',
                files: GitlabChoiceValue.MERGE_REQUEST,
                stub: sinon.stub(gitlabTemplates, 'mergeRequest'),
                function: gitlabTemplates.mergeRequest,
            },
        ];

        it(`should call showInfo`, async () => {
            mockAnswer.files = UniversalChoiceValue.ALL;
            const showInfoStub = sandbox.stub(logger, 'showInfo');
            gitlabFileQuestionStub = sandbox.stub(questions, 'gitlabFileQuestion').resolves(mockAnswer);
            await gitlabActions()
            expect(showInfoStub).to.be.calledOnceWithExactly(ConsoleMessage.START_GENERATING);
        })

        Bluebird.each(cases, (caseItem) => {
            it(`should return ${caseItem.name} template if chosen`, async () => {
                sandbox = sinon.createSandbox();
                mockAnswer.files = caseItem.files;
                gitlabFileQuestionStub = sandbox.stub(questions, 'gitlabFileQuestion').resolves(mockAnswer);
                const gitlab: Promise<any> = await gitlabActions()
                expect(caseItem.stub).to.be.calledOnce;
                expect(gitlab).to.equal(caseItem.function());
                sandbox.restore();
            })
        });
    })
});

