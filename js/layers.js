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
        if (hasUpgrade("a", 23)) mult = mult.times(upgradeEffect("a", 23))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (hasUpgrade("h", 11)) mult = mult.pow(upgradeEffect("h", 11))
        return exp
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
            description: "Gain 1 ADHD every second.",
            cost: new Decimal(1),
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
        },
        12: {
            title: "Dawdling",
            description: "ADHD generation is faster based on your unspent Attention span.",
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
            title: "Harder dawdling",
            description: "ADHD generation is even faster based on your unspent Attention span.",
            cost: new Decimal(5),
            unlocked() { return (hasUpgrade(this.layer, 12))},
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                let ret = player[this.layer].points.add(1).pow(player[this.layer].upgrades.includes(24)?1.1:(player[this.layer].upgrades.includes(14)?1.1:0.9)) 
                if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        21: {
            title: "Exponential dawdling",
            description: "ADHD generation is faster based on your ADHD.",
            cost: new Decimal(20),
            unlocked() { return (hasUpgrade(this.layer, 12))},
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                let ret = player.points.add(1).pow(player[this.layer].upgrades.includes(24)?1.1:(player[this.layer].upgrades.includes(14)?0.4:0.2)) 
                if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                if (hasUpgrade("a", 22)) ret = ret.times(upgradeEffect("a", 22))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        22: {
            title: "Logarithmic dawdling",
            description: "The last upgrade is better based on your unspent Attention span.",
            cost: new Decimal(100),
            unlocked() { return (hasUpgrade(this.layer, 21))},
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                let ret = player[this.layer].points.add(1).pow(player[this.layer].upgrades.includes(24)?1.1:(player[this.layer].upgrades.includes(14)?0.2:0.1)) 
                if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        23: {
            title: "Dawdled dawdling",
            description: "Attention span gain is better based on your unspent Attention span.",
            cost: new Decimal(1000),
            unlocked() { return (hasUpgrade(this.layer, 22))},
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                let ret = player[this.layer].points.add(1).pow(player[this.layer].upgrades.includes(24)?1.1:(player[this.layer].upgrades.includes(14)?0.5:0.3)) 
                if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
    },
})  
addLayer("h", {
    name: "Hyperfixation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#47eda8",
    requires: new Decimal(1e9), // Can be a function that takes requirement increases into account
    resource: "Hyperfixations", // Name of prestige currency
    baseResource: "Attention spans", // Name of resource prestige is based on
    baseAmount() {return player["a"].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    softcap: new Decimal(1e6), 
    softcapPower: new Decimal(0.00001),
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ["a"],
    hotkeys: [
        {key: "h", description: "H: Reset for Hyperfixations", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        rows: 2,
        cols: 3,
        11: {
            title: "POOOWWWEEEEERRR",
            description: "Add an exponent......... somewhere? Probably based of something",
            cost: new Decimal(1),
            unlocked: true,
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                let ret = player[this.layer].points.add(1).pow(player[this.layer].upgrades.includes(24)?1.1:(player[this.layer].upgrades.includes(14)?0.175:0.125)) 
                if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        }
    }
})