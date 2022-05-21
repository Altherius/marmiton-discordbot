require('dotenv').config()
const Command = require('./command')
const {searchRecipes, MarmitonQueryBuilder} = require("marmiton-api")

module.exports = class Departs extends Command {

    static match (message) {
        return message.content.startsWith('!recette')
    }

    static async action(message) {
        let args = message.content.split(' ')
        args.splice(0,1)
        let param = args.join('%20')
        let paramString = param.split('%20').join(' ')

        console.log(paramString)

        const qb = new MarmitonQueryBuilder()
        const query = qb.withTitleContaining(paramString).build()
        const recipes = await searchRecipes(query)

        if (recipes.length === 0) {
            const embed = {
                color: 0xEB934B,
                title: 'Aucun résultat trouvé'
            };
            message.channel.send({embeds: [embed]});
        } else {
            const firstRecipe = recipes[0]

            let ingredients = ""
            firstRecipe.ingredients.forEach((ingredient) => {
                ingredients = ingredients + ingredient + '\n'
            })

            let preparation = ""
            firstRecipe.steps.forEach((step) => {
                preparation = preparation + step + '\n'
            })

            const embed = {
                color: 0x34B7EB,
                title: 'Recette de ' + firstRecipe.name + ' par ' + firstRecipe.author + '(' + firstRecipe.people + ' personnes)',
                fields: [
                    {name: "Ingrédients", value: ingredients},
                    {name: "Préparation", value: preparation}
                ]
            };
            message.channel.send({embeds: [embed]});
        }
    }
};