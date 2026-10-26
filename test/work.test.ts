import { describe, it, expect } from 'vitest';
import { flagships } from '../src/data/flagships';
import { getWorkStaticPaths, matchWorkRoute } from '../src/lib/work';

describe('Flagship Case Studies and Static Paths', () => {
  it('generates static paths for all 3 flagship projects', () => {
    const paths = getWorkStaticPaths();

    expect(paths).toHaveLength(3);
    const slugs = paths.map((p) => p.params.slug);
    expect(slugs).toEqual(['machinewise', 'mqtt-go', 'ctq-extraction']);

    paths.forEach((p) => {
      expect(p.props.flagship).toBeDefined();
      expect(p.props.flagship.slug).toBe(p.params.slug);
    });
  });

  it('validates MachineWise enterprise confidentiality invariants', () => {
    const mw = flagships.find((f) => f.slug === 'machinewise');
    expect(mw).toBeDefined();
    // Invariant: MachineWise MUST have no public/private repo link
    expect(mw?.repoUrl).toBeUndefined();
    expect(mw?.badge).toContain('Enterprise');
    expect(mw?.caseStudy.architectureKey).toBe('machinewise');
  });

  it('validates open source flagship repository links', () => {
    const mqttGo = flagships.find((f) => f.slug === 'mqtt-go');
    expect(mqttGo).toBeDefined();
    expect(mqttGo?.badge).toBe('Open Source');
    expect(mqttGo?.repoUrl).toBe('https://github.com/Eklavya-San/mqttgo');
    expect(mqttGo?.caseStudy.architectureKey).toBe('mqtt-go');

    const ctq = flagships.find((f) => f.slug === 'ctq-extraction');
    expect(ctq).toBeDefined();
    expect(ctq?.badge).toBe('Open Source');
    expect(ctq?.repoUrl).toBe('https://github.com/Eklavya-San/CTQ-extraction');
    expect(ctq?.caseStudy.architectureKey).toBe('ctq-extraction');
  });

  it('ensures each case study contains Problem, Decision, Architecture, and Results', () => {
    for (const project of flagships) {
      expect(project.title).toBeTruthy();
      expect(project.tagline).toBeTruthy();
      expect(project.stack.length).toBeGreaterThanOrEqual(3);
      expect(project.metrics.length).toBeGreaterThanOrEqual(2);

      const cs = project.caseStudy;
      expect(cs.problem.length).toBeGreaterThan(20);
      expect(cs.decision.length).toBeGreaterThan(20);
      expect(['machinewise', 'mqtt-go', 'ctq-extraction']).toContain(cs.architectureKey);
      expect(cs.results.length).toBeGreaterThanOrEqual(2);

      for (const res of cs.results) {
        expect(res.trim().length).toBeGreaterThan(10);
      }
    }
  });

  it('verifies route matching logic and isolates section anchors', () => {
    // Valid flagship routes
    expect(matchWorkRoute('/work/machinewise')?.title).toBe('MachineWise');
    expect(matchWorkRoute('/work/mqtt-go')?.title).toBe('MQTT-GO');
    expect(matchWorkRoute('/work/ctq-extraction')?.title).toBe('CTQ-Extraction');
    expect(matchWorkRoute('/work/machinewise/')?.title).toBe('MachineWise');

    // Section anchors MUST NOT be treated as /work/ routes
    expect(matchWorkRoute('#work')).toBeNull();
    expect(matchWorkRoute('/#work')).toBeNull();
    expect(matchWorkRoute('#experience')).toBeNull();
    expect(matchWorkRoute('#skills')).toBeNull();
    expect(matchWorkRoute('#contact')).toBeNull();

    // Unknown or home routes
    expect(matchWorkRoute('/')).toBeNull();
    expect(matchWorkRoute('/work/unknown-project')).toBeNull();
  });

  it('constructs correct metadata and OG image for each static route', () => {
    for (const project of flagships) {
      const pageTitle = `${project.title} — Case Study | Eklavya Ghodake`;
      const pageDescription = project.tagline;
      const ogImage = `/og/${project.slug}.png`;

      expect(pageTitle).toContain(project.title);
      expect(pageTitle).toContain('Eklavya Ghodake');
      expect(pageDescription).toBe(project.tagline);
      expect(ogImage).toBe(`/og/${project.slug}.png`);
    }
  });
});
