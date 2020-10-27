import * as checkerFunctions from './checker.util';
import sinon from 'sinon';
import { expect } from 'chai';
import * as util from './logger.util';
import fs from 'fs';

describe('src/templates/utils/checker.util', () => {
    let sandbox: sinon.SinonSandbox;
    let showErrorStub: sinon.SinonStub;
    let fsMkdirSyncstub: sinon.SinonStub;
    let fsExistsSyncStub: sinon.SinonStub;
    let processStub: sinon.SinonStub;
    let checkExistenceStub: sinon.SinonStub;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        fsMkdirSyncstub = sandbox.stub(fs, 'mkdirSync');
        fsExistsSyncStub = sandbox.stub(fs, 'existsSync');
        showErrorStub = sandbox.stub(util, 'showError');
        processStub = sandbox.stub(process, 'exit');
    });

    afterEach(() => {
        sandbox.restore();
    });

    context('checkIfDirExistElseMakeDir:', () => {

        it('directory does not exist', async () => {
            checkExistenceStub = sandbox.stub(checkerFunctions, 'checkExistence').returns(true);
            await checkerFunctions.checkIfDirExistElseMakeDir(true, 'somePath');
            expect(checkExistenceStub).to.be.calledOnce;
            expect(checkExistenceStub).to.be.calledOnce;
        });

        it('directory does exist', async () => {
            checkExistenceStub = sandbox.stub(checkerFunctions, 'checkExistence').returns(false);
            await checkerFunctions.checkIfDirExistElseMakeDir(true, 'somePath');
            expect(checkExistenceStub).to.be.calledOnce;
            expect(fsMkdirSyncstub).to.be.calledOnce;
        });

    });

    context('checkExistence:', () => {

        it('checks if given path exists', async () => {
            await checkerFunctions.checkExistence('somePath');
            expect(fsExistsSyncStub).to.be.calledOnce;
        });

    });

    context('fileAlreadyExist:', () => {

        it('should show error and exit the process', async () => {
            await checkerFunctions.fileAlreadyExist('file-name');
            expect(showErrorStub).to.be.calledOnceWith('file-name already exists!');
            expect(processStub).to.be.calledOnceWith(1);
        });

    });
});
