import 'reflect-metadata';
import { Container } from 'inversify';
import { CGX } from './cgx';
import { Logger } from './utils/logger.util';
import { Checker } from './utils/checker.util';
import { DefaultTemplate } from './templates/default/default.template';
import { CodeOfConduct, Contributing, License, ToDo, Readme, Changelog } from './templates/universal';
import { BugReport, FeatureRequest, PullRequest, Security } from './templates/github';
import { Bug, CITemplate, FeatureProposal, MergeRequest } from './templates/gitlab';
import { BitbucketActions } from './actions/bitbucket.actions';
import { GitlabActions } from './actions/gitlab.actions';
import { GithubActions } from './actions/github.actions';
import { CodecommitActions } from './actions/codecommit.actions';
import { Appspec, Buildspec } from './templates/codecommit';

export function index(): CGX {
  const container: Container = new Container();

  // Utils
  container.bind<Logger>('Logger').to(Logger).inSingletonScope();
  container.bind<Checker>('Checker').to(Checker).inSingletonScope();

  // Actions
  container.bind<BitbucketActions>('BitbucketActions').to(BitbucketActions).inSingletonScope();
  container.bind<GitlabActions>('GitlabActions').to(GitlabActions).inSingletonScope();
  container.bind<GithubActions>('GithubActions').to(GithubActions).inSingletonScope();
  container.bind<CodecommitActions>('CodecommitActions').to(CodecommitActions).inSingletonScope();

  // Default Template
  container.bind<DefaultTemplate>('DefaultTemplate').to(DefaultTemplate).inSingletonScope();

  // Universal Templates (Github, Gitlab, CodeCommit and Bitbucket)
  container.bind<License>('License').to(License).inSingletonScope();
  container.bind<Contributing>('Contributing').to(Contributing).inSingletonScope();
  container.bind<CodeOfConduct>('CodeOfConduct').to(CodeOfConduct).inSingletonScope();
  container.bind<ToDo>('ToDo').to(ToDo).inSingletonScope();
  container.bind<Readme>('Readme').to(Readme).inSingletonScope();
  container.bind<Changelog>('Changelog').to(Changelog).inSingletonScope();

  // Github Templates
  container.bind<BugReport>('BugReport').to(BugReport).inSingletonScope();
  container.bind<FeatureRequest>('FeatureRequest').to(FeatureRequest).inSingletonScope();
  container.bind<PullRequest>('PullRequest').to(PullRequest).inSingletonScope();
  container.bind<Security>('Security').to(Security).inSingletonScope();

  // Gitlab Templates
  container.bind<CITemplate>('CITemplate').to(CITemplate).inSingletonScope();
  container.bind<FeatureProposal>('FeatureProposal').to(FeatureProposal).inSingletonScope();
  container.bind<Bug>('Bug').to(Bug).inSingletonScope();
  container.bind<MergeRequest>('MergeRequest').to(MergeRequest).inSingletonScope();

  // CodeCommit Templates
  container.bind<Appspec>('Appspec').to(Appspec).inSingletonScope();
  container.bind<Buildspec>('Buildspec').to(Buildspec).inSingletonScope();

  // Bitbucket - in future versions
  // 

  // CGX
  container.bind<CGX>('CGX').to(CGX).inSingletonScope();

  return container.get<CGX>('CGX');
};

index();