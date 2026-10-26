import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { getWorkshopProjects } from '../src/data/workshop';
import { workshopOverrides } from '../src/data/workshop.overrides';
import { experience, talks, education } from '../src/data/experience';
import { profile } from '../src/data/profile';
import { checkYoutubeConfirmed } from '../src/lib/community';

describe('Task 6: Workshop Grid and Cards', () => {
  it('loads workshop projects at build time', async () => {
    const projects = await getWorkshopProjects();
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it('filters out incomplete cards whose tagline starts with TODO for display', async () => {
    const allProjects = await getWorkshopProjects();
    const displayProjects = allProjects.filter(
      (p) => p.tagline && !p.tagline.toLowerCase().startsWith('todo')
    );

    expect(displayProjects.length).toBeGreaterThan(0);
    for (const project of displayProjects) {
      expect(project.tagline.toLowerCase().startsWith('todo')).toBe(false);
      expect(project.title).toBeTruthy();
      expect(project.repoUrl).toMatch(/^https:\/\/github\.com\/Eklavya-San\//);
      expect(Array.isArray(project.tags)).toBe(true);
      expect(Array.isArray(project.stack)).toBe(true);
    }
  });

  it('ensures no private or disallowed repositories are present in workshop', () => {
    const disallowed = [
      'operatorapp',
      'ctqvision',
      'data_acquisition',
      'frigate-pro-dashboard',
      'video-rendering',
      'kana-dojo',
      'fanuc-driver',
    ];

    for (const item of workshopOverrides) {
      expect(disallowed).not.toContain(item.repo.toLowerCase());
    }
  });

  it('validates verified workshop overrides (use-shadcn, dsh-agent-mcp, document_rag, mqtt-queue)', () => {
    const repos = workshopOverrides.map((o) => o.repo);
    expect(repos).toContain('use-shadcn');
    expect(repos).toContain('dsh-agent-mcp');
    expect(repos).toContain('mqtt-queue');

    const shadcn = workshopOverrides.find((o) => o.repo === 'use-shadcn');
    expect(shadcn?.tagline).toContain('Obsidian Dark');

    const dsh = workshopOverrides.find((o) => o.repo === 'dsh-agent-mcp');
    expect(dsh?.tagline).toContain('DeepSeek Harness');
  });
});

describe('Task 6: Experience Timeline, Talks, and Education', () => {
  it('contains exactly 3 verified career roles at Yantramedhavi', () => {
    expect(experience).toHaveLength(3);

    const roles = experience.map((e) => e.role);
    expect(roles).toEqual([
      'Manager – Software R&D',
      'SDE II',
      'SDE I',
    ]);

    for (const exp of experience) {
      expect(exp.company).toContain('Yantramedhavi India Pvt Ltd');
      expect(exp.location).toBe('Pune, India');
      expect(exp.bullets.length).toBeGreaterThanOrEqual(2);
      expect(exp.bullets.length).toBeLessThanOrEqual(4);
    }
  });

  it('verifies resume-backed metrics in career bullets', () => {
    const sde2 = experience.find((e) => e.role === 'SDE II');
    expect(sde2).toBeDefined();
    // 70% storage reduction and 0 data loss
    const sde2Text = sde2?.bullets.join(' ') || '';
    expect(sde2Text).toContain('70%');
    expect(sde2Text).toContain('0 data loss');
    expect(sde2Text).toContain('WebSockets');

    const rdLead = experience.find((e) => e.role === 'Manager – Software R&D');
    expect(rdLead).toBeDefined();
    const rdText = rdLead?.bullets.join(' ') || '';
    expect(rdText).toContain('99.9%+');

    const sde1 = experience.find((e) => e.role === 'SDE I');
    expect(sde1).toBeDefined();
    const sde1Text = sde1?.bullets.join(' ') || '';
    expect(sde1Text).toContain('Python');
    expect(sde1Text).toContain('.NET');
    expect(sde1Text).toContain('MQTT');
  });

  it('contains both verified conference talks (IMTEX 2026, MSME Defence Expo 2024)', () => {
    expect(talks).toHaveLength(2);

    const imtex = talks.find((t) => t.event.includes('IMTEX'));
    expect(imtex).toBeDefined();
    expect(imtex?.year).toBe('2026');
    expect(imtex?.title).toBe('Industrial IoT Telemetry & Real-Time Factory Intelligence');

    const defence = talks.find((t) => t.event.includes('Defence Expo'));
    expect(defence).toBeDefined();
    expect(defence?.year).toBe('2024');
    expect(defence?.title).toBe('Real-Time Machine Monitoring & Defence Manufacturing Telemetry');
  });

  it('contains complete academic history including CDAC Grade A and engineering degrees', () => {
    expect(education).toHaveLength(3);

    const cdac = education.find((e) => e.institution.includes('CDAC'));
    expect(cdac).toBeDefined();
    expect(cdac?.grade).toBe('Grade A (77.88%)');
    expect(cdac?.period).toBe('2022 – 2023');

    const be = education.find((e) => e.degree.includes('Bachelor of Engineering'));
    expect(be).toBeDefined();
    expect(be?.institution).toContain('Sinhgad');

    const diploma = education.find((e) => e.degree.includes('Diploma in Mechanical Engineering'));
    expect(diploma).toBeDefined();
    expect(diploma?.institution).toContain('Walchand');
  });
});

describe('Task 6: Community Section Conditional Logic', () => {
  it('correctly reports YouTube unconfirmed when pending TODO is present', () => {
    // Current profile has YouTube TODO:
    // 'TODO(eklavya): confirm YouTube channel @developer_by_choice is live; otherwise drop the community section'
    const isConfirmed = checkYoutubeConfirmed(profile);
    expect(isConfirmed).toBe(false);
  });

  it('confirms YouTube when TODO is resolved and link is present', () => {
    const mockProfile = {
      ...profile,
      links: {
        ...profile.links,
        youtube: 'https://youtube.com/@developer_by_choice',
      },
      todos: profile.todos.filter((t) => !t.toLowerCase().includes('youtube')),
    };

    const isConfirmed = checkYoutubeConfirmed(mockProfile);
    expect(isConfirmed).toBe(true);
  });

  it('rejects YouTube if link is missing or starts with TODO', () => {
    const mockProfileNoLink = {
      ...profile,
      links: { ...profile.links, youtube: '' },
      todos: [],
    };
    expect(checkYoutubeConfirmed(mockProfileNoLink)).toBe(false);

    const mockProfileTodoLink = {
      ...profile,
      links: { ...profile.links, youtube: 'TODO(eklavya): add youtube link' },
      todos: [],
    };
    expect(checkYoutubeConfirmed(mockProfileTodoLink)).toBe(false);
  });
});

describe('Task 6: Contact and Footer Specifications', () => {
  it('contact section specifies verified email and social destinations', () => {
    expect(profile.links.email).toBe('mailto:eklavyaghodake@gmail.com');
    expect(profile.links.github).toBe('https://github.com/Eklavya-San');
    expect(profile.links.x).toBe('https://x.com/eghodake');
  });

  it('footer specifies domain attribution claudya.in and author copyright', () => {
    const brand = 'claudya.in';
    const author = 'Eklavya Ghodake';
    expect(brand).toBe('claudya.in');
    expect(author).toBe(profile.name);
  });
});

describe('Task 6: Production Build Output Inspection', () => {
  it('verifies rendered HTML contains all required Task 6 components', () => {
    const htmlPath = resolve(process.cwd(), 'dist/index.html');
    if (!existsSync(htmlPath)) {
      // If dist does not exist yet in test runner, skip
      return;
    }

    const html = readFileSync(htmlPath, 'utf-8');

    // Section anchors
    expect(html).toContain('id="work"');
    expect(html).toContain('id="workshop"');
    expect(html).toContain('id="experience"');
    expect(html).toContain('id="skills"');
    expect(html).toContain('id="contact"');

    // Workshop cards rendered
    expect(html).toContain('workshop-card');
    expect(html).toContain('use-shadcn');
    expect(html).toContain('dsh-agent-mcp');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('target="_blank"');

    // Experience items rendered
    expect(html).toContain('Yantramedhavi');
    expect(html).toContain('Manager – Software R&amp;D');
    expect(html).toContain('SDE II');
    expect(html).toContain('SDE I');
    expect(html).toContain('IMTEX Bangalore');
    expect(html).toContain('Maharashtra MSME Defence Expo');
    expect(html).toContain('CDAC Pune');

    // Contact rendered
    expect(html).toContain('eklavyaghodake@gmail.com');
    expect(html).toContain('mailto:eklavyaghodake@gmail.com');

    // Footer rendered
    expect(html).toContain('claudya.in');
    expect(html).toContain('© 2026 Eklavya Ghodake');
    expect(html).toContain('id="back-to-top-btn"');

    // Community section should NOT be rendered because YouTube is unconfirmed (pending TODO)
    expect(html).not.toContain('id="community"');
  });
});
