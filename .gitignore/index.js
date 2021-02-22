const Discord = require("discord.js");

const Client = new Discord.Client;

const prefix = "$";

Client.on("ready", () => {
    console.log("bot opérationnel");

    Client.guilds.cache.find(guild => guild.id === "811615201090732032").channels.cache.find(channel => channel.id === "811615201090732035").messages.fetch("813122409824780339").then(message => {
        console.log("Message ajouté à la mémoire : " + message.content);
    }).catch(err =>{
        console.log("Impossible d'ajouter le message à la mémoire : " + err);
    });
});

Client.on("guildMemberAdd", member => {
    console.log("Un nouveau membre est arrivé");
    member.guild.channels.cache.find(channel => channel.id === "811615201090732035").send(member.displayName + " est arrivé sur le serveur ! :smile:\nNous sommes désormais **" + member.guild.memberCount + " **sur le serveur !");
    member.roles.add("").then(member => {
        console.log("Le rôle à été attribué avec succès pour"+ member.displayName);

    }).catch(() => {
        console.log("Le rôle n'a pas pu être attribué.");

    });
});

Client.on("guildMemberRemove", member => {
    console.log("Une personne nous a quitté..");
    member.guild.channels.cache.find(channel => channel.id === "811615201090732035").send(member.displayName + "vient de quitté. :cry:");
})

Client.on("messageReactionAdd", (reaction, user) => {
    if(user.bot) return;

    /*console.log("Réaction Ajouté par " + user.username + "\nNom de l'émoji " +reaction.emoji.name + " C'est la " + reaction.count + "e réaction");*/

    if(reaction.message.id === "813122409824780339"){
        if(reaction.emoji.name === "gem"){
            var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
            member.roles.add("813130221884014612").then(member => {
                console.log("Le rôle est attribué avec succès pour " + member.displayName);
            }).catch(err => {
                console.log("Le rôle n'a pas pu être attribué : " + err);
            });  
        }
    }

    /*reaction.users.remove(user.id).then(react => {
        console.log("Réaction" + react.emoji.name + "Retiré par le bot");
    }).catch(err => {
        console.log("Impossible de retire la réaction : " + err);
    });*/

    /*reaction.remove().then(react => {
        console.log("Réaction" + react.emoji.name + "Retiré par le bot");
    }).catch(err => {
        console.log("Impossible de retire la réaction : " + err);
    });*/
});

Client.on("messageReactionRemove", (reaction, user) => {
    if(user.bot) return;

    console.log("Réaction retiré");

    if(reaction.message.id === "813122409824780339"){
        if(reaction.emoji.name === "gem"){
            var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
            member.roles.remove("813130221884014612").then(member => {
                console.log("Le rôle est attribué avec succès pour " + member.displayName);
            }).catch(err => {
                console.log("Le rôle n'a pas pu être attribué : " + err);
            });  
        }
    }

    /*console.log("Reaction Retiré par" + user.username);*/
});

Client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    /*message.react("💎");*/

    //$ping
    if(message.content == prefix + "Akerayz"){
        message.reply( "**Akerayz est le créateur à part entière de ce bot**");
    }

    if(message.content == prefix + "id"){
        message.channel.send(" Voici ton ID : " + message.author.id)
    }
});
