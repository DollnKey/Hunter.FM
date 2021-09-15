const { Client, Intents } = require('discord.js')
const client = new Client({ ws: { intents: Intents.ALL } })
const getRadioStations = require('DollnKey/hunter.fm');

client.on('ready', async () => {
    console.log('Online!')
});

client.on('message', async message => {
    if(message.channel.type === 'dm' || message.author.bot) return;
    if(message.content === '/station') {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            getRadioStations()
            .then(stations => {
                var music = stations[0].streams.lowQuality
                connection.play(music)
            }).catch(console.error);
        } else {
            message.channel.send(':x: Você não está em um canal de Voz!!');
        }
    }
});

client.login('Token aqui!!')
