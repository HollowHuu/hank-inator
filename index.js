const { Client, Events, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');

require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMembers] });

client.once(Events.ClientReady, readyClient => {
    console.log(`Logged in as ${readyClient.user.tag}`);
});

client.once(Events.GuildMemberAdd, member => {
    if (hankChecker(member.displayName) || hankChecker(member.user.displayName)) {
        member.guild.members.fetch().then(members => {
            const alertUser = members.get(config.user_id);
            if (alertUser) alertUser.send('HANK HAS BEEN FOUND!! FUCKING RUN!!');
            else console.log('FUCKKKK, SHIT IS BROKEN!! NOT GOOD!!!');
        });
    }
});

client.login(process.env.TOKEN);

/**
 * @param {string} username
 * @returns {boolean}
 */
const hankChecker = (username) => {
    if (!username) return false;

    if (username.toLowerCase().includes('hank')) {
        return true;
    }

    return false;
};