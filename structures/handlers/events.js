const { glob } = require('glob');
const { promisify } = require('node:util');
const promiseGlob = promisify(glob);
const Ascii = require('ascii-table');
const path = require('node:path');

/**
 * 
 * @param {import('../index')} client 
 */
module.exports = async (client) => {
    const eventsTable = new Ascii('Events').setHeading('Name', 'Status', 'Reason');
    (await promiseGlob(`${process.cwd().replace(/\\/g, '/')}/events/*/*.js`)).map(async (file) => {
        const event = require(file);
        const P = file.split('/');
        let name;

        if(!event.name || !event.run) 
        return eventsTable.addRow(`${event.name || `${P[P.length - 1]}/${P[P.length - 2]}`}`, 'Failed', 'Missing Name/Run');

        if(event.nick) 
        name = `${event.name} (${event.nick})`
        else
        name = event.name;

        if(event.once) 
        client.once(event.name, (...args) => event.run(...args, client))
        else
        client.on(event.name, (...args) => event.run(...args, client));

        eventsTable.addRow(name, 'Success');
    });
    console.log(eventsTable.toString());
};