const { getVoiceConnection } = require("@discordjs/voice");
module.exports = {
    name: "join",
    description: "Joins a Voice Channel",
    run: async (client, message, args, prefix) => {
        try {
            if(!message.member.voice.channelId) return message.reply({content: "👎 **Please join a Voice-Channel first!**"}).catch(() => null);
            
            const oldConnection = getVoiceConnection(message.guild.id);
            if(oldConnection) return message.reply({ content: `👎 **I'm already connected in <#${oldConnection.joinConfig.channelId}>**!`}).catch(() => null);
            
            await client.joinVoiceChannel(message.member.voice.channel);
            message.reply({content: "🔗 **Joined your VC!**"}).catch(() => null);
        } catch(e) { 
            console.error(e);
            message.reply({content: `❌ Could not join your VC because: \`\`\`${e.message || e}`.substring(0, 1950) + `\`\`\``}).catch(() => null);
        }
    },
};