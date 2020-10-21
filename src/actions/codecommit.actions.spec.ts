import sinon from 'sinon';
import { expect } from 'chai';
import * as questions from '../questions/codecommit-file.question';
import { Answer, ProviderValue, UniversalChoiceValue, LicenseValue, CodecommitChoiceValue } from '../models/choice';
import * as appspec from '../templates/codecommit/appspec.template';
import * as buildspec from '../templates/codecommit/buildspec.template';
import * as contributing from '../templates/universal/contributing.template';
import * as codeOfConduct from '../templates/universal/code-of-conduct.template';
import * as logger from '../utils/logger.util';
import { ConsoleMessage } from '../models/console-message';
import { codecommitActions } from './codecommit.actions';

describe('src/actions/codecommit.actions', () => {
    let sandbox: sinon.SinonSandbox;
    let showInfoStub: sinon.SinonStub;
    let codecommitFileQuestionStub: sinon.SinonStub;
    let appspecStub: sinon.SinonStub;
    let buildspecStub: sinon.SinonStub;
    let contributingStub: sinon.SinonStub;
    let codeOfConductStub: sinon.SinonStub;

    const mockAnswer: Answer = {
        files: {},
        userName: 'someUser',
        licenses: LicenseValue.MIT,
        provider: ProviderValue.CODECOMMIT,
        overwrite: false,
    }

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        codecommitFileQuestionStub = sandbox.stub(questions, 'codecommitFileQuestion').resolves(mockAnswer);
        showInfoStub = sandbox.stub(logger, 'showInfo');
        appspecStub = sandbox.stub(appspec, 'appspec');
        buildspecStub = sandbox.stub(buildspec, 'buildspec');
        contributingStub = sandbox.stub(contributing, 'contributing');
        codeOfConductStub = sandbox.stub(codeOfConduct, 'codeOfConduct');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should always call codecommitFunction', async () => {
        await codecommitActions();
        expect(codecommitFileQuestionStub).to.be.called;
    });

    context('actions', () => {

        it(`should call showInfo and all other actions`, async () => {
            mockAnswer.files = UniversalChoiceValue.ALL;
            await codecommitActions()
            expect(showInfoStub).to.be.calledOnceWithExactly(ConsoleMessage.START_GENERATING);
            expect(codeOfConductStub).to.be.calledOnce;
            expect(contributingStub).to.be.calledOnce;
            expect(appspecStub).to.be.calledOnce;
            expect(buildspecStub).to.be.calledOnce;
        });

        it(`should call appspec actions for appspec selected`, async () => {
            mockAnswer.files = CodecommitChoiceValue.APPSPEC;
            await codecommitActions();
            expect(appspecStub).to.be.calledOnce;
        });

        it(`should call buildspec actions when buildspec selected`, async () => {
            mockAnswer.files = CodecommitChoiceValue.BUILDSPEC;
            await codecommitActions();
            expect(buildspecStub).to.be.calledOnce;
        });

    });
});

