import 'reflect-metadata';
import { Container } from 'inversify';
import { CGX } from './cgx';
import { Logger } from './utils/logger';
import { CodeOfConduct } from './options/code-of-conduct';
import { License } from './options/license';
import { Checker } from './utils/checker';

export function index(): CGX {
  const container: Container = new Container();

  // Utils
  container.bind<Logger>('Logger').to(Logger).inSingletonScope();
  container.bind<Checker>('Checker').to(Checker).inSingletonScope();

  // Options
  container.bind<CodeOfConduct>('CodeOfConduct').to(CodeOfConduct).inSingletonScope();
  container.bind<License>('License').to(License).inSingletonScope();

  // CGX
  container.bind<CGX>('CGX').to(CGX).inSingletonScope();

  return container.get<CGX>('CGX');
};

index();