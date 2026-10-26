import type { Metric } from '../types/portfolio';

export const metrics: Metric[] = [
  {
    value: '70%',
    label: 'less database storage after moving to event-driven + aggregated time-series',
    source: 'Resume, SDE II',
    highlight: true,
  },
  {
    value: '0',
    label: 'data loss recovering corrupted production MongoDB clusters',
    source: 'Resume, SDE II',
    highlight: true,
  },
  {
    value: '< 100 MB',
    label: 'RAM footprint of MQTT-GO (vs Electron-based tools)',
    source: 'Resume + mqttgo repo',
  },
  {
    value: '99.9%+',
    label: 'platform uptime across enterprise deployments',
    source: 'Resume, R&D Lead (TODO(eklavya): confirm you are comfortable publishing this)',
  },
];
