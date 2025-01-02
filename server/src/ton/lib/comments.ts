export const winTransactionComment = '1969974460' as const;

export const commentsMap = {
  [winTransactionComment]: 'winner',
  join: 'join',
  '2490013878': 'start',
};

export type Comments = keyof typeof commentsMap;
