import * as mc from "@minecraft/server"
import {setPermutation, unbreakBlocks, clearItem} from "./system.js"
import { generate } from "./globalTubes.js"
import {isBlockId} from "./stableTriggers.js"

export function machinesEvent(id, block, blockId){

    if (id === "vatonage:cobblestone_generator"){
        
        let loc = {x:block.above().location.x+0.5, y:block.above().location.y, z:block.above().location.z+0.5}
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0){
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 5){
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 5`)
                block.dimension.spawnItem(new mc.ItemStack("minecraft:cobblestone", 1), loc)
                let players = block.dimension.getEntities({
                    type : "minecraft:player",
                    location: block.location,
                    maxDistance: 5
                })
                for (const player of players){
                    player.runCommand(`playsound extinguish.candle @s `)
                }
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)  
        }
    }
    if (id === "vatonage:chargepad"){
        
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0){
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 5){
                let players = block.dimension.getEntities({
                    type : "minecraft:player",
                    location: block.location,
                    maxDistance: 1
                })
                for (const player of players){
                    
                if (player) block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 5`)
                for (let x = 0; x < rfScore; x++){
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
    if (id === "vatonage:quantum_miner"){
        
        let loc = {x:block.above().location.x+0.5, y:block.above().location.y, z:block.above().location.z+0.5}
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0){
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 100){
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 100`)
                const ores = [
                    "minecraft:diamond",
                    "minecraft:raw_iron",
                    "minecraft:raw_gold",
                    "minecraft:emerald",
                    "minecraft:redstone",
                    "minecraft:lapis_lazuli",
                    "minecraft:raw_copper",
                    "vatonage:uranium_cell",
                    "vatonage:uranium_cell",
                    "vatonage:uranium_cell",
                    "vatonage:uranium_cell",
                    "vatonage:uranium_cell",
                    "vatonage:uranium_cell",
                    "minecraft:stone"
                ]
                const nr = Math.floor(Math.random() * 14)
                block.dimension.spawnItem(new mc.ItemStack(ores[nr], 1), loc)
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)  
        }
    }
    if (id === "vatonage:nether_quantum_miner"){
        
        let loc = {x:block.above().location.x+0.5, y:block.above().location.y, z:block.above().location.z+0.5}
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0){
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 100 && block.dimension.id == "minecraft:nether"){
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 100`)
                const ores = [
                    "minecraft:gold_nugget",
                    "minecraft:ancient_debris",
                    "minecraft:netherrack",
                    "minecraft:quartz"
                ]
                const nr = Math.floor(Math.random() * 5)
                block.dimension.spawnItem(new mc.ItemStack(ores[nr], 1), loc)
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)  
        }
    }
    if (id === "vatonage:powered_fisher"){
        
        let loc = {x:block.above().location.x+0.5, y:block.above().location.y, z:block.above().location.z+0.5}
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0){
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.locatisson.y},${block.location.z}`)
            if (rfScore >= 20 && isBlockId(block.below(), "minecraft:water")){
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 20`)
                block.dimension.runCommand(`loot spawn ${block.center().x} ${block.above().y} ${block.center().z} loot fisherloot`)
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)  
        }
    }
    if (id === "vatonage:trash_can"){
        
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0){
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            let items = block.dimension.getEntities({
                type : "minecraft:item",
                location: block.above().location,
                maxDistance: 1
            })
            if (rfScore >= 1 && items[0]){
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 1`)
                for (const item of items){
                    item.remove()
                }
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)  
        }
    }
    if (id === "vatonage:block_breaker"){
        
        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0){
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            let blockToBreak
            if (states["vatonage:lado"] == 3) blockToBreak = block.north()
            if (states["vatonage:lado"] == 2) blockToBreak = block.south()
            if (states["vatonage:lado"] == 5) blockToBreak = block.west()
            if (states["vatonage:lado"] == 4) blockToBreak = block.east()
                let rst
            for (const unB of unbreakBlocks){
                if (isBlockId(blockToBreak, unB)) rst = false; else true
            }
            if (rfScore >= 5 && rst){
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 5`)
                blockToBreak.dimension.runCommand(`setblock ${blockToBreak.location.x} ${blockToBreak.location.y} ${blockToBreak.location.z} air destroy`)
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)  
        }
    }
    if (id === "vatonage:crusher"){
        
        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        
        const crusherRecipe = [
            {input: "minecraft:stone", output: "minecraft:cobblestone"},
            {input: "minecraft:cobblestone", output: "minecraft:gravel"},
            {input: "minecraft:gravel", output: "minecraft:sand"}
        ]

        let items = block.dimension.getEntities({
            type : "minecraft:item",
            location:{x: block.location.x+0.5, y:block.location.y, z:block.location.z+0.5},
            maxDistance: 1
        })
        for (const item of items){
            if (states["vatonage:lado"] == 2){
                item.teleport({x: block.location.x+0.5, y:block.location.y+0.2, z:item.location.z-0.1})
            }
            if (states["vatonage:lado"] == 3){
                item.teleport({x: block.location.x+0.5, y:block.location.y+0.2, z:item.location.z+0.1})
            }
            if (states["vatonage:lado"] == 4){
                item.teleport({x: item.location.x-0.1, y:block.location.y+0.2, z:block.location.z+0.5})
            }
            if (states["vatonage:lado"] == 5){
                item.teleport({x: item.location.x+0.1, y:block.location.y+0.2, z:block.location.z+0.5})
            }
        if (scoreVerify > 0){
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 5){
                if (items[0]){
                    
                    
                        for (const recipe of crusherRecipe){
                            if (item.getComponent("item").itemStack.typeId == recipe.input && !item.hasTag('ja')){
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
        if (scoreVerify > 0){
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore > 4){
                    setPermutation(block, "vatonage:on", 1, blockId)
                } else setPermutation(block, "vatonage:on", 0, blockId)
            } else {
                block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)  
            }
    }
    if (id === "vatonage:heavy_press"){
        
        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        
        const crusherRecipe = [
            {input: "minecraft:coal", output: "minecraft:emerald"},
            {input: "minecraft:emerald", output: "minecraft:diamond"}
        ]

        let items = block.dimension.getEntities({
            type : "minecraft:item",
            location:{x: block.location.x+0.5, y:block.location.y, z:block.location.z+0.5},
            maxDistance: 1
        })
        for (const item of items){
            if (states["vatonage:lado"] == 2){
                item.teleport({x: block.location.x+0.5, y:block.location.y+0.2, z:item.location.z-0.1})
            }
            if (states["vatonage:lado"] == 3){
                item.teleport({x: block.location.x+0.5, y:block.location.y+0.2, z:item.location.z+0.1})
            }
            if (states["vatonage:lado"] == 4){
                item.teleport({x: item.location.x-0.1, y:block.location.y+0.2, z:block.location.z+0.5})
            }
            if (states["vatonage:lado"] == 5){
                item.teleport({x: item.location.x+0.1, y:block.location.y+0.2, z:block.location.z+0.5})
            }
        if (scoreVerify > 0){
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 50){
                if (items[0]){
                        for (const recipe of crusherRecipe){
                            if (item.getComponent("item").itemStack.typeId == recipe.input && !item.hasTag(`${block.location.x},${block.location.y},${block.location.z}`)){
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
        if (scoreVerify > 0){
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore > 49){
                    setPermutation(block, "vatonage:on", 1, blockId)
                } else setPermutation(block, "vatonage:on", 0, blockId)
            } else {
                block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)  
            }
    }
    if (id === "vatonage:item_magnet"){
        
        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0){
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 5){
                let items = block.dimension.getEntities({
                    type : "minecraft:item",
                    location: block.location,
                    maxDistance: 10
                })
                if (items[0]){
                    for (const item of items){
                        if (!item.dimension.getBlock(item.location)?.hasTag("conveyor_connect")){
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
    if (id === "vatonage:neutron_activator"){
        
        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        
        const furnaceRecipe = [
            {input: "vatonage:uranium_cell", output: "vatonage:scrap"}
        ]

        let items = block.dimension.getEntities({
            type : "minecraft:item",
            location:{x: block.location.x+0.5, y:block.location.y, z:block.location.z+0.5},
            maxDistance: 1
        })
        for (const item of items){
            if (states["vatonage:lado"] == 2){
                item.teleport({x: block.location.x+0.5, y:block.location.y+0.2, z:item.location.z-0.1})
            }
            if (states["vatonage:lado"] == 3){
                item.teleport({x: block.location.x+0.5, y:block.location.y+0.2, z:item.location.z+0.1})
            }
            if (states["vatonage:lado"] == 4){
                item.teleport({x: item.location.x-0.1, y:block.location.y+0.2, z:block.location.z+0.5})
            }
            if (states["vatonage:lado"] == 5){
                item.teleport({x: item.location.x+0.1, y:block.location.y+0.2, z:block.location.z+0.5})
            }
        }
        let itemse = block.dimension.getEntities({
            type : "minecraft:item",
            location:{x: block.location.x+0.5, y:block.location.y, z:block.location.z+0.5},
            maxDistance: 0.3
        })
        for (const item of itemse){
        if (scoreVerify > 0){
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 100){
                if (items[0]){
                        for (const recipe of furnaceRecipe){
                            if (item.getComponent("item")?.itemStack.typeId == recipe.input){
                                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 100`)
                                generate(block, "uranium", 10, "gas", "tube", true, "above")
                                block.dimension.spawnItem(new mc.ItemStack(recipe.output, item.getComponent("item").itemStack.amount), item.location)
                                item.remove()
                            }
                        }
                    }
                }
            }
        }
        if (scoreVerify > 0){
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 100){
                    setPermutation(block, "vatonage:on", 1, blockId)
                    //block.dimension.spawnParticle('vatonage:powered_furnace', {x: block.center().x, y: block.location.y+0.8, z: block.center().z})
                } else setPermutation(block, "vatonage:on", 0, blockId)
            } else {
                block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)  
            }
    }
    if (id === "vatonage:powered_furnace"){
        
        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        
        const furnaceRecipe = [
            {input: "minecraft:cobblestone", output: "minecraft:stone"},
            {input: "minecraft:raw_iron", output: "minecraft:iron_ingot"},
            {input: "minecraft:raw_gold", output: "minecraft:gold_ingot"},
            {input: "minecraft:sand", output: "minecraft:glass"},
            {input: "minecraft:log", output: "minecraft:charcoal"},
            {input: "minecraft:raw_copper", output: "minecraft:copper_ingot"}
        ]

        let items = block.dimension.getEntities({
            type : "minecraft:item",
            location:{x: block.location.x+0.5, y:block.location.y, z:block.location.z+0.5},
            maxDistance: 1
        })
        for (const item of items){
            if (states["vatonage:lado"] == 2){
                item.teleport({x: block.location.x+0.5, y:block.location.y+0.2, z:item.location.z-0.1})
            }
            if (states["vatonage:lado"] == 3){
                item.teleport({x: block.location.x+0.5, y:block.location.y+0.2, z:item.location.z+0.1})
            }
            if (states["vatonage:lado"] == 4){
                item.teleport({x: item.location.x-0.1, y:block.location.y+0.2, z:block.location.z+0.5})
            }
            if (states["vatonage:lado"] == 5){
                item.teleport({x: item.location.x+0.1, y:block.location.y+0.2, z:block.location.z+0.5})
            }
        }
        let itemse = block.dimension.getEntities({
            type : "minecraft:item",
            location:{x: block.location.x+0.5, y:block.location.y, z:block.location.z+0.5},
            maxDistance: 0.3
        })
        for (const item of itemse){
        if (scoreVerify > 0){
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 20){
                if (items[0]){
                        for (const recipe of furnaceRecipe){
                            if (item.getComponent("item")?.itemStack.typeId == recipe.input){
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
        if (scoreVerify > 0){
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 20){
                    setPermutation(block, "vatonage:on", 1, blockId)
                    block.dimension.spawnParticle('vatonage:powered_furnace', {x: block.center().x, y: block.location.y+0.8, z: block.center().z})
                } else setPermutation(block, "vatonage:on", 0, blockId)
            } else {
                block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)  
            }
    }
    if (id === "vatonage:gas_condenser"){
        
        let states = block.permutation.getAllStates()
        let gasType = states["vatonage:gas_type"]
        //console.warn(gasType)
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" ${gasType} matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0){
            const gasmlScore = mc.world.scoreboard.getObjective(gasType).getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (gasmlScore >= 20){
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
    if (id === "vatonage:freezer"){
        
        let states = block.permutation.getAllStates()
        let gasType = states["vatonage:liquid_type"]
        
        //console.warn(gasType)
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" ${gasType} matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0){
            const gasmlScore = mc.world.scoreboard.getObjective(gasType).getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (gasmlScore >= 20){
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
    if (id === "vatonage:plastic_refinery"){
        
        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        const mlVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" oil matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0 && mlVerify > 0){
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            const mlScore = mc.world.scoreboard.getObjective("oil").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 70 && mlScore >= 70){
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
    if (id === "vatonage:graphene_factory"){
        
        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        const mlVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" carbon matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0 && mlVerify > 0){
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            const mlScore = mc.world.scoreboard.getObjective("carbon").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 40 && mlScore >= 10){
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
    if (id === "vatonage:monster_masher"){
        
        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0){
            let mobs = block.dimension.getEntities({
                location: block.above(),
                maxDistance: 1
            })
            if (mobs[0]){
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 10){
                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 10`)
                mobs.forEach(mob => {
                    console.warn(mob.typeId)
                    if (mob.typeId != 'minecraft:item' && mob.typeId != 'minecraft:xp_orb') mob.applyDamage(10); else mob.teleport(block.below().center())
                });
                }
            }
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)  
        }
    }
    if (id === "vatonage:gas_separator"){
        
        let states = block.permutation.getAllStates()
        let bgl = states["vatonage:liquid_type"]
        //console.warn(bgl)
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        const mlVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" ${bgl} matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0 && mlVerify > 0){
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            const mlScore = mc.world.scoreboard.getObjective(bgl).getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 10 && mlScore >= 10){
                if (states["vatonage:block_rotation"] == 2) {
                    if (states["vatonage:liquid_type"] == 'oil'){
                        generate(block, "hydrogen", 10, "gas", "tube", true, "west")
                        generate(block, "carbon", 10, "gas", "tube", true, "east")
                    }
                    if (states["vatonage:liquid_type"] == 'water'){
                        generate(block, "hydrogen",10, "gas", "tube", true, "west")
                        generate(block, "oxygen", 10, "gas", "tube", true, "east")
                    }
                }
                if (states["vatonage:block_rotation"] == 3) {
                    if (states["vatonage:liquid_type"] == 'oil'){
                        generate(block, "hydrogen",10, "gas", "tube", true, "east")
                        generate(block, "carbon", 10, "gas", "tube", true, "west")
                    }
                    if (states["vatonage:liquid_type"] == 'water'){
                        generate(block, "hydrogen",10, "gas", "tube", true, "east")
                        generate(block, "oxygen", 10, "gas", "tube", true, "west")
                    }
                }
                if (states["vatonage:block_rotation"] == 4) {
                    if (states["vatonage:liquid_type"] == 'oil'){
                        generate(block, "hydrogen",10, "gas", "tube", true, "south")
                        generate(block, "carbon", 10, "gas", "tube", true, "north")
                    }
                    if (states["vatonage:liquid_type"] == 'water'){
                        generate(block, "hydrogen",10, "gas", "tube", true, "south")
                        generate(block, "oxygen", 10, "gas", "tube", true, "north")
                    }
                }
                if (states["vatonage:block_rotation"] == 5) {
                    if (states["vatonage:liquid_type"] == 'oil'){
                        generate(block, "hydrogen",10, "gas", "tube", true, "north")
                        generate(block, "carbon", 10, "gas", "tube", true, "south")
                    }
                    if (states["vatonage:liquid_type"] == 'water'){
                        generate(block, "hydrogen",10, "gas", "tube", true, "north")
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
    if (id === "vatonage:silicon_factory"){
        
        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount
        const mlVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" lava matches 0.. run gamerule sendcommandfeedback false`).successCount
        const gasmlVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" carbon matches 0.. run gamerule sendcommandfeedback false`).successCount
        if (scoreVerify > 0 && mlVerify > 0 && gasmlVerify > 0){
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            const mlScore = mc.world.scoreboard.getObjective("lava").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            const gasmlScore = mc.world.scoreboard.getObjective("carbon").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 20 && mlScore >= 20 && gasmlScore >= 20){
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
}