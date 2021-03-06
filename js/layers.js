addLayer("a", {
    name: "attention span", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Attention spans", // Name of prestige currency
    baseResource: "ADHD", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for Attention spans", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        rows: 2,
        cols: 3,
        11: {
            title: "Generator of Genericness",
            description: "Gain 1 Fuck every second.",
            cost: new Decimal(1),
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
        },
        12: {
            description: "Fuck generation is faster based on your unspent Attention span.",
            cost: new Decimal(1),
            unlocked() { return (hasUpgrade(this.layer, 11))},
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                let ret = player[this.layer].points.add(1).pow(player[this.layer].upgrades.includes(24)?1.1:(player[this.layer].upgrades.includes(14)?0.75:0.5)) 
                if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
    },
    buyables: {
        rows: 1,
        cols: 12,
        showRespec: true,
        respec() { // Optional, reset things and give back your currency. Having this function makes a respec button appear
            player[this.layer].points = player[this.layer].points.add(player[this.layer].spentOnBuyables) // A built-in thing to keep track of this but only keeps a single value
            resetBuyables(this.layer)
            doReset(this.layer, true) // Force a reset
        },
        respecText: "Respec hands", // Text on Respec button, optional
        11: {
            title: "EXhanders", // Optional, displayed at the top in a larger font
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                if (x.gte(25)) x = x.pow(2).div(25)
                let cost = Decimal.pow(2, x.pow(1.5))
                return cost.floor()
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(25, x.pow(1.1))
                else eff.first = Decimal.pow(1/25, x.times(-1).pow(1.1))
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " Attention spans\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Adds + " + format(data.effect.first) + " ADHD and multiplies stuff by " + format(data.effect.second)
            },
            unlocked() { return (hasUpgrade(this.layer, 12))}, 
            canAfford() {
                return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
            },
            style: {'height':'222px'},
            sellOne() {
                let amount = getBuyableAmount(this.layer, this.id)
                if (amount.lte(0)) return // Only sell one if there is at least one
                setBuyableAmount(this.layer, this.id, amount.sub(1))
                player[this.layer].points = player[this.layer].points.add(this.cost)
            },
        },
    },
})  