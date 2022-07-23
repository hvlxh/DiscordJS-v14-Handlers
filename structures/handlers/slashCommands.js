const { glob } = require('glob');
const { promisify } = require('node:util');
const promiseGlob = promisify(glob);
const Ascii = require('ascii-table');

/**
 * 
 * @param {import('../../index')} client 
 */
module.exports = async (client) => {
    const slashCommandsTable = new Ascii('Slash Commands').setHeading('Name', 'Status', 'Reason');
    (await promiseGlob(`${process.cwd().replace(/\\/g, '/')}/commands/slash/*/*.js`)).map(async (file) => {
        const command = require(file);
        const P = file.split('/');
        let name;

        if(!command.name || !command.run) 
        return slashCommandsTable.addRow(`${command.name || `${P[P.length - 1]}/${P[P.length - 2]}`}`, 'Failed', 'Missing Name/Run');

        if(command.nick) 
        name = `${command.name} (${command.nick})`
        else
        name = command.name;

        client.slashCommands.set(command.name, command);
        slashCommandsTable.addRow(name, 'Success');
    });
    console.log(slashCommandsTable.toString());
};