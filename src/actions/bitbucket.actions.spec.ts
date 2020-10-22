import sinon from 'sinon';
import { expect } from 'chai';
import * as questions from '../questions/bitbucket-file.question';
import { bitbucketActions } from './bitbucket.actions';
import { Answer, ProviderValue, LicenseValue, UniversalChoiceValue } from '../models/choice';
import * as logger from '../utils/logger.util';
import { ConsoleMessage } from '../models/console-message';
import * as contributing from '../templates/universal/contributing.template';
import * as codeOfConduct from '../templates/universal/code-of-conduct.template';
import * as readme from '../templates/universal/readme.template';
import * as license from '../templates/universal/license.template';
import * as dockerfile from '../templates/universal/docker-file.template';
import * as changelog from '../templates/universal/changelog.template';
import * as todo from '../templates/universal/todo.template';

describe('src/actions/bitbucket.actions', () => {
    let sandbox: sinon.SinonSandbox;
    let bitBucketFileQuestionStub: sinon.SinonStub;
    let contributingStub: sinon.SinonStub;
    let codeOfConductStub: sinon.SinonStub;
    let showInfoStub: sinon.SinonStub;
    let dockerfileStub: sinon.SinonStub;
    let changelogStub: sinon.SinonStub;
    let licenseStub: sinon.SinonStub;
    let todoStub: sinon.SinonStub;
    let readmeStub: sinon.SinonStub;


    const mockAnswer: Answer = {
        files: {},
        userName: 'someUser',
        licenses: LicenseValue.MIT,
        provider: ProviderValue.BITBUCKET,
        overwrite: false,
    }

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        showInfoStub = sandbox.stub(logger, 'showInfo');
        bitBucketFileQuestionStub = sandbox.stub(questions, 'bitbucketFileQuestion').resolves(mockAnswer);
        contributingStub = sandbox.stub(contributing, 'contributing');
        codeOfConductStub = sandbox.stub(codeOfConduct, 'codeOfConduct');
        dockerfileStub = sandbox.stub(dockerfile, 'dockerFile');
        changelogStub = sandbox.stub(changelog, 'changelog');
        licenseStub = sandbox.stub(license, 'license');
        todoStub = sandbox.stub(todo, 'toDo');
        readmeStub = sandbox.stub(readme, 'readme');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should always call bitBucketFunction', async () => {
        await bitbucketActions();
        expect(bitBucketFileQuestionStub).to.be.called;
    });

    context('actions', () => {

        it(`should call showInfo`, async () => {
            mockAnswer.files = UniversalChoiceValue.ALL;
            await bitbucketActions()
            expect(showInfoStub).to.be.calledOnceWithExactly(ConsoleMessage.START_GENERATING);
        })

        it(`should call ci actions when ci-templates requested`, async () => {
            mockAnswer.files = UniversalChoiceValue.README;
            await bitbucketActions()
            expect(readmeStub).to.be.calledOnce;
        })

        it(`should call dockerfile actions when dockerfile-templates requested`, async () => {
            mockAnswer.files = UniversalChoiceValue.DOCKERFILE;
            await bitbucketActions()
            expect(dockerfileStub).to.be.calledOnce;
        })

        it(`should call todo actions when todo-templates requested`, async () => {
            mockAnswer.files = UniversalChoiceValue.TODO;
            await bitbucketActions()
            expect(todoStub).to.be.calledOnce;
        })

        it(`should call contributing actions when contributing-templates requested`, async () => {
            mockAnswer.files = UniversalChoiceValue.CONTRIBUTING;
            await bitbucketActions()
            expect(contributingStub).to.be.calledOnce;
        })


        it(`should call changelog actions when changelog-templates requested`, async () => {
            mockAnswer.files = UniversalChoiceValue.CHANGELOG;
            await bitbucketActions()
            expect(changelogStub).to.be.calledOnce;
        })

        it(`should call code-of-conduct actions when code-of-conduct-templates requested`, async () => {
            mockAnswer.files = UniversalChoiceValue.CODE_OF_CONDUCT;
            await bitbucketActions()
            expect(codeOfConductStub).to.be.calledOnce;
        })

        it(`should call license actions when license-templates requested`, async () => {
            mockAnswer.files = UniversalChoiceValue.LICENSE;
            await bitbucketActions()
            expect(licenseStub).to.be.calledOnce;
        })

    })
});

