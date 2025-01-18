import { run } from '@grammyjs/runner';
import bot from './bot';

const runner = run(bot);

console.log('\x1b[32m Bot is running! \x1b[0m');

const stopRunner = () => (runner.isRunning() as boolean) && runner.stop();

process.once('SIGINT', stopRunner);
process.once('SIGTERM', stopRunner);
