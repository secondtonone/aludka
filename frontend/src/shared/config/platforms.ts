export const platforms = ['web', 'tg'] as const;

export type Platform = typeof platforms[number];
