import 'reflect-metadata';
import { Container } from 'inversify';
import { CGX } from './cgx';
import { Logger } from './utils/logger';
import { CodeOfConduct } from './options/github/code-of-conduct';
import { License } from './options/universal/license';
import { Checker } from './utils/checker';
import { Contributing } from './options/universal/contributing';
import { BugReport } from './options/github/bug-report';
import { FeatureRequest } from './options/github/feature-request';
import { PullRequestTemplate } from './options/github/pull-request-template';
import { DefaultTemplate } from './options/default/default.template';
import { MergeRequestTemplate } from './options/gitlab/merge-request-template';
import { Bug } from './options/gitlab/bug';
import { CITemplate } from './options/gitlab/ci-template';
import { FeatureProposal } from './options/gitlab/feature-proposal';

export function index(): CGX {
  const container: Container = new Container();

  // Utils
  container.bind<Logger>('Logger').to(Logger).inSingletonScope();
  container.bind<Checker>('Checker').to(Checker).inSingletonScope();

  // Default Template
  container.bind<DefaultTemplate>('DefaultTemplate').to(DefaultTemplate).inSingletonScope();

  // Github & Gitlab Options (universal)
  container.bind<License>('License').to(License).inSingletonScope();
  container.bind<Contributing>('Contributing').to(Contributing).inSingletonScope();

  // Github Options
  container.bind<CodeOfConduct>('CodeOfConduct').to(CodeOfConduct).inSingletonScope();
  container.bind<BugReport>('BugReport').to(BugReport).inSingletonScope();
  container.bind<FeatureRequest>('FeatureRequest').to(FeatureRequest).inSingletonScope();
  container.bind<PullRequestTemplate>('PullRequestTemplate').to(PullRequestTemplate).inSingletonScope();

  // Gitlab Options
  container.bind<CITemplate>('CITemplate').to(CITemplate).inSingletonScope();
  container.bind<FeatureProposal>('FeatureProposal').to(FeatureProposal).inSingletonScope();
  container.bind<Bug>('Bug').to(Bug).inSingletonScope();
  container.bind<MergeRequestTemplate>('MergeRequestTemplate').to(MergeRequestTemplate).inSingletonScope();

  // CGX
  container.bind<CGX>('CGX').to(CGX).inSingletonScope();

  return container.get<CGX>('CGX');
};

index();