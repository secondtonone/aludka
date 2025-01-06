import { transactionsToDb } from './src/transactionsToDb';

async function main() {
  await transactionsToDb(process.env as Record<string, string>);

  console.log('\x1b[32m Done. \x1b[0m');
}

main();
