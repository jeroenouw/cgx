import sinon from 'sinon';
import { expect } from 'chai';
import * as questions from '../questions';
import { bitbucketActions } from './bitbucket.actions';
import { Answer, ProviderValue, LicenseValue, UniversalChoiceValue } from '../models/choice';
import * as templates from '../templates/universal';
import Bluebird from 'bluebird';
import * as logger from '../utils/logger.util';
import { ConsoleMessage } from '../models/console-message';

describe('src/actions/bitbucket.actions', () => {
    let sandbox: sinon.SinonSandbox;
    let bitBucketFileQuestionStub: sinon.SinonStub;

    const mockAnswer: Answer = {
        files: {},
        userName: 'someUser',
        licenses: LicenseValue.MIT,
        provider: ProviderValue.BITBUCKET,
        overwrite: false,
    }

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should always call bitBucketFunction', async () => {
        bitBucketFileQuestionStub = sandbox.stub(questions, 'bitbucketFileQuestion').resolves(mockAnswer);
        await bitbucketActions();
        expect(bitBucketFileQuestionStub).to.be.called;
    });

    context('actions', () => {
        const cases = [
            {
                name: 'readme',
                files: UniversalChoiceValue.README,
                stub: sinon.stub(templates, 'readme'),
                function: templates.readme,
            },
            {
                name: 'todo',
                files: UniversalChoiceValue.TODO,
                stub: sinon.stub(templates, 'toDo'),
                function: templates.toDo,
            },
            {
                name: 'contributing',
                files: UniversalChoiceValue.CONTRIBUTING,
                stub: sinon.stub(templates, 'contributing'),
                function: templates.contributing,
            },
            {
                name: 'changelog',
                files: UniversalChoiceValue.CHANGELOG,
                stub: sinon.stub(templates, 'changelog'),
                function: templates.changelog,
            },
            {
                name: 'code of conduct',
                files: UniversalChoiceValue.CODE_OF_CONDUCT,
                stub: sinon.stub(templates, 'codeOfConduct'),
                function: templates.codeOfConduct,
            },
            {
                name: 'license',
                files: UniversalChoiceValue.LICENSE,
                stub: sinon.stub(templates, 'license'),
                function: templates.license,
            },
        ];

        it(`should call showInfo`, async () => {
            mockAnswer.files = UniversalChoiceValue.ALL;
            const showInfoStub = sandbox.stub(logger, 'showInfo');
            bitBucketFileQuestionStub = sandbox.stub(questions, 'bitbucketFileQuestion').resolves(mockAnswer);
            await bitbucketActions()
            expect(showInfoStub).to.be.calledOnceWithExactly(ConsoleMessage.START_GENERATING);
        })

        Bluebird.each(cases, (caseItem) => {
            it(`should return ${caseItem.name} template if chosen`, async () => {
                sandbox = sinon.createSandbox();
                mockAnswer.files = caseItem.files;
                bitBucketFileQuestionStub = sandbox.stub(questions, 'bitbucketFileQuestion').resolves(mockAnswer);
                const bitBucket: Promise<any> = await bitbucketActions()
                expect(caseItem.stub).to.be.calledOnce;
                expect(bitBucket).to.equal(caseItem.function());
                sandbox.restore();
            })
        });
    })
});

