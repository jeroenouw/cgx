import { Answer, LicenseValue, ProviderValue } from './../../models/choice';
import sinon from 'sinon';
import { expect } from 'chai';
import { defaultTemplate } from './default.template';
import * as utils from '../../utils/logger.util';
import * as checkerUtil from '../../utils/checker.util';
import * as overwriteFileQuestion from '../../questions/overwrite-file.question';
import fs from 'fs-extra';

describe('src/templates/default/default.template', () => {
    let sandbox: sinon.SinonSandbox;
    let showGenerateStub: sinon.SinonStub;
    let showCreateStub: sinon.SinonStub;
    let showUpdateStub: sinon.SinonStub;
    let showErrorStub: sinon.SinonStub;
    let checkIfDirExistElseMakeDirStub: sinon.SinonStub;
    let checkExistenceStub: sinon.SinonStub;
    let fileAlreadyExistStub: sinon.SinonStub;
    let overwriteFileQuestionStub: sinon.SinonStub;
    let fsWriteStub: sinon.SinonStub;

    const overwriteAnswer: Answer = {
        files: {},
        userName: 'someUser',
        licenses: LicenseValue.MIT,
        provider: ProviderValue.GITHUB,
        overwrite: true,
    }

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        showGenerateStub = sandbox.stub(utils, 'showGenerate');
        showCreateStub = sandbox.stub(utils, 'showCreate');
        showUpdateStub = sandbox.stub(utils, 'showUpdate');
        showErrorStub = sandbox.stub(utils, 'showError');
        checkIfDirExistElseMakeDirStub = sandbox.stub(checkerUtil, 'checkIfDirExistElseMakeDir');
        overwriteFileQuestionStub = sandbox.stub(overwriteFileQuestion, 'overwriteFileQuestion').resolves(overwriteAnswer);
        fileAlreadyExistStub = sandbox.stub(checkerUtil, 'fileAlreadyExist');
        fsWriteStub = sandbox.stub(fs, 'writeFile');
    });

    afterEach(() => {
        sandbox.restore();
    });

    context('file does not exist', () => {

        it('should create file', async () => {
            checkExistenceStub = sandbox.stub(checkerUtil, 'checkExistence').returns(false);
            await defaultTemplate('myFile.ts', 'content');
            expect(showGenerateStub).to.be.calledOnceWithExactly('myFile.ts');
            expect(checkIfDirExistElseMakeDirStub).to.be.calledOnceWithExactly(false, '');
            expect(checkExistenceStub).to.be.calledOnceWithExactly(`/myFile.ts`);
            expect(fsWriteStub).to.be.calledOnce;
        });

    })
    context('file exists', () => {

        it('should overwrite file after answering true to overwrite question', async () => {
            checkExistenceStub = sandbox.stub(checkerUtil, 'checkExistence').returns(true);
            overwriteAnswer.overwrite = true;
            await defaultTemplate('myFile.ts', 'content');
            expect(showGenerateStub).to.be.calledOnceWithExactly('myFile.ts');
            expect(checkIfDirExistElseMakeDirStub).to.be.calledOnceWithExactly(false, '');
            expect(checkExistenceStub).to.be.calledOnceWithExactly(`/myFile.ts`);
            expect(overwriteFileQuestionStub).to.be.calledOnce;
            expect(fsWriteStub).to.be.calledOnce;
        });

        it('should not overwrite file after answering false to overwrite question', async () => {
            checkExistenceStub = sandbox.stub(checkerUtil, 'checkExistence').returns(true);
            overwriteAnswer.overwrite = false;
            await defaultTemplate('myFile.ts', 'content');
            expect(showGenerateStub).to.be.calledOnceWithExactly('myFile.ts');
            expect(checkIfDirExistElseMakeDirStub).to.be.calledOnceWithExactly(false, '');
            expect(checkExistenceStub).to.be.calledOnceWithExactly(`/myFile.ts`);
            expect(overwriteFileQuestionStub).to.be.calledOnce;
            expect(fileAlreadyExistStub).to.be.calledOnce;
        });
    })

});
