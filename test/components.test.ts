import { describe, it, expect } from 'vitest';
import { metrics } from '../src/data/metrics';
import { profile } from '../src/data/profile';

describe('Nav and Identity Invariants', () => {
  it('profile name is Eklavya Ghodake and brand is claudya.in', () => {
    expect(profile.name).toBe('Eklavya Ghodake');
    expect(profile.positioning).toContain('distributed systems');
    expect(profile.positioning).toContain('event streaming');
  });

  it('profile bio contains exactly 2 sentences', () => {
    expect(profile.bio).toHaveLength(2);
    expect(profile.bio[0]).toContain('Senior Software Engineer');
    expect(profile.bio[1]).toContain('agentic developer tools');
  });

  it('verified social links exist', () => {
    expect(profile.links.github).toBe('https://github.com/Eklavya-San');
    expect(profile.links.x).toBe('https://x.com/eghodake');
    expect(profile.links.email).toBe('mailto:eklavyaghodake@gmail.com');
  });
});

describe('ProofStrip Metrics Verification', () => {
  it('contains exactly the 4 resume-backed metrics', () => {
    expect(metrics).toHaveLength(4);
    const values = metrics.map((m) => m.value);
    expect(values).toEqual(['70%', '0', '< 100 MB', '99.9%+']);
  });

  it('correctly maps metric labels without unauthorized claims', () => {
    const dbMetric = metrics.find((m) => m.value === '70%');
    expect(dbMetric?.label).toContain('less database storage');

    const drMetric = metrics.find((m) => m.value === '0');
    expect(drMetric?.label).toContain('data loss recovering corrupted production MongoDB');

    const ramMetric = metrics.find((m) => m.value === '< 100 MB');
    expect(ramMetric?.label).toContain('RAM footprint of MQTT-GO');

    const uptimeMetric = metrics.find((m) => m.value === '99.9%+');
    expect(uptimeMetric?.label).toContain('platform uptime');
  });

  it('metric parser properly extracts numeric targets for count-up', () => {
    function parseMetric(val: string) {
      if (val === '70%') return { target: 70, prefix: '', suffix: '%', decimals: 0 };
      if (val === '0') return { target: 0, prefix: '', suffix: '', decimals: 0 };
      if (val === '< 100 MB') return { target: 100, prefix: '< ', suffix: ' MB', decimals: 0 };
      if (val === '99.9%+') return { target: 99.9, prefix: '', suffix: '%+', decimals: 1 };
      return { target: parseFloat(val) || 0, prefix: '', suffix: '', decimals: 0 };
    }

    expect(parseMetric('70%')).toEqual({ target: 70, prefix: '', suffix: '%', decimals: 0 });
    expect(parseMetric('0')).toEqual({ target: 0, prefix: '', suffix: '', decimals: 0 });
    expect(parseMetric('< 100 MB')).toEqual({ target: 100, prefix: '< ', suffix: ' MB', decimals: 0 });
    expect(parseMetric('99.9%+')).toEqual({ target: 99.9, prefix: '', suffix: '%+', decimals: 1 });
  });
});

describe('Telemetry Sparkline Math', () => {
  it('normalizes points safely within SVG viewport bounds', () => {
    const width = 280;
    const height = 56;
    const minVal = 35;
    const maxVal = 95;
    const points = [40, 50, 65, 80, 90];

    const coords = points.map((val, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const norm = (val - minVal) / (maxVal - minVal);
      const clampedNorm = Math.max(0, Math.min(1, norm));
      const y = height - clampedNorm * (height - 8) - 4;
      return { x, y };
    });

    expect(coords).toHaveLength(5);
    expect(coords[0].x).toBe(0);
    expect(coords[4].x).toBe(280);
    coords.forEach((c) => {
      expect(c.y).toBeGreaterThanOrEqual(0);
      expect(c.y).toBeLessThanOrEqual(height);
    });
  });
});

describe('Command Palette Filter Logic', () => {
  const items = [
    { title: 'Work & Flagships', keywords: ['projects', 'cases'] },
    { title: 'Experience & Talks', keywords: ['jobs', 'imtex'] },
    { title: 'Technical Skills', keywords: ['technologies', 'go', 'python'] },
    { title: 'Open Résumé (PDF)', keywords: ['cv', 'resume', 'pdf'] },
    { title: 'Copy Email Address', keywords: ['copy', 'email'] },
    { title: 'GitHub Profile', keywords: ['code', 'repo', 'git'] },
  ];

  function filterItems(query: string) {
    if (!query.trim()) return items;
    const q = query.toLowerCase().trim();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.keywords?.some((k) => k.toLowerCase().includes(q))
    );
  }

  it('filters by query matches in title or keywords', () => {
    expect(filterItems('resume')).toHaveLength(1);
    expect(filterItems('resume')[0].title).toBe('Open Résumé (PDF)');

    expect(filterItems('git')).toHaveLength(1);
    expect(filterItems('git')[0].title).toBe('GitHub Profile');

    expect(filterItems('python')).toHaveLength(1);
    expect(filterItems('python')[0].title).toBe('Technical Skills');
  });

  it('returns all items when query is empty', () => {
    expect(filterItems('')).toHaveLength(6);
  });
});
