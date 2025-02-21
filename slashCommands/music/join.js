const { getVoiceConnection } = require("@discordjs/voice");
module.exports = {
    name: "join",
    description: "Joins a Voice Channel",
    run: async (client, interaction, args, prefix) => {
        try {
            if(!interaction.member.voice.channelId) return interaction.reply(({ ephemeral: true, content: "👎 **Please join a Voice-Channel first!**"})).catch(() => null);
            
            const oldConnection = getVoiceConnection(interaction.guild.id);
            if(oldConnection) return interaction.reply({ ephemeral: true, content:`👎 **I'm already connected in <#${oldConnection.joinConfig.channelId}>**!`}).catch(() => null);
            
            await client.joinVoiceChannel(interaction.member.voice.channel);
            interaction.reply({ ephemeral: false, content:"🔗 **Joined your VC!**"}).catch(() => null);
        } catch(e) { 
            console.error(e);
            interaction.reply({ ephemeral: true, content:`❌ Could not join your VC because: \`\`\`${e.interaction || e}`.substring(0, 1950) + `\`\`\``}).catch(() => null);
        }
    },
};