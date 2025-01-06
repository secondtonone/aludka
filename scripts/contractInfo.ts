import { contractInfoToDb } from './src/contractInfoToDb';

async function main() {
  await contractInfoToDb(process.env as Record<string, string>);

  console.log('\x1b[32m Done. \x1b[0m');
}

main();
