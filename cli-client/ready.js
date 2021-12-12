#! /usr/bin/env node

const program = require('commander');
const commands = require('./commands');
const qs = require('qs');
const { prompt } = require('inquirer');
const { loginQuestions } = require('./inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const clear = require('clear');

clear();

console.log(
  chalk.cyan(
    figlet.textSync('A Functional CLI (I hope)', {
      horizontalLayout: 'full',
    })
  )
);

program.version('1.0.0').description('Command Line Interface for REST API');

// healthcheck
program
  .command('healthcheck')
  .alias('h')
  .description('Check the end to end connectivity of the system')
  .action(commands.getHealthcheck);

// reset sessions
program
  .command('resetsessions')
  .alias('Reset')
  .description('Reset all sessions.')
  .action(commands.getResetSessions);

// login and save the token to {HOME}\softeng20bAPI.token
// program
//   .command('login <username> <password>')
//   .description('Logs in to the system.')
//   .action(commands.postLogin);

// login and save the token to {HOME}\softeng20bAPI.token with prompt
program
  .command('login')
  .description('Log into the system.')
  .action(() => {
    prompt(loginQuestions).then(answers => commands.postLogin(answers));
  });

//logout
program
  .command('logout')
  .description('Logs out of the system and deletes the token file.')
  .action(commands.postLogout);

//SessionsPerPoint
program
  .command('SessionsPerPoint <point> <datefrom> <dateto> <format>')
  .description(
    'Returns information for the sessions that happened in the specified point between the specified dates.'
  )
  .action(commands.postSessionsPerPoint);

//SessionsPerStation
program
  .command('SessionsPerStation <station> <datefrom> <dateto> <format>')
  .description(
    'Returns information for the sessions that happened in this Station between the specified dates.'
  )
  .action(commands.postSessionsPerStation);

// SessionsPerEv
program
  .command('SessionsPerEv <ev> <datefrom> <dateto> <format>')
  .description(
    'Returns information for the sessions that happened for this EV between the specified dates.'
  )
  .action(commands.postSessionsPerEv);

//SessionsPerProvider
program
  .command('SessionsPerProvider <provider> <datefrom> <dateto> <format>')
  .description(
    'Returns information for the sessions that happened for this provider between the specified dates.'
  )
  .action(commands.postSessionsPerProvider);

// Admin scope
program
  .command('Admin')
  .option('--username <username>', 'Name of the user')
  .option('--passw <password>', 'Password of the user')
  .option('--email <email>', 'E-mail of the user')
  .option('--rights <rights>', 'rigths of the user')
  .option('--source <source>', 'Location of the file')
  .option('--usermod', 'To create or change the user.')
  .option('--users', 'To see a user status.')
  .option('--sessionupd', 'To add sessions form a csv file.')
  .description(
    'Admin endpoints. Options: --username,--passw, --email,--rights, --source, --usermod(flag), --users(flag), --sessionupd(flag) '
  )
  .action(commands.usermod);

program.parse(process.argv);
