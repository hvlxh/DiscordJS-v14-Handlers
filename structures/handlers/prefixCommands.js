const { glob } = require('glob');
const { promisify } = require('node:util');
const promiseGlob = promisify(glob);
const Ascii = require('ascii-table');

/**
 * 
 * @param {import('../../index')} client 
 */
module.exports = async (client) => {
    const prefixCommandsTable = new Ascii('Prefix Commands').setHeading('Name', 'Status', 'Reason');
    (await promiseGlob(`${process.cwd().replace(/\\/g, '/')}/commands/prefix/*/*.js`)).map(async (file) => {
        const command = require(file);
        const P = file.split('/');
        let name;

        if(!command.name || !command.run) 
        return prefixCommandsTable.addRow(`${command.name || `${P[P.length - 1]}/${P[P.length - 2]}`}`, 'Failed', 'Missing Name/Run');

        if(command.nick) 
        name = `${command.name} (${command.nick})`
        else
        name = command.name;

        client.prefixCommands.set(command.name, command);
        prefixCommandsTable.addRow(name, 'Success');
    });
    console.log(prefixCommandsTable.toString());
};