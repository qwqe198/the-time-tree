addLayer("S", {
    name: "秒", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            cs11: new Decimal(0),
        }
    },
    softcap() {
        let sc = new Decimal("1e30")
        return sc;
    },
    softcapPower() {
        let scp = 0.25;
        return scp;
    },

    color: "#FFFFFF",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "秒", // Name of prestige currency
    infoboxes: {
        introBox: {
            title: "秒",
            body() {
                let a = "秒是一个时间单位，极短。<br>"
                let b = "60秒=1分钟 3600秒=1小时 86400秒=1天<br>"
                let c = "秒获取在1e30是第一个软上限<br>"
                let e = ""

                return a + b + c + e
            },
        },
    },
    baseResource: "时间点", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    et(resettingLayer) {
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("S", 13)) mult = mult.mul(player.points.add(1).pow(0.3))
        if (hasUpgrade("S", 33)) mult = mult.mul(player.S.points.div(1e15).add(1).pow(0.1))
        if (hasUpgrade("S", 41)) mult = mult.mul(player.S.points.div(1e16).add(1).pow(0.075))
        if (hasUpgrade("S", 42)) mult = mult.mul(player.S.points.div(1e16).add(1).pow(0.075))
        if (hasUpgrade("S", 43)) mult = mult.mul(player.points.div(512))
        if (hasUpgrade("S", 51)) mult = mult.mul(player.points.pow(0.6))
        if (hasUpgrade("S", 22)) mult = mult.mul(player.points.add(1).pow(0.2))
        if (hasMilestone("S", 1)) mult = mult.mul(2)
        if (hasMilestone("S", 2)) mult = mult.mul(4)
        if (hasMilestone("T", 1)) mult = mult.mul(10)
        if (hasMilestone("T", 2)) mult = mult.mul(player.points.pow(0.5))
        if (hasUpgrade("S", 23)) mult = mult.mul(player.S.points.add(1).pow(0.1125))
        if (hasUpgrade("S", 32)) mult = mult.times(player.points.div(1e10).add(1).pow(0.05))
        if (hasUpgrade("S", 14)) mult = mult.mul(60)
        if (hasMilestone("T", 4)) mult = mult.mul(player.T.points.pow(10).add(1))
        if (hasUpgrade("S", 24)) mult = mult.mul(777600000)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (hasUpgrade("S", 52)) exp = exp.mul(1.01)
        if (inChallenge("T", 11)) exp = exp.mul(0.5)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "s", description: "S: 进行秒重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return true },
   
    milestones: {
        0: {
            requirementDescription: "分（60秒）",
            effectDescription: "时间点获取x2",
            done() {
                return player.S.points.gte(60)
            }
        },

        1: {
            requirementDescription: "时（3600秒）",
            effectDescription: "秒获取x2",
            done() {
                return player.S.points.gte(3600)
            }
        },

        2: {
            requirementDescription: "天（86400秒）",
            effectDescription: "时间点与秒获取x4",
            done() {
                return player.S.points.gte(86400)
            }
        },

        3: {
            requirementDescription: "年（1e10秒）",
            effectDescription: "解锁更多升级",
            done() {
                return player.S.points.gte(1e10)
            }
        },

     
    },
    upgrades: {
        11: {
            title: "时间加速器",
            description: "加速2x时间点获取",
            cost: new Decimal(2),
            effect() {
                let eff = new Decimal(2)
                return eff
            },
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return true }
        },

        12: {
            title: "时间点波动",
            description: "基于秒加成时间点获取",
            cost: new Decimal(10),
            effect() {
                let eff = player.S.points.add(1).pow(0.5)
                return eff
            },
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return hasUpgrade("S", 11) }
        },

        13: {
            title: "时间增强器",
            description: "基于时间点加成秒获取",
            cost: new Decimal(20),
            effect() {
                let eff = player.points.add(1).pow(0.3)
                if (hasUpgrade("S", 33)) eff = player.points.add(1).pow(0.3).mul(player.S.points.div(1e15).add(1).pow(0.1))
                return eff
            },
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return hasUpgrade("S", 12) }
        },

        21: {
            title: "时间点自协同",
            description: "基于时间点加成时间点获取",
            cost: new Decimal(300),
            effect() {
                let eff = player.points.add(1).pow(0.125)
                return eff
            },
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return hasUpgrade("S", 13) }
        },

        22: {
            title: "秒自协同",
            description: "基于秒加成秒获取",
            cost: new Decimal(1000),
            effect() {
                let eff = player.S.points.add(1).pow(0.2)
                return eff
            },
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return hasUpgrade("S", 13) }
        },

        23: {
            title: "秒自协同x2",
            description: "基于秒加成秒获取",
            cost: new Decimal(10000),
            effect() {
                let eff = player.S.points.add(1).pow(0.1125)
                return eff
            },
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return hasUpgrade("S", 13) }
        },

        31: {
            title: "年",
            description: "基于秒加成时间点获取",
            cost: new Decimal(2e10),
            effect() {
                let eff = player.S.points.add(1).pow(0.05)
                return eff
            },
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return hasMilestone("S", 3) }
        },

        32: {
            title: "时间增强器x2",
            description: "基于时间点加成秒获取",
            cost: new Decimal(2e11),
            effect() {
                let eff = player.points.div(1e10).add(1).pow(0.05)
                return eff
            },
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return hasUpgrade("S", 31) },

        },

        33: {
            title: "时间增强器增强器",
            description: "基于秒加成时间增强器",
            cost: new Decimal(1e15),
            effect() {
                let eff = player.S.points.div(1e15).add(1).pow(0.1)
                return eff
            },
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return hasUpgrade("S", 32) }
        },
        41: {
            title: "秒自协同x3",
            description: "基于秒加成秒",
            cost: new Decimal(5e15),
            effect() {
                let eff = player.S.points.div(1e16).add(1).pow(0.075)
                return eff
            },
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return hasUpgrade("S", 33) }
        },
        42: {
            title: "上一个升级再来一次",
            description: "基于秒加成秒",
            cost: new Decimal(5e17),
            effect() {
                let eff = player.S.points.div(1e16).add(1).pow(0.075)
                return eff
            },
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return hasUpgrade("S", 41) }
        },
        43: {
            title: "升级11^10",
            description: "升级11的效果加成秒，且变成原来的10次方（时间点的加成不变）(11显示的是原来的效果)(2x→1024x)",
            cost: new Decimal(1e21),
            effect() {
                let eff = 10
                return eff
            },
            effectDisplay() { return `^${format(this.effect())}` },
            unlocked() { return hasUpgrade("S", 42) }
        },
        51: {
            title: "秒1重软上限效果削弱，且增强软上限前获取",
            description: "",
            cost: new Decimal(1e37),
            effect() {
                let eff = 0.40
                return eff
            },
            effectDisplay() { return `^${format(this.effect())}` },
            unlocked() { return hasUpgrade("S", 43) }
        },
        52: {
            title: "秒增益^1.01",
            description: "",
            cost: new Decimal(1e42),
            effect() {
                let eff = 1.01
                return eff
            },
            effectDisplay() { return `^${format(this.effect())}` },
            unlocked() { return hasUpgrade("S", 51) }
        },
        53: {
            title: "秒加强时间点获取",
            description: "",
            cost: new Decimal(1e55),
            effect() {
                let eff = player.S.points.pow(0.05).add(1)
                return eff
            },
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return hasUpgrade("S", 52) }
        },
        14: {
            title: "分",
            description: "秒和时间点获取x60",
            cost: new Decimal(1e74),
            effect() {
                let eff = 60
                return eff
            },
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return hasChallenge("T", 11) },
        },
        24: {
            title: "升级14^5",
            description: "升级14的效果变为原来的5次方",
            cost: new Decimal(1e128),
            effect() {
                let eff = 5
                return eff
            },
            effectDisplay() { return `^${format(this.effect())}` },
            unlocked() { return hasChallenge("T", 12) },
        },
    },

    passiveGeneration() { return hasUpgrade('T', 11) ? 1 : 0 },
})
addLayer("T", {
    name: "时间机器", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    softcap() {
        let sc = new Decimal("1e30")
        return sc;
    },
    softcapPower() {
        let scp = 0.25;
        return scp;
    },
    color: "#7C4B00",
    requires: new Decimal(1e30), // Can be a function that takes requirement increases into account
    resource: "时间机器",// Name of prestige currency
    baseResource: "时间点", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 3, // Prestige currency exponent
    et(resettingLayer) {
    },
    gainMult()  // Calculate the multiplier for main currency from bonuses
    {
        mult = new Decimal(1)
        if (challengeCompletions("T", 12) == 1) mult = mult.div(new Decimal(1e100))

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "T", description: "T: 进行时间机器重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return true },
    branches: ["S"],
    milestones: {
        0: {
            requirementDescription: "时空穿越?（1时间机器）",
            effectDescription: "时间点获取x10",
            done() {
                return player.T.points.gte(1)
            }
        },
        1: {
            requirementDescription: "时不我待（2时间机器）",
            effectDescription: "秒获取x10",
            done() {
                return player.T.points.gte(2)
            }
        },
        2: {
            requirementDescription: "饥不择时?（3时间机器）",
            effectDescription: "秒2重软上限削弱到^0.6",
            done() {
                return player.T.points.gte(3)
            }
        },

        3: {
            requirementDescription: "时间膨胀（4时间机器）",
            effectDescription: "解锁一个挑战",
            done() {
                return player.T.points.gte(4)
            }
        },

        4: {
            requirementDescription: "时间机器终于有效果辣（6时间机器）",
            effectDescription() { return "时间机器的10次方增强秒和时间点获取<br>当前：" + format(player.T.points.pow(10).add(1)) + "x" },
            done() {
                return player.T.points.gte(6)
            }
        },

        5: {
            requirementDescription: "时间压缩（7时间机器）",
            effectDescription: "解锁下一个挑战",
            done() {
                return player.T.points.gte(7)
            }
        },
        6: {
            requirementDescription: "时间之沙（10时间机器）",
            effectDescription: "解锁新层",
            done() {
                return player.T.points.gte(10)
            }
        },
    },
    challenges: {
        11: {
            name: "时间膨胀", // 挑战显示名字
            challengeDescription: "时间点和秒获取^0.5(第1次完成挑战时解锁更多内容)", // 挑战显示内容
            goalDescription: "2222时间点",// 挑战显示目标
            canComplete: function () { return player.points.gte(2222) },// 挑战实际目标
            rewardDescription: "时间点获取^1.1",// 挑战显示奖励
            unlocked() { return hasMilestone("T", 3) }// 挑战解锁条件
        },
        12: {
            name: "时间压缩",
            challengeDescription: "时间点获取÷1e18^（挑战完成次数+1）(第1次完成该挑战时，解锁更多内容！)",

            goal() {
                if (challengeCompletions("T", 12) == 0) return Decimal.pow(10, 26);
                if (challengeCompletions("T", 12) == 1) return Decimal.pow(10, 999);
                if (challengeCompletions("T", 12) == 2) return Decimal.pow(10, 9999);
            },
            completionLimit: 3,

            rewardDescription: "时间机器获取要求大幅降低",

            unlocked() {
                return hasMilestone("T", 5)
            },

        },
    },

    upgrades: {
        11: {
            title: "时间转换器",
            description: "每秒获得100%的秒",
            cost: new Decimal(5),
            effect() {
                let eff = new Decimal(100)
                return eff
            },
            effectDisplay() { return `${format(this.effect())}%` },
            unlocked() { return hasMilestone("T", 3) },
        },

    },
},
)
addLayer("A", {
    name: "时间之沙", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked() { return hasMilestone("T", 6) },
            points: new Decimal(0),
        }
    },
    color: "#4BDC13",
    requires: new Decimal(1e153), // Can be a function that takes requirement increases into account
    resource: "时间之沙", // Name of prestige currency
    baseResource: "时间点", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "A", description: "A: 进行时间之沙重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return true },
    upgrades: {
        11: {
            title: "恭喜通关",
            description: "",
            cost: new Decimal(25),
          
            unlocked() { return true }
        },
    },

    branches: ["S"],
})
