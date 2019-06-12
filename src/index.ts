import 'reflect-metadata';
import { Container } from 'inversify';
import { CGX } from './cgx';
import { Logger } from './utils/logger.util';
import { CodeOfConduct } from './templates/github/code-of-conduct.template';
import { License } from './templates/universal/license.template';
import { Checker } from './utils/checker.util';
import { Contributing } from './templates/universal/contributing.template';
import { BugReport } from './templates/github/bug-report.template';
import { FeatureRequest } from './templates/github/feature-request.template';
import { PullRequest } from './templates/github/pull-request.template';
import { DefaultTemplate } from './templates/default/default.template';
import { MergeRequest } from './templates/gitlab/merge-request.template';
import { Bug } from './templates/gitlab/bug.template';
import { CITemplate } from './templates/gitlab/ci.template';
import { FeatureProposal } from './templates/gitlab/feature-proposal.template';

export function index(): CGX {
  const container: Container = new Container();

  // Utils
  container.bind<Logger>('Logger').to(Logger).inSingletonScope();
  container.bind<Checker>('Checker').to(Checker).inSingletonScope();

  // Default Template
  container.bind<DefaultTemplate>('DefaultTemplate').to(DefaultTemplate).inSingletonScope();

  // Github & Gitlab Templates (universal)
  container.bind<License>('License').to(License).inSingletonScope();
  container.bind<Contributing>('Contributing').to(Contributing).inSingletonScope();

  // Github Templates
  container.bind<CodeOfConduct>('CodeOfConduct').to(CodeOfConduct).inSingletonScope();
  container.bind<BugReport>('BugReport').to(BugReport).inSingletonScope();
  container.bind<FeatureRequest>('FeatureRequest').to(FeatureRequest).inSingletonScope();
  container.bind<PullRequest>('PullRequest').to(PullRequest).inSingletonScope();

  // Gitlab Templates
  container.bind<CITemplate>('CITemplate').to(CITemplate).inSingletonScope();
  container.bind<FeatureProposal>('FeatureProposal').to(FeatureProposal).inSingletonScope();
  container.bind<Bug>('Bug').to(Bug).inSingletonScope();
  container.bind<MergeRequest>('MergeRequest').to(MergeRequest).inSingletonScope();

  // CGX
  container.bind<CGX>('CGX').to(CGX).inSingletonScope();

  return container.get<CGX>('CGX');
};

index();