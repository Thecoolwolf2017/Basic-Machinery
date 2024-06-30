import * as mc from "@minecraft/server"
import { setPermutation, unbreakBlocks, clearItem, batteryShowPower, tankShowPower, cablePattern } from "./system.js"
import { generate, generateRemaining } from "./globalTubes.js"
import { isBlockId } from "./stableTriggers.js"


export function allEvents(id, block, blockId) {


    if (id === "vatonage:cobblestone_generator") {

        let loc = { x: block.above().location.x + 0.5, y: block.above().location.y, z: block.above().location.z + 0.5 }
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 5) {
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 5`)
                block.dimension.spawnItem(new mc.ItemStack("minecraft:cobblestone", 1), loc)
                let players = block.dimension.getEntities({
                    type: "minecraft:player",
                    location: block.location,
                    maxDistance: 5
                })
                for (const player of players) {
                    player.runCommand(`playsound extinguish.candle @s `)
                }
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }
    if (id === "vatonage:chargepad") {

        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 5) {
                let players = block.dimension.getEntities({
                    type: "minecraft:player",
                    location: block.location,
                    maxDistance: 1
                })
                for (const player of players) {

                    if (player) block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 5`)
                    for (let x = 0; x < rfScore; x++) {
                        let helmetSlot = player?.getComponent("equippable").getEquipment("Head")
                        let chestplateSlot = player?.getComponent("equippable").getEquipment("Chest")
                        let leggingsSlot = player?.getComponent("equippable").getEquipment("Legs")
                        let bootsSlot = player?.getComponent("equippable").getEquipment("Feet")
                        let Mainhand = player?.getComponent("equippable").getEquipment("Mainhand")
                        if (helmetSlot?.typeId == "vatonage:midnight_helmet" || helmetSlot?.typeId == "vatonage:hexosteel_helmet") helmetSlot.getComponent("minecraft:durability").damage > 0 ? helmetSlot.getComponent("minecraft:durability").damage-- : undefined, player?.getComponent("equippable").setEquipment("Head", helmetSlot)
                        if (chestplateSlot?.typeId == "vatonage:midnight_chestplate" || chestplateSlot?.typeId == "vatonage:hexosteel_chestplate") chestplateSlot.getComponent("minecraft:durability").damage > 0 ? chestplateSlot.getComponent("minecraft:durability").damage-- : undefined, player?.getComponent("equippable").setEquipment("Chest", chestplateSlot)
                        if (leggingsSlot?.typeId == "vatonage:midnight_leggings" || leggingsSlot?.typeId == "vatonage:hexosteel_leggings") leggingsSlot.getComponent("minecraft:durability").damage > 0 ? leggingsSlot.getComponent("minecraft:durability").damage-- : undefined, player?.getComponent("equippable").setEquipment("Legs", leggingsSlot)
                        if (bootsSlot?.typeId == "vatonage:midnight_boots" || bootsSlot?.typeId == "vatonage:hexosteel_boots") bootsSlot.getComponent("minecraft:durability").damage > 0 ? bootsSlot.getComponent("minecraft:durability").damage-- : undefined, player?.getComponent("equippable").setEquipment("Feet", bootsSlot)
                        if (Mainhand?.typeId == "vatonage:drill" || Mainhand?.typeId == "vatonage:nano_sword" || Mainhand?.typeId == "vatonage:modular_tool_sword" || Mainhand?.typeId == "vatonage:modular_tool_pickaxe" || Mainhand?.typeId == "vatonage:modular_tool_shovel" || Mainhand?.typeId == "vatonage:modular_tool_axe" || Mainhand?.typeId == "vatonage:modular_tool_hoe") Mainhand.getComponent("minecraft:durability").damage > 0 ? Mainhand.getComponent("minecraft:durability").damage-- : undefined, player?.getComponent("equippable").setEquipment("Mainhand", Mainhand)
                    }
                }
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }
    if (id === "vatonage:quantum_miner") {

        let loc = { x: block.above().location.x + 0.5, y: block.above().location.y, z: block.above().location.z + 0.5 }
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 100) {
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 100`)
                const ores = [
                    "minecraft:diamond",
                    "minecraft:raw_iron",
                    "minecraft:raw_gold",
                    "minecraft:emerald",
                    "minecraft:redstone",
                    "minecraft:lapis_lazuli",
                    "minecraft:raw_copper",
                    "minecraft:stone"
                ]
                const nr = Math.floor(Math.random() * 8)
                block.dimension.spawnItem(new mc.ItemStack(ores[nr], 1), loc)
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }
    if (id === "vatonage:nether_quantum_miner") {

        let loc = { x: block.above().location.x + 0.5, y: block.above().location.y, z: block.above().location.z + 0.5 }
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 100) {
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 100`)
                const ores = [
                    "minecraft:gold_nugget",
                    "minecraft:ancient_debris",
                    "minecraft:netherrack",
                    "minecraft:quartz"
                ]
                const nr = Math.floor(Math.random() * 4)
                block.dimension.spawnItem(new mc.ItemStack(ores[nr], 1), loc)
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }
    if (id === "vatonage:powered_fisher") {
        if (block) {
            let loc = { x: block.above().location.x + 0.5, y: block.above().location.y, z: block.above().location.z + 0.5 }
            const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
            if (scoreVerify > 0) {
                const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
                if (rfScore >= 20 && isBlockId(block.below(), "minecraft:water")) {
                    block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 20`)
                    block.dimension.runCommand(`loot spawn ${block.center().x} ${block.above().y} ${block.center().z} loot fisherloot`)
                }
            } else {
                block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
            }
        }
    }
    if (id === "vatonage:trash_can") {
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            let items = block.dimension.getEntities({
                type: "minecraft:item",
                location: block.above().location,
                maxDistance: 1.5
            })
            if (rfScore >= 1 && items[0]) {
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 1`)
                for (const item of items) {
                    item.remove()
                }
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }
    if (id === "vatonage:block_breaker") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            let blockToBreak
            if (states["minecraft:cardinal_direction"] == 'north') blockToBreak = block.north()
            if (states["minecraft:cardinal_direction"] == 'south') blockToBreak = block.south()
            if (states["minecraft:cardinal_direction"] == 'west') blockToBreak = block.west()
            if (states["minecraft:cardinal_direction"] == 'east') blockToBreak = block.east()
            let rst
            for (const unB of unbreakBlocks) {
                if (isBlockId(blockToBreak, unB)) rst = 'fedido'
            }
            if (rfScore >= 5 && rst != 'fedido') {
                block?.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 5`)
                blockToBreak?.dimension.runCommand(`setblock ${blockToBreak.location.x} ${blockToBreak.location.y} ${blockToBreak.location.z} air destroy`)
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }
    if (id === "vatonage:crusher") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount

        const crusherRecipe = [
            { input: "minecraft:stone", output: "minecraft:cobblestone" },
            { input: "minecraft:cobblestone", output: "minecraft:gravel" },
            { input: "minecraft:gravel", output: "minecraft:sand" }
        ]

        let items = block.dimension.getEntities({
            type: "minecraft:item",
            location: { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 },
            maxDistance: 1
        })
        for (const item of items) {
            if (states["minecraft:cardinal_direction"] == 'north') {
                item.teleport({ x: block.location.x + 0.5, y: block.location.y + 0.2, z: item.location.z - 0.1 })
            }
            if (states["minecraft:cardinal_direction"] == 'south') {
                item.teleport({ x: block.location.x + 0.5, y: block.location.y + 0.2, z: item.location.z + 0.1 })
            }
            if (states["minecraft:cardinal_direction"] == 'west') {
                item.teleport({ x: item.location.x - 0.1, y: block.location.y + 0.2, z: block.location.z + 0.5 })
            }
            if (states["minecraft:cardinal_direction"] == 'east') {
                item.teleport({ x: item.location.x + 0.1, y: block.location.y + 0.2, z: block.location.z + 0.5 })
            }
            if (scoreVerify > 0) {
                const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
                if (rfScore >= 5) {
                    if (items[0]) {


                        for (const recipe of crusherRecipe) {
                            if (item?.getComponent("item")?.itemStack?.typeId == recipe?.input && !item.hasTag('ja')) {
                                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 5`)
                                let spawned = block.dimension.spawnItem(new mc.ItemStack(recipe.output, item.getComponent("item").itemStack.amount), item.location)
                                spawned.addTag('ja')
                                item.remove()
                            }
                        }
                    }
                }
            }
        }
        if (scoreVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore > 4) {
                setPermutation(block, "vatonage:on", 1, blockId)
            } else setPermutation(block, "vatonage:on", 0, blockId)
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }
    if (id === "vatonage:heavy_press") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount

        const crusherRecipe = [
            { input: "minecraft:coal", output: "minecraft:emerald" },
            { input: "minecraft:emerald", output: "minecraft:diamond" }
        ]

        let items = block.dimension.getEntities({
            type: "minecraft:item",
            location: { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 },
            maxDistance: 1
        })
        for (const item of items) {
            if (states["minecraft:cardinal_direction"] == 'north') {
                item.teleport({ x: block.location.x + 0.5, y: block.location.y + 0.2, z: item.location.z - 0.1 })
            }
            if (states["minecraft:cardinal_direction"] == 'south') {
                item.teleport({ x: block.location.x + 0.5, y: block.location.y + 0.2, z: item.location.z + 0.1 })
            }
            if (states["minecraft:cardinal_direction"] == 'west') {
                item.teleport({ x: item.location.x - 0.1, y: block.location.y + 0.2, z: block.location.z + 0.5 })
            }
            if (states["minecraft:cardinal_direction"] == 'east') {
                item.teleport({ x: item.location.x + 0.1, y: block.location.y + 0.2, z: block.location.z + 0.5 })
            }
            if (scoreVerify > 0) {
                const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
                if (rfScore >= 50) {
                    if (items[0]) {
                        for (const recipe of crusherRecipe) {
                            if (item?.getComponent("item")?.itemStack.typeId == recipe.input && !item.hasTag(`${block.location.x},${block.location.y},${block.location.z}`)) {
                                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 50`)
                                let itemSpawned = block.dimension.spawnItem(new mc.ItemStack(recipe.output, item.getComponent("item").itemStack.amount), item.location)
                                itemSpawned.addTag(`${block.location.x},${block.location.y},${block.location.z}`)
                                item.remove()
                            }
                        }
                    }
                }
            }
        }
        if (scoreVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore > 49) {
                setPermutation(block, "vatonage:on", 1, blockId)
            } else setPermutation(block, "vatonage:on", 0, blockId)
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }
    if (id === "vatonage:item_magnet") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 5) {
                let items = block.dimension.getEntities({
                    type: "minecraft:item",
                    location: block.location,
                    maxDistance: 10
                })
                if (items[0]) {
                    for (const item of items) {
                        if (!item.dimension.getBlock(item.location)?.hasTag("conveyor_connect")) {
                            block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 5`)
                            item.teleport(block.above().center())
                        }
                    }
                }
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }
    if (id === "vatonage:powered_furnace") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount

        const furnaceRecipe = [
            { input: "minecraft:cobblestone", output: "minecraft:stone" },
            { input: "minecraft:raw_iron", output: "minecraft:iron_ingot" },
            { input: "minecraft:raw_gold", output: "minecraft:gold_ingot" },
            { input: "minecraft:sand", output: "minecraft:glass" },
            { input: "minecraft:log", output: "minecraft:charcoal" },
            { input: "minecraft:raw_copper", output: "minecraft:copper_ingot" }
        ]

        let items = block.dimension.getEntities({
            type: "minecraft:item",
            location: { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 },
            maxDistance: 1
        })
        for (const item of items) {
            if (states["minecraft:cardinal_direction"] == 'north') {
                item.teleport({ x: block.location.x + 0.5, y: block.location.y + 0.2, z: item.location.z - 0.1 })
            }
            if (states["minecraft:cardinal_direction"] == 'south') {
                item.teleport({ x: block.location.x + 0.5, y: block.location.y + 0.2, z: item.location.z + 0.1 })
            }
            if (states["minecraft:cardinal_direction"] == 'west') {
                item.teleport({ x: item.location.x - 0.1, y: block.location.y + 0.2, z: block.location.z + 0.5 })
            }
            if (states["minecraft:cardinal_direction"] == 'east') {
                item.teleport({ x: item.location.x + 0.1, y: block.location.y + 0.2, z: block.location.z + 0.5 })
            }
        }
        let itemse = block.dimension.getEntities({
            type: "minecraft:item",
            location: { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 },
            maxDistance: 0.3
        })
        for (const item of itemse) {
            if (scoreVerify > 0) {
                const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
                if (rfScore >= 20) {
                    if (items[0]) {
                        for (const recipe of furnaceRecipe) {
                            if (item.getComponent("item")?.itemStack.typeId == recipe.input) {
                                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 20`)
                                generate(block, "carbon", 10, "gas", "tube", true, "above")
                                block.dimension.spawnItem(new mc.ItemStack(recipe.output, item.getComponent("item").itemStack.amount), item.location)
                                item.remove()
                            }
                        }
                    }
                }
            }
        }
        if (scoreVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 20) {
                setPermutation(block, "vatonage:on", 1, blockId)
                block.dimension.spawnParticle('vatonage:powered_furnace', { x: block.center().x, y: block.location.y + 0.8, z: block.center().z })
            } else setPermutation(block, "vatonage:on", 0, blockId)
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }
    if (id === "vatonage:gas_condenser") {

        let states = block.permutation.getAllStates()
        let gasType = states["vatonage:gas_type"]
        //console.warn(gasType)
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" ${gasType} matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0) {
            const gasmlScore = mc.world.scoreboard.getObjective(gasType).getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (gasmlScore >= 20) {
                if (states["vatonage:gas_type"] == "carbon") block.dimension.spawnItem(new mc.ItemStack("minecraft:coal"), block.above().center())
                if (states["vatonage:gas_type"] == "hydrogen") block.dimension.spawnItem(new mc.ItemStack("minecraft:redstone", 5), block.above().center())
                if (states["vatonage:gas_type"] == "nitrogen") block.dimension.spawnItem(new mc.ItemStack("minecraft:sand"), block.above().center())
                if (states["vatonage:gas_type"] == "oxygen") block.dimension.spawnItem(new mc.ItemStack("minecraft:bone_meal"), block.above().center())
                if (states["vatonage:gas_type"] == "steam") generate(block, "water", 10, "liquid", "pipe", true)
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" ${gasType} 20`)
                setPermutation(block, `vatonage:gas_type`, "none", blockId)
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" ${gasType} 0`)
        }
    }
    if (id === "vatonage:freezer") {

        let states = block.permutation.getAllStates()
        let gasType = states["vatonage:liquid_type"]

        //console.warn(gasType)
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" ${gasType} matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0) {
            const gasmlScore = mc.world.scoreboard.getObjective(gasType).getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (gasmlScore >= 20) {
                if (states["vatonage:liquid_type"] == "ammonia") block.dimension.spawnItem(new mc.ItemStack("minecraft:tnt"), block.above().center())
                if (states["vatonage:liquid_type"] == "exp") block.dimension.spawnItem(new mc.ItemStack("minecraft:xp_botthe"), block.above().center())
                if (states["vatonage:liquid_type"] == "lava") block.dimension.spawnItem(new mc.ItemStack("minecraft:obsidian"), block.above().center())
                if (states["vatonage:liquid_type"] == "milk") block.dimension.spawnItem(new mc.ItemStack("minecraft:sugar"), block.above().center())
                if (states["vatonage:liquid_type"] == "oil") block.dimension.spawnItem(new mc.ItemStack("minecraft:slimeball"), block.above().center())
                if (states["vatonage:liquid_type"] == "water") block.dimension.spawnItem(new mc.ItemStack("minecraft:ice"), block.above().center())
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" ${gasType} 20`)
                setPermutation(block, `vatonage:liquid_type`, "none", blockId)
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" ${gasType} 0`)
        }
    }
    if (id === "vatonage:plastic_refinery") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        const mlVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" oil matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0 && mlVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            const mlScore = mc.world.scoreboard.getObjective("oil").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 70 && mlScore >= 70) {
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 70`)
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" oil 70`)
                block.dimension.spawnItem(new mc.ItemStack("vatonage:plastic"), block.above().center())
                block.dimension.spawnParticle("minecraft:campfire_smoke_particle", block.above().center())
                setPermutation(block, `vatonage:liquid_type`, "none", blockId)
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }
    if (id === "vatonage:graphene_factory") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        const mlVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" carbon matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0 && mlVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            const mlScore = mc.world.scoreboard.getObjective("carbon").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 40 && mlScore >= 10) {
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 40`)
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" carbon 10`)
                block.dimension.spawnItem(new mc.ItemStack("vatonage:carbon_nanotube"), block.above().center())
                block.dimension.spawnParticle("minecraft:campfire_smoke_particle", block.above().center())
                setPermutation(block, `vatonage:gas_type`, "none", blockId)
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }
    if (id === "vatonage:monster_masher") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0) {
            let mobs = block.dimension.getEntities({
                location: block.above(),
                maxDistance: 1
            })
            if (mobs[0]){
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 10){
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 10`)
                mobs.forEach(mob => {
                    //console.warn(mob.typeId)
                    if (mob.typeId != 'minecraft:item' && mob.typeId != 'minecraft:xp_orb') mob.applyDamage(10); else mob.teleport(block.below().center())
                });
                }
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }
    if (id === "vatonage:gas_separator") {

        let states = block.permutation.getAllStates()
        let bgl = states["vatonage:liquid_type"]
        //console.warn(bgl)
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        const mlVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" ${bgl} matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0 && mlVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            const mlScore = mc.world.scoreboard.getObjective(bgl).getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 10 && mlScore >= 10) {
                if (states["minecraft:cardinal_direction"] == 'north') {
                    if (states["vatonage:liquid_type"] == 'oil') {
                        generate(block, "hydrogen", 10, "gas", "tube", true, "west")
                        generate(block, "carbon", 10, "gas", "tube", true, "east")
                    }
                    if (states["vatonage:liquid_type"] == 'water') {
                        generate(block, "hydrogen", 10, "gas", "tube", true, "west")
                        generate(block, "oxygen", 10, "gas", "tube", true, "east")
                    }
                }
                if (states["minecraft:cardinal_direction"] == 'south') {
                    if (states["vatonage:liquid_type"] == 'oil') {
                        generate(block, "hydrogen", 10, "gas", "tube", true, "east")
                        generate(block, "carbon", 10, "gas", "tube", true, "west")
                    }
                    if (states["vatonage:liquid_type"] == 'water') {
                        generate(block, "hydrogen", 10, "gas", "tube", true, "east")
                        generate(block, "oxygen", 10, "gas", "tube", true, "west")
                    }
                }
                if (states["minecraft:cardinal_direction"] == 'west') {
                    if (states["vatonage:liquid_type"] == 'oil') {
                        generate(block, "hydrogen", 10, "gas", "tube", true, "south")
                        generate(block, "carbon", 10, "gas", "tube", true, "north")
                    }
                    if (states["vatonage:liquid_type"] == 'water') {
                        generate(block, "hydrogen", 10, "gas", "tube", true, "south")
                        generate(block, "oxygen", 10, "gas", "tube", true, "north")
                    }
                }
                if (states["minecraft:cardinal_direction"] == 'east') {
                    if (states["vatonage:liquid_type"] == 'oil') {
                        generate(block, "hydrogen", 10, "gas", "tube", true, "north")
                        generate(block, "carbon", 10, "gas", "tube", true, "south")
                    }
                    if (states["vatonage:liquid_type"] == 'water') {
                        generate(block, "hydrogen", 10, "gas", "tube", true, "north")
                        generate(block, "oxygen", 10, "gas", "tube", true, "south")
                    }
                }
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 10`)
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" ${bgl} ${mlScore}`)
                setPermutation(block, `vatonage:liquid_type`, "none", blockId)
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }
    if (id === "vatonage:silicon_factory") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        const mlVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" lava matches 0.. run gamerule sendcommandfeedback false`).successCount
        const gasmlVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" carbon matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0 && mlVerify > 0 && gasmlVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            const mlScore = mc.world.scoreboard.getObjective("lava").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            const gasmlScore = mc.world.scoreboard.getObjective("carbon").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 20 && mlScore >= 20 && gasmlScore >= 20) {
                block.dimension.spawnItem(new mc.ItemStack("vatonage:silicon"), block.above().center())
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 20`)
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" lava 20`)
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" carbon 20`)
                setPermutation(block, "vatonage:liquid_type", "none", blockId)
                setPermutation(block, "vatonage:gas_type", "none", blockId)
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }























    if (id === "vatonage:cable") {
        cablePattern(block, "rf", "cable", blockId)
    }
    if (id === "vatonage:tube") {
        cablePattern(block, "gas", "tube", blockId)
    }

    if (id === "vatonage:pipe") {
        cablePattern(block, "liquid", "pipe", blockId)
    }
    if (id === "vatonage:battery") {

        batteryShowPower(block, "rf")
        generateRemaining(block, "rf", "rf", "cable", true, "below");
    }
    if (id === "vatonage:tank") {

        tankShowPower(block, "liquid")
        generateRemaining(block, block.permutation.getState("vatonage:liquid_type"), "liquid", "pipe", true, "below");
    }
    if (id === "vatonage:gastank") {

        tankShowPower(block, "gas")
        generateRemaining(block, block.permutation.getState("vatonage:gas_type"), "gas", "tube", true, "below");
    }

    if (id === "vatonage:exp_transmitter") {

        let block2 = block
        if (isBlockId(block, "vatonage:exp_transmitter")) block = block.above(); block2 = block
        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" exp matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("exp").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore > 0) {
                let player
                if (isBlockId(block, "vatonage:tank")) { player = block.dimension.getEntities({ type: "minecraft:player", "location": block.location, maxDistance: 6 }) }
                if (isBlockId(block2, "vatonage:exp_transmitter")) { player = block.dimension.getEntities({ type: "minecraft:player", "location": block.location, maxDistance: 100 }) }
                player[0]?.runCommand(`xp ${rfScore}`)
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" exp ${rfScore}`)
                //tankShowLiquid(block2)
                //setPermutation(block, "vatonage:liquid_type", 'none')
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" exp 0`)
        }
    }
    if (id === "vatonage:get_bucket") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" ${states["vatonage:liquid_type"]} matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective(states["vatonage:liquid_type"]).getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore > 100) {
                let player
                if (isBlockId(block, "vatonage:tank")) { player = block.dimension.getEntities({ type: "minecraft:player", "location": block.location, maxDistance: 6 }) }
                if (player[0].getComponent("equippable").getEquipment("Mainhand").typeId == "minecraft:bucket") {
                    player[0].runCommand("clear @s bucket 0 1")
                    player[0].runCommand(`give @s ${states["vatonage:liquid_type"]}_bucket 1`)
                    block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" ${states["vatonage:liquid_type"]} 100`)
                    //tankShowLiquid(block, rfScore-100)
                }
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" ${states["vatonage:liquid_type"]} 0`)
        }

    }







    if (id === "vatonage:wireless_interact") {

        let player = block.dimension.getEntities({
            type: "minecraft:player",
            location: block.center(),
            maxDistance: 6
        })[0]
        let states = block.permutation.getAllStates()
        if (player.isSneaking) {
            if (states["vatonage:state"] == "transmitter") {
                setPermutation(block, "vatonage:state", "receiver")
                let allDyn = mc.world.getDynamicPropertyIds()
                allDyn.forEach(propertyName => {
                    if (mc.world.getDynamicProperty(propertyName) == `${block.location.x},${block.location.y},${block.location.z}`) {
                        let myProperty = propertyName.split(',')
                        mc.world.setDynamicProperty(propertyName, undefined)
                        mc.world.setDynamicProperty(`${myProperty[0]},receiver,${block.location.x},${block.location.y},${block.location.z}`, `${block.location.x},${block.location.y},${block.location.z}`)
                    }
                });
            } else
                if (states["vatonage:state"] == "receiver") {
                    setPermutation(block, "vatonage:state", "transmitter")
                    let allDyn = mc.world.getDynamicPropertyIds()
                    allDyn.forEach(propertyName => {
                        if (mc.world.getDynamicProperty(propertyName) == `${block.location.x},${block.location.y},${block.location.z}`) {
                            let myProperty = propertyName.split(',')
                            mc.world.setDynamicProperty(propertyName, undefined)
                            mc.world.setDynamicProperty(`${myProperty[0]},transmitter,${block.location.x},${block.location.y},${block.location.z}`, `${block.location.x},${block.location.y},${block.location.z}`)
                        }
                    });
                }
        } else {

            const modalForm = new mcui.ModalFormData().title('Network Configure');
            let oldFrequency = ''
            let allDyn = mc.world.getDynamicPropertyIds()
            allDyn.forEach(propertyName => {
                if (mc.world.getDynamicProperty(propertyName) == `${block.location.x},${block.location.y},${block.location.z}`) {
                    let myProperty = propertyName.split(',')
                    oldFrequency = myProperty[0]
                    mc.world.setDynamicProperty(propertyName, undefined)
                }
            });
            modalForm.textField('Input Network Name', "name", `${oldFrequency}`);

            modalForm
                .show(player)
                .then(formData => {
                    player.sendMessage(formData.formValues[0]);
                    mc.world.setDynamicProperty(`${formData.formValues[0]},${states["vatonage:state"]},${block.location.x},${block.location.y},${block.location.z}`, `${block.location.x},${block.location.y},${block.location.z}`)
                })

        }

    }
    if (id === "vatonage:power_wireless") {

        let allDyn = mc.world.getDynamicPropertyIds()
        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (states["vatonage:state"] == "transmitter" && scoreVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            for (let x = 0; x < allDyn.length; x++) {
                let propertyName = allDyn[x]
                if (mc.world.getDynamicProperty(propertyName) == `${block.location.x},${block.location.y},${block.location.z}` && rfScore > 0) {
                    let myProperty = propertyName.split(',')
                    let myPropertyFrequency = myProperty[0]
                    let myPropertyClass = myProperty[1]
                    allDyn.forEach(receiverName => {
                        if (receiverName.startsWith(`${myPropertyFrequency},receiver,`)) {
                            let receiverProperty = mc.world.getDynamicProperty(receiverName).split(',')
                            let receiverBlock = block.dimension.getBlock({ x: parseInt(receiverProperty[0]), y: parseInt(receiverProperty[1]), z: parseInt(receiverProperty[2]) })
                            generate(receiverBlock, "rf", rfScore, "rf", "cable", false)
                            block.dimension.runCommand(`scoreboard players set "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
                        }
                    });
                    break
                }
            }
        }
    }
    if (id == "vatonage:modification_station") {

        let entity = block.dimension.getEntities({
            type: "vatonage:modification_station",
            location: block.center(),
            maxDistance: 0.5
        })[0]
        if (!entity) block.dimension.runCommand(`summon vatonage:modification_station vatonage.module_station ${block.center().x} ${block.center().y} ${block.center().z} `)

        if (entity) {
            let entityContainer = entity.getComponent("inventory").container
            let helmetSlot = entityContainer.getItem(0)
            let chestplateSlot = entityContainer.getItem(1)
            let leggingsSlot = entityContainer.getItem(2)
            let bootsSlot = entityContainer.getItem(3)
            let toolSlot = entityContainer.getItem(4)
            let moduleSlot = entityContainer.getItem(5)
            let resultSlot = entityContainer.getItem(6)

            const helmetModules = [
                'vatonage:module_solar',
                'vatonage:module_night',
                'vatonage:module_power'
            ]
            const chestplateModules = [
                'vatonage:module_field',
                'vatonage:module_heart',
                'vatonage:module_jetpack',
                'vatonage:module_power',
                'vatonage:module_strength'
            ]
            const leggingsModules = [
                'vatonage:module_speed',
                'vatonage:module_power'
            ]
            const bootsModules = [
                'vatonage:module_fall',
                'vatonage:module_power',
                'vatonage:module_jump'
            ]
            const toolModules = [
                'vatonage:module_vein',
                'vatonage:module_strength',
                'vatonage:module_smelt',
                'vatonage:module_destroy'
            ]
            let cu = [
                { Slot: helmetSlot, type: "helmet", Modules: helmetModules, num: 0 },
                { Slot: chestplateSlot, type: "chestplate", Modules: chestplateModules, num: 1 },
                { Slot: leggingsSlot, type: "leggings", Modules: leggingsModules, num: 2 },
                { Slot: bootsSlot, type: "boots", Modules: bootsModules, num: 3 },
                { Slot: toolSlot, type: "tool", Modules: toolModules, num: 4 }
            ]
            for (const abc of cu) {
                if (abc.Slot && (abc.Slot.typeId == `vatonage:hexosteel_${abc.type}` || abc.Slot.typeId == `vatonage:midnight_${abc.type}` || abc.Slot.typeId.startsWith(`vatonage:modular_tool_`))) {
                    if (abc.Modules.includes(moduleSlot?.typeId) && !resultSlot) {
                        let lore = []
                        if (abc.Slot.getLore().length > 0) {
                            for (let x = 0; x < abc.Slot.getLore().length; x++)
                                lore.push(abc.Slot.getLore()[x])
                        }
                        if (!lore.some(str => str.includes(moduleSlot.typeId.replace("vatonage:", '').replace('_', ' ')))) {
                            lore.push(moduleSlot.typeId.replace("vatonage:", '').replace('_', ' '))
                            abc.Slot.setLore(lore)
                            clearItem(entityContainer, abc.num, 1)
                            clearItem(entityContainer, 5, 1)
                            entityContainer.setItem(6, abc.Slot)
                            break
                        }
                    }
                }
            }
        }
    }

    if (id == "vatonage:conveyor_filter") {

        let entity = block.dimension.getEntities({
            type: "vatonage:filter",
            location: block.center(),
            maxDistance: 0.5
        })[0]
        if (!entity) block.dimension.runCommand(`summon vatonage:filter vatonage.filter ${block.center().x} ${block.center().y} ${block.center().z} `)
        if (isBlockId(block.north(), "vatonage:conveyor")) {
            if (block.north().permutation.getState("minecraft:cardinal_direction") == 'south') {
                let itemEntity = block.dimension.getEntities({ type: "minecraft:item", location: block.north().center(), maxDistance: 0.5 })
                itemEntity.forEach(entityitem => {
                    let itemId = entityitem.getComponent("item").itemStack.typeId
                    let itemCount = entityitem.getComponent("item").itemStack.amount
                    filterItens(block, entityitem, itemId, itemCount, 0, 8)
                });
            }
            if (block.south().permutation.getState("minecraft:cardinal_direction") == 'north') {
                let itemEntity = block.dimension.getEntities({ type: "minecraft:item", location: block.south().center(), maxDistance: 0.5 })
                itemEntity.forEach(entityitem => {
                    let itemId = entityitem.getComponent("item").itemStack.typeId
                    let itemCount = entityitem.getComponent("item").itemStack.amount
                    filterItens(block, entityitem, itemId, itemCount, 18, 26)
                });
            }
            if (block.west().permutation.getState("minecraft:cardinal_direction") == 'east') {
                let itemEntity = block.dimension.getEntities({ type: "minecraft:item", location: block.west().center(), maxDistance: 0.5 })
                itemEntity.forEach(entityitem => {
                    let itemId = entityitem.getComponent("item").itemStack.typeId
                    let itemCount = entityitem.getComponent("item").itemStack.amount
                    filterItens(block, entityitem, itemId, itemCount, 9, 17)
                });
            }
            if (block.east().permutation.getState("minecraft:cardinal_direction") == 'west') {
                let itemEntity = block.dimension.getEntities({ type: "minecraft:item", location: block.east().center(), maxDistance: 0.5 })
                itemEntity.forEach(entityitem => {
                    let itemId = entityitem.getComponent("item").itemStack.typeId
                    let itemCount = entityitem.getComponent("item").itemStack.amount
                    filterItens(block, entityitem, itemId, itemCount, 27, 35)
                });
            }
            function filterItens(block, entityitem, itemId, itemCount, n0, n1) {
                for (let x = n0; x < n1; x++) {
                    let actualItem = entity.getComponent("minecraft:inventory").container.getItem(x)
                    for (let x = 0; x < 36; x++) {
                        if (isBlockId(block.north(), "vatonage:conveyor") && block.north().permutation.getState("minecraft:cardinal_direction") == 'north' && x >= 0 && x <= 8) {
                            let actualFilter = entity.getComponent("minecraft:inventory").container.getItem(x)
                            if (actualFilter?.typeId == itemId) {
                                entityitem?.runCommand('kill @s')
                                block.dimension.spawnItem(new mc.ItemStack(itemId, itemCount), block.north().center())
                            }
                        } else
                            if (isBlockId(block.south(), "vatonage:conveyor") && block.south().permutation.getState("minecraft:cardinal_direction") == 'south' && x >= 18 && x <= 26) {
                                let actualFilter = entity.getComponent("minecraft:inventory").container.getItem(x)
                                if (actualFilter?.typeId == itemId) {
                                    entityitem?.runCommand('kill @s')
                                    block.dimension.spawnItem(new mc.ItemStack(itemId, itemCount), block.south().center())
                                }
                            } else
                                if (isBlockId(block.east(), "vatonage:conveyor") && block.east().permutation.getState("minecraft:cardinal_direction") == 'east' && x >= 9 && x <= 17) {
                                    let actualFilter = entity.getComponent("minecraft:inventory").container.getItem(x)
                                    if (actualFilter?.typeId == itemId) {
                                        entityitem?.runCommand('kill @s')
                                        block.dimension.spawnItem(new mc.ItemStack(itemId, itemCount), block.east().center())
                                    }
                                } else
                                    if (isBlockId(block.west(), "vatonage:conveyor") && block.west().permutation.getState("minecraft:cardinal_direction") == 'west' && x >= 27 && x <= 35) {
                                        let actualFilter = entity.getComponent("minecraft:inventory").container.getItem(x)
                                        if (actualFilter?.typeId == itemId) {
                                            entityitem?.runCommand('kill @s')
                                            block.dimension.spawnItem(new mc.ItemStack(itemId, itemCount), block.west().center())
                                        }
                                    }

                    }
                    //}
                }
            }
        }
    }



































    if (id === "vatonage:solar_panel") {

        if (mc.world.getTimeOfDay() >= 1000 && mc.world.getTimeOfDay() <= 11000) {
            generate(block, "rf", 5, "rf", "cable", true, "below")
        }
    }
    if (id === "vatonage:advanced_solar_panel") {

        if (mc.world.getTimeOfDay() >= 1000 && mc.world.getTimeOfDay() <= 11000) {
            generate(block, "rf", 20, "rf", "cable", false)
        }
    }
    if (id === "vatonage:coal_generator") {
        const lado = block.permutation.getAllStates()["minecraft:cardinal_direction"];
        const directions = ["south", "north", "east", "west"];
        const directionIndex = {
            "north": 0,
            "south": 1,
            "east": 2,
            "west": 3
        };
        const checkAndRemoveCoal = (direction) => {
            const items = block.dimension.getEntities({
                type: "minecraft:item",
                location: block[direction]().location,
                maxDistance: 1
            });

            if (items[0]) {
                for (const item of items) {
                    if (item.getComponent("item").itemStack.typeId === "minecraft:coal") {
                        let count = item.getComponent("item").itemStack.amount
                        generate(block, "rf", 30 * count, "rf", "cable", false, blockId)
                        item.remove();
                    } else {
                        generateRemaining(block, "rf", "rf", "cable", false, blockId);
                    }
                }
            } else {
                generateRemaining(block, "rf", "rf", "cable", false, blockId);
            }
        };
        switch (lado) {
            case 'north':
            case 'south':
            case 'west':
            case 'east':
                checkAndRemoveCoal(directions[directionIndex[lado]]);
                break;
            default:
                break;
        }
    }

    if (id === "vatonage:liquid_pump") {
        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 5) {
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 5`)
                if (isBlockId(block.below(), "minecraft:water")) {
                    generate(block, "water", 10, "liquid", "pipe", true, "above")
                }
                if (isBlockId(block.below(), "minecraft:lava")) {
                    generate(block, "lava", 10, "liquid", "pipe", true, "above")
                }



            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }
    if (id === "vatonage:oil_rig") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 60) {
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 60`)
                generate(block, "oil", 5, "liquid", "pipe", true, "above")
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }
    if (id === "vatonage:nitrogen_extractor") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        const gasVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" carbon matches 0.. run gamerule sendcommandfeedback false`).successCount
        const mlVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" water matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0 && gasVerify > 0 && mlVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            const gasScore = mc.world.scoreboard.getObjective("carbon").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            const mlScore = mc.world.scoreboard.getObjective("water").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 20 && gasScore >= 20 && mlScore >= 20) {
                generate(block, "nitrogen", 10, "gas", "tube", true, "above")
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 20`)
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" water 20`)
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" carbon 20`)
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" water 0`)
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" carbon 0`)
        }
    }
    if (id === "vatonage:explosion_generator") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        const gasVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" nitrogen matches 0.. run gamerule sendcommandfeedback false`).successCount
        const mlVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" ammonia matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0 && gasVerify > 0 && mlVerify > 0) {
            //const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            const gasScore = mc.world.scoreboard.getObjective("nitrogen").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            const mlScore = mc.world.scoreboard.getObjective("ammonia").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (gasScore >= 20 && mlScore >= 20) {
                generate(block, "rf", 200, "rf", "cable", false)
                block.dimension.spawnEntity("minecraft:tnt", block.below().center())
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" nitrogen 20`)
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" ammonia 20`)
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" nitrogen 0`)
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" ammonia 0`)
        }
    }
    if (id === "vatonage:impact_reactor") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        const gasVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" oxygen matches 0.. run gamerule sendcommandfeedback false`).successCount
        const mlVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" carbon matches 0.. run gamerule sendcommandfeedback false`).successCount
        const mlVerify2 = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" water matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0 && gasVerify > 0 && mlVerify > 0 && mlVerify2 > 0) {
            //const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            const gasScore = mc.world.scoreboard.getObjective("oxygen").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            const mlScore = mc.world.scoreboard.getObjective("water").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            const mlScore2 = mc.world.scoreboard.getObjective("carbon").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (gasScore >= 40 && mlScore >= 40 && mlScore2 >= 40) {
                generate(block, "rf", 700, "rf", "cable", true, "above")
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" oxygen 40`)
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" carbon 40`)
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" water 40`)
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" water 0`)
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" carbon 0`)
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" oxygen 0`)
        }
    }
    if (id === "vatonage:ammonia_mixer") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        const gasVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" hydrogen matches 0.. run gamerule sendcommandfeedback false`).successCount
        const mlVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" nitrogen matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0 && gasVerify > 0 && mlVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            const gasScore = mc.world.scoreboard.getObjective("hydrogen").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            const mlScore = mc.world.scoreboard.getObjective("nitrogen").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 20 && gasScore >= 20 && mlScore >= 20) {
                generate(block, "ammonia", 10, "liquid", "pipe", true, "above")
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 20`)
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" hydrogen 20`)
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" nitrogen 20`)
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" hydrogen 0`)
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" nitrogen 0`)
        }
    }
    if (id === "vatonage:geothermal_generator") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        const gasVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" lava matches 0.. run gamerule sendcommandfeedback false`).successCount
        const mlVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" oil matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0 && gasVerify > 0 && mlVerify > 0) {
            const gasScore = mc.world.scoreboard.getObjective("lava").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            const mlScore = mc.world.scoreboard.getObjective("oil").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore == 0 && gasScore >= 20 && mlScore >= 20) {
                generate(block, "rf", 300, "rf", "cable", true, "above")
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" lava 20`)
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" oil 20`)
            } else
                if (rfScore > 0 && gasScore >= 20 && mlScore >= 20) {
                    generateRemaining(block, "rf", "rf", "cable", true, "above")
                }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" lava 0`)
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" oil 0`)
        }
    }
    if (id === "vatonage:milk_generator") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 10) {
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 10`)
                generate(block, "milk", 10, "liquid", "pipe", false)
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }
    if (id === "vatonage:exp_generator") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 100) {
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 100`)
                generate(block, "exp", 10, "liquid", "pipe", false)
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }
    if (id === "vatonage:oil_generator") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" oil matches 0.. run gamerule sendcommandfeedback false`).successCount
        const energyVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        if (mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`) == 0) setPermutation(block, "vatonage:on", 0)
        if (scoreVerify > 0) {
            const mlScore = mc.world.scoreboard.getObjective("oil").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            generateRemaining(block, "rf", "rf", "cable", false)
            if (mlScore == 20 && states["vatonage:liquid_type"] == "oil") {
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" oil 1`)
                generate(block, "rf", 130, "rf", "cable", false)
            }
            if (mlScore == 20) setPermutation(block, "vatonage:on", 1, 'vatonage:oil_generator')
        } else {
            //setPermutation(block, "vatonage:on", 0)
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" oil 0`)
        }
    }
    if (id === "vatonage:water_filter") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" water matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0) {
            const mlScore = mc.world.scoreboard.getObjective("water").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (mlScore == 20 && states["vatonage:liquid_type"] == "water") {
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" water 1`)
                generate(block, "fluor", 10, "liquid", "pipe", true, "above")
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" water 0`)
        }
    }
    if (id === "vatonage:water_generator") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" water matches 0.. run gamerule sendcommandfeedback false`).successCount
        const energyVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        if (mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`) == 0) setPermutation(block, "vatonage:on", 0)
        if (scoreVerify > 0) {
            const mlScore = mc.world.scoreboard.getObjective("water").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            generateRemaining(block, "rf", "rf", "cable", false)
            if (mlScore == 20 && states["vatonage:liquid_type"] == "water") {
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" water 1`)
                generate(block, "rf", 30, "rf", "cable", false)
                generate(block, "steam", 10, "gas", "tube", true, "above")
            }
            if (mlScore == 20) setPermutation(block, "vatonage:on", 1)
        } else {
            //setPermutation(block, "vatonage:on", 0)
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" water 0`)
        }
    }
    if (id === "vatonage:hydrogen_generator") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" hydrogen matches 0.. run gamerule sendcommandfeedback false`).successCount
        const energyVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        if (mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`) == 0) setPermutation(block, "vatonage:on", 0)
        if (scoreVerify > 0) {
            const mlScore = mc.world.scoreboard.getObjective("hydrogen").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            generateRemaining(block, "rf", "rf", "cable", false)
            if (mlScore >= 10 && states["vatonage:gas_type"] == "hydrogen") {
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" hydrogen 1`)
                generate(block, "rf", 100, "rf", "cable", false)
            }
            if (mlScore == 20) setPermutation(block, "vatonage:on", 1)
        } else {
            //setPermutation(block, "vatonage:on", 0)
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" hydrogen 0`)
        }
    }
    if (id === "vatonage:lava_generator") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" lava matches 0.. run gamerule sendcommandfeedback false`).successCount
        const energyVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        if (mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`) == 0) setPermutation(block, "vatonage:on", 0)
        if (scoreVerify > 0) {
            const mlScore = mc.world.scoreboard.getObjective("lava").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            generateRemaining(block, "rf", "rf", "cable", false)
            if (mlScore == 20 && states["vatonage:liquid_type"] == "lava") {
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" lava 1`)
                generate(block, "rf", 30, "rf", "cable", false)
            }
            if (mlScore == 20) setPermutation(block, "vatonage:on", 1)
        } else {
            //setPermutation(block, "vatonage:on", 0)
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" lava 0`)
        }
    }
    if (id === "vatonage:gas_absorber") {

        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 10) {
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 10`)
                if (block.dimension.id == "minecraft:overworld") {
                    generate(block, "oxygen", 10, "gas", "tube", false)
                }
                if (block.dimension.id == "minecraft:nether") {
                    generate(block, "carbon", 10, "gas", "tube", false)
                }
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }






    if (id === "vatonage:conveyor") {
        let states = block.permutation.getAllStates();
        if (states["minecraft:cardinal_direction"] == 'north') {
            setPermutation(block, "vatonage:north", (block.north().hasTag("conveyor_connect") && (block.north().permutation.getState("minecraft:cardinal_direction") != 'south')) || (block.below().north().hasTag("conveyor_connect") && block.below().north().permutation.getState("vatonage:state") != "default" && block.below().north().permutation.getState("minecraft:cardinal_direction") == 'south') || (block.north().hasTag("conveyor_connect") && block.north().permutation.getState("vatonage:state") != "default" && block.north().permutation.getState("minecraft:cardinal_direction") == 'south'), 'vatonage:conveyor');
            setPermutation(block, "vatonage:south", (block.south()?.hasTag("conveyor_connect") && (block.south().permutation.getState("minecraft:cardinal_direction") == 'north')) || (block.below().south().hasTag("conveyor_connect") && block.below().south().permutation.getState("vatonage:state") != "default" && block.below().south().permutation.getState("minecraft:cardinal_direction") == 'north') || (block.south().hasTag("conveyor_connect") && block.south().permutation.getState("vatonage:state") != "default" && block.south().permutation.getState("minecraft:cardinal_direction") == 'south'), 'vatonage:conveyor');
            setPermutation(block, "vatonage:east", block.east().hasTag("conveyor_connect") && block.east().permutation.getState("minecraft:cardinal_direction") == 'west', 'vatonage:conveyor');
            setPermutation(block, "vatonage:west", block.west().hasTag("conveyor_connect") && block.west().permutation.getState("minecraft:cardinal_direction") == 'east', 'vatonage:conveyor');
        }

        if (states["minecraft:cardinal_direction"] == 'south') {
            setPermutation(block, "vatonage:south", (block.north().hasTag("conveyor_connect") && block.north().permutation.getState("minecraft:cardinal_direction") == 'south') || (block.below().north().hasTag("conveyor_connect") && block.below().north().permutation.getState("vatonage:state") != "default" && block.below().north().permutation.getState("minecraft:cardinal_direction") == 'south') || (block.north().hasTag("conveyor_connect") && block.north().permutation.getState("vatonage:state") != "default" && block.north().permutation.getState("minecraft:cardinal_direction") == 'north'), 'vatonage:conveyor');
            setPermutation(block, "vatonage:north", (block.south().hasTag("conveyor_connect") && block.south().permutation.getState("minecraft:cardinal_direction") != 'north') || (block.below().south().hasTag("conveyor_connect") && block.below().south().permutation.getState("vatonage:state") != "default" && block.below().south().permutation.getState("minecraft:cardinal_direction") == 'north') || (block.south().hasTag("conveyor_connect") && block.south().permutation.getState("vatonage:state") != "default" && block.south().permutation.getState("minecraft:cardinal_direction") == 'north'), 'vatonage:conveyor');
            setPermutation(block, "vatonage:west", block.east().hasTag("conveyor_connect") && block.east().permutation.getState("minecraft:cardinal_direction") == 'west', 'vatonage:conveyor');
            setPermutation(block, "vatonage:east", block.west().hasTag("conveyor_connect") && block.west().permutation.getState("minecraft:cardinal_direction") == 'east', 'vatonage:conveyor');
        }

        if (states["minecraft:cardinal_direction"] == 'west') {
            setPermutation(block, "vatonage:east", block.north().hasTag("conveyor_connect") && block.north().permutation.getState("minecraft:cardinal_direction") == 'south', 'vatonage:conveyor');
            setPermutation(block, "vatonage:west", block.south().hasTag("conveyor_connect") && block.south().permutation.getState("minecraft:cardinal_direction") == 'north', 'vatonage:conveyor');
            setPermutation(block, "vatonage:south", (block.east().hasTag("conveyor_connect") && block.east().permutation.getState("minecraft:cardinal_direction") == 'west') || (block.below().east().hasTag("conveyor_connect") && block.below().east().permutation.getState("vatonage:state") != "default" && block.below().east().permutation.getState("minecraft:cardinal_direction") == 'west') || (block.east().hasTag("conveyor_connect") && block.east().permutation.getState("vatonage:state") != "default" && block.east().permutation.getState("minecraft:cardinal_direction") == 'east'), 'vatonage:conveyor');
            setPermutation(block, "vatonage:north", (block.west().hasTag("conveyor_connect") && block.west().permutation.getState("minecraft:cardinal_direction") != 'east') || (block.below().west().hasTag("conveyor_connect") && block.below().west().permutation.getState("vatonage:state") != "default" && block.below().west().permutation.getState("minecraft:cardinal_direction") == 'east') || (block.west().hasTag("conveyor_connect") && block.west().permutation.getState("vatonage:state") != "default" && block.west().permutation.getState("minecraft:cardinal_direction") == 'east'), 'vatonage:conveyor');
        }

        if (states["minecraft:cardinal_direction"] == 'east') {
            setPermutation(block, "vatonage:west", block.north().hasTag("conveyor_connect") && block.north().permutation.getState("minecraft:cardinal_direction") == 'south', 'vatonage:conveyor');
            setPermutation(block, "vatonage:east", block.south().hasTag("conveyor_connect") && block.south().permutation.getState("minecraft:cardinal_direction") == 'north', 'vatonage:conveyor');
            setPermutation(block, "vatonage:north", (block.east()?.hasTag("conveyor_connect") && block.east().permutation.getState("minecraft:cardinal_direction") != 'west') || (block.below().east().hasTag("conveyor_connect") && block.below().east().permutation.getState("vatonage:state") != "default" && block.below().east().permutation.getState("minecraft:cardinal_direction") == 'west') || (block.east().hasTag("conveyor_connect") && block.east().permutation.getState("vatonage:state") != "default" && block.east().permutation.getState("minecraft:cardinal_direction") == 'west'), 'vatonage:conveyor');
            setPermutation(block, "vatonage:south", (block.west().hasTag("conveyor_connect") && block.west().permutation.getState("minecraft:cardinal_direction") == 'east') || (block.below().west().hasTag("conveyor_connect") && block.below().west().permutation.getState("vatonage:state") != "default" && block.below().west().permutation.getState("minecraft:cardinal_direction") == 'east') || (block.west().hasTag("conveyor_connect") && block.west().permutation.getState("vatonage:state") != "default" && block.west().permutation.getState("minecraft:cardinal_direction") == 'west'), 'vatonage:conveyor');
        }

        if (states["minecraft:cardinal_direction"] == 'north' || states["minecraft:cardinal_direction"] == 'south') {
            if (block.south().hasTag("conveyor_connect") && block.above().north().hasTag("conveyor_connect") && block.above().north().permutation.getState("minecraft:cardinal_direction") == 'north' && block.south().permutation.getState("minecraft:cardinal_direction") == 'north') {
                setPermutation(block, "vatonage:state", "diagonal_up", 'vatonage:conveyor');
                setPermutation(block, "minecraft:cardinal_direction", 'north', 'vatonage:conveyor');
            } else if (block.south().hasTag("conveyor_connect") && block.above().north().hasTag("conveyor_connect") && block.above().north().permutation.getState("minecraft:cardinal_direction") == 'south' && block.south().permutation.getState("minecraft:cardinal_direction") == 'south') {
                setPermutation(block, "vatonage:state", "diagonal_down", 'vatonage:conveyor');
                setPermutation(block, "minecraft:cardinal_direction", 'north', 'vatonage:conveyor');
            } else if (block.north().hasTag("conveyor_connect") && block.above().south().hasTag("conveyor_connect") && block.above().south().permutation.getState("minecraft:cardinal_direction") == 'south' && block.north().permutation.getState("minecraft:cardinal_direction") == 'south') {
                setPermutation(block, "vatonage:state", "diagonal_up", 'vatonage:conveyor');
                setPermutation(block, "minecraft:cardinal_direction", 'south', 'vatonage:conveyor');
            } else if (block.north().hasTag("conveyor_connect") && block.above().south().hasTag("conveyor_connect") && block.above().south().permutation.getState("minecraft:cardinal_direction") == 'north' && block.north().permutation.getState("minecraft:cardinal_direction") == 'north') {
                setPermutation(block, "vatonage:state", "diagonal_down", 'vatonage:conveyor');
                setPermutation(block, "minecraft:cardinal_direction", 'south', 'vatonage:conveyor');
            } else {
                setPermutation(block, "vatonage:state", "default");
            }
        }

        if (states["minecraft:cardinal_direction"] == 'west' || states["minecraft:cardinal_direction"] == 'east') {
            if (block.east().hasTag("conveyor_connect") && block.above().west().hasTag("conveyor_connect") && block.above().west().permutation.getState("minecraft:cardinal_direction") == 'west' && block.east().permutation.getState("minecraft:cardinal_direction") == 'west') {
                setPermutation(block, "vatonage:state", "diagonal_up", 'vatonage:conveyor');
                setPermutation(block, "minecraft:cardinal_direction", 'west', 'vatonage:conveyor');
            } else if (block.east().hasTag("conveyor_connect") && block.above().west().hasTag("conveyor_connect") && block.above().west().permutation.getState("minecraft:cardinal_direction") == 'east' && block.east().permutation.getState("minecraft:cardinal_direction") == 'east') {
                setPermutation(block, "vatonage:state", "diagonal_down", 'vatonage:conveyor');
                setPermutation(block, "minecraft:cardinal_direction", 'west', 'vatonage:conveyor');
            } else if (block.west().hasTag("conveyor_connect") && block.above().east().hasTag("conveyor_connect") && block.above().east().permutation.getState("minecraft:cardinal_direction") == 'east' && block.west().permutation.getState("minecraft:cardinal_direction") == 'east') {
                setPermutation(block, "vatonage:state", "diagonal_up", 'vatonage:conveyor');
                setPermutation(block, "minecraft:cardinal_direction", 'east', 'vatonage:conveyor');
            } else if (block.west().hasTag("conveyor_connect") && block.above().east().hasTag("conveyor_connect") && block.above().east().permutation.getState("minecraft:cardinal_direction") == 'west' && block.west().permutation.getState("minecraft:cardinal_direction") == 'west') {
                setPermutation(block, "vatonage:state", "diagonal_down", 'vatonage:conveyor');
                setPermutation(block, "minecraft:cardinal_direction", 'east', 'vatonage:conveyor');
            } else {
                setPermutation(block, "vatonage:state", "default");
            }
        }
    }






    if (id === "vatonage:block_placer") {
        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            let blockToBreak
            if (states["minecraft:cardinal_direction"] == 'north') blockToBreak = block.north()
            if (states["minecraft:cardinal_direction"] == 'south') blockToBreak = block.south()
            if (states["minecraft:cardinal_direction"] == 'west') blockToBreak = block.west()
            if (states["minecraft:cardinal_direction"] == 'east') blockToBreak = block.east()
            if (rfScore >= 5 && blockToBreak && (blockToBreak.isAir || blockToBreak.isLiquid)) {
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 5`)
                let itemAbove
                if (!block.above().getComponent("inventory")) {
                    itemAbove = block.dimension.getEntities({ type: "minecraft:item", location: block.above().center(), maxDistance: 1 })
                    for (const itemStack of itemAbove) {
                        let itemNow = itemStack.getComponent("minecraft:item").itemStack
                        let type = "item"
                        try {
                            block.dimension.runCommand(`setblock 0 -63 0 ${itemNow.typeId}`);
                            block.dimension.runCommand(`setblock 0 -63 0 air`);
                            type = "block"
                        } catch (error) {
                            type = "item"
                        }
                        if (type == "block") {
                            itemAbove = itemNow
                            block.dimension.runCommand(`setblock 0 0 0 air`)
                            if (itemAbove.typeId != undefined) block.dimension.runCommand(`setblock ${blockToBreak.x} ${blockToBreak.y} ${blockToBreak.z} ${itemAbove.typeId}`)
                            itemStack.remove()
                            break
                        }
                    }
                }
                if (block.above().getComponent("inventory")?.container) {
                    let container = block.above().getComponent("inventory")?.container
                    for (let x = 0; x < container.size; x++) {
                        let itemNow = container.getItem(x)
                        let type = "item"
                        try {
                            block.dimension.runCommand(`setblock 0 -63 0 ${itemNow.typeId}`);
                            block.dimension.runCommand(`setblock 0 -63 0 air`);
                            type = "block"
                        } catch (error) {
                            type = "item"
                        }
                        if (type == "block") {
                            itemAbove = itemNow
                            block.dimension.runCommand(`setblock 0 0 0 air`)
                            if (itemAbove.typeId != undefined) block.dimension.runCommand(`setblock ${blockToBreak.x} ${blockToBreak.y} ${blockToBreak.z} ${itemAbove.typeId}`)
                            if (itemAbove.typeId != undefined) clearItem(container, x, 1)
                            break
                        }
                    }
                }
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }




}