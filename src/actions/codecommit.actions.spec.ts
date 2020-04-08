import sinon from 'sinon';
import { expect } from 'chai';
import * as questions from '../questions';
import { Answer, ProviderValue, UniversalChoiceValue, LicenseValue, CodecommitChoiceValue } from '../models/choice';
import * as codecommitTemplates from '../templates/codecommit';
import Bluebird from 'bluebird';
import * as logger from '../utils/logger.util';
import { ConsoleMessage } from '../models/console-message';
import { codecommitActions } from './codecommit.actions';

describe('src/actions/codecommit.actions', () => {
    let sandbox: sinon.SinonSandbox;
    let codecommitFileQuestionStub: sinon.SinonStub;

    const mockAnswer: Answer = {
        files: {},
        userName: 'someUser',
        licenses: LicenseValue.MIT,
        provider: ProviderValue.CODECOMMIT,
        overwrite: false,
    }

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should always call codecommitFunction', async () => {
        codecommitFileQuestionStub = sandbox.stub(questions, 'codecommitFileQuestion').resolves(mockAnswer);
        await codecommitActions();
        expect(codecommitFileQuestionStub).to.be.called;
    });

    context('actions', () => {
        const cases = [
            {
                name: 'appspec',
                files: CodecommitChoiceValue.APPSPEC,
                stub: sinon.stub(codecommitTemplates, 'appspec'),
                function: codecommitTemplates.appspec,
            },
            {
                name: 'buildspec',
                files: CodecommitChoiceValue.BUILDSPEC,
                stub: sinon.stub(codecommitTemplates, 'buildspec'),
                function: codecommitTemplates.buildspec,
            },
        ];

        it(`should call showInfo`, async () => {
            mockAnswer.files = UniversalChoiceValue.ALL;
            const showInfoStub = sandbox.stub(logger, 'showInfo');
            codecommitFileQuestionStub = sandbox.stub(questions, 'codecommitFileQuestion').resolves(mockAnswer);
            await codecommitActions()
            expect(showInfoStub).to.be.calledOnceWithExactly(ConsoleMessage.START_GENERATING);
        })

        Bluebird.each(cases, (caseItem) => {
            it(`should return ${caseItem.name} template if chosen`, async () => {
                sandbox = sinon.createSandbox();
                mockAnswer.files = caseItem.files;
                codecommitFileQuestionStub = sandbox.stub(questions, 'codecommitFileQuestion').resolves(mockAnswer);
                const codecommit: Promise<any> = await codecommitActions()
                expect(caseItem.stub).to.be.calledOnce;
                expect(codecommit).to.equal(caseItem.function());
                sandbox.restore();
            })
        });
    })
});

