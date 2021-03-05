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
    baseResource: "fucks", // Name of resource prestige is based on
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
            description: "Point generation is faster based on your unspent Attention spans.",
            cost: new Decimal(1),
            unlocked() { return (hasUpgrade(this.layer, 11))},
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                let ret = player[this.layer].points.add(1).pow(player[this.layer].upgrades.includes(24)?1.1:(player[this.layer].upgrades.includes(14)?0.75:0.5)) 
                if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        13: {
            unlocked() { return (hasUpgrade(this.layer, 12))},
            onPurchase() { // This function triggers when the upgrade is purchased
                player[this.layer].unlockOrder = 0
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                'background-color': '#1111dd' 
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'background-color': '#dd1111' 
                    }
                } // Otherwise use the default
            },
            canAfford(){return player.points.lte(7)},
            pay(){player.points = player.points.add(7)},
            fullDisplay: "Only buyable with less than 7 points, and gives you 7 more. Unlocks a secret subtab."
        },
        22: {
            title: "This upgrade doesn't exist",
            description: "Or does it?.",
            currencyLocation() {return player[this.layer].buyables}, // The object in player data that the currency is contained in
            currencyDisplayName: "exhancers", // Use if using a nonstandard currency
            currencyInternalName: 11, // Use if using a nonstandard currency

            cost: new Decimal(3),
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
        },
    }
})  
addLayer("p", {
    name: "pussy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ff85b4",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "pussy's", // Name of prestige currency
    baseResource: "fucks", // Name of resource prestige is based on
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
        {key: "p", description: "P: Reset for Pussy's", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
})