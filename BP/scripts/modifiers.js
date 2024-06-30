import * as mc from "@minecraft/server"
import { clearItem } from "./system.js"

mc.system.afterEvents.scriptEventReceive.subscribe((data) => {

    if (data.id === "vatonage:armor") {
        let player = data.sourceEntity
        let helmetSlot = player?.getComponent("equippable").getEquipment("Head")
        let chestplateSlot = player?.getComponent("equippable").getEquipment("Chest")
        let leggingsSlot = player?.getComponent("equippable").getEquipment("Legs")
        let bootsSlot = player?.getComponent("equippable").getEquipment("Feet")
        if (
            helmetSlot?.typeId == "vatonage:midnight_helmet" &&
            chestplateSlot?.typeId == "vatonage:midnight_chestplate" &&
            leggingsSlot?.typeId == "vatonage:midnight_leggings" &&
            bootsSlot?.typeId == "vatonage:midnight_boots"
        ) {
            player.addEffect('resistance', 10, { showParticles: false, amplifier: 5 })
        }
        if (helmetSlot?.typeId == "vatonage:midnight_helmet" || helmetSlot?.typeId == "vatonage:hexosteel_helmet") {
            let lore = helmetSlot.getLore()
            if (lore.includes("module night")) player.addEffect('night_vision', 4, { showParticles: false })
            if (lore.includes("module solar") && mc.world.getTimeOfDay() > 1 && mc.world.getTimeOfDay() < 13500) {
                if (helmetSlot?.typeId == "vatonage:midnight_helmet" || helmetSlot?.typeId == "vatonage:hexosteel_helmet") helmetSlot.getComponent("minecraft:durability").damage > 0 ? helmetSlot.getComponent("minecraft:durability").damage-- : undefined, player?.getComponent("equippable").setEquipment("Head", helmetSlot)
                if (chestplateSlot?.typeId == "vatonage:midnight_chestplate" || chestplateSlot?.typeId == "vatonage:hexosteel_chestplate") chestplateSlot.getComponent("minecraft:durability").damage > 0 ? chestplateSlot.getComponent("minecraft:durability").damage-- : undefined, player?.getComponent("equippable").setEquipment("Chest", chestplateSlot)
                if (leggingsSlot?.typeId == "vatonage:midnight_leggings" || leggingsSlot?.typeId == "vatonage:hexosteel_leggings") leggingsSlot.getComponent("minecraft:durability").damage > 0 ? leggingsSlot.getComponent("minecraft:durability").damage-- : undefined, player?.getComponent("equippable").setEquipment("Legs", leggingsSlot)
                if (bootsSlot?.typeId == "vatonage:midnight_boots" || bootsSlot?.typeId == "vatonage:hexosteel_boots") bootsSlot.getComponent("minecraft:durability").damage > 0 ? bootsSlot.getComponent("minecraft:durability").damage-- : undefined, player?.getComponent("equippable").setEquipment("Feet", bootsSlot)
            }
        }
        if (chestplateSlot?.typeId == "vatonage:midnight_chestplate" || chestplateSlot?.typeId == "vatonage:hexosteel_chestplate") {
            let lore = chestplateSlot.getLore()
            if (lore.includes("module heart")) player.addEffect('health_boost', 4, { showParticles: false, amplifier: 4 })
            if (lore.includes("module jetpack") && player.isJumping) {
                player.addEffect(mc.EffectTypes.get("levitation"), 5, { amplifier: 7, showParticles: false })
                player.addEffect(mc.EffectTypes.get("slow_falling"), 2, { amplifier: 1, showParticles: false })
                let newItem = player.getComponent("equippable").getEquipment("Chest")
                newItem.getComponent("durability").damage++
                player?.getComponent("equippable").setEquipment("Chest", newItem)
            }
        }
        if (leggingsSlot?.typeId == "vatonage:midnight_leggings" || leggingsSlot?.typeId == "vatonage:hexosteel_leggings") {
            let lore = leggingsSlot.getLore()
            if (lore.includes("module speed")) player.addEffect('speed', 4, { showParticles: false, amplifier: 6 })
        }
        if (bootsSlot?.typeId == "vatonage:midnight_boots" || bootsSlot?.typeId == "vatonage:hexosteel_boots") {
            let lore = bootsSlot.getLore()
            if (lore.includes("module fall")) player.addEffect('slow_falling', 4, { showParticles: false, amplifier: 0.1 })
            if (lore.includes("module jump")) player.addEffect('jump_boost', 4, { showParticles: false, amplifier: 3 })
        }
    }

})

mc.world.afterEvents.entityHurt.subscribe((data) => {
    let player = data?.hurtEntity
    let entity = data?.damageSource?.damagingEntity
    if (player?.typeId == "minecraft:player" && entity) {
        let helmetSlot = player?.getComponent("equippable")?.getEquipment("Head")
        let chestplateSlot = player?.getComponent("equippable")?.getEquipment("Chest")
        let leggingsSlot = player?.getComponent("equippable")?.getEquipment("Legs")
        let bootsSlot = player?.getComponent("equippable")?.getEquipment("Feet")
        let random = Math.floor(Math.random() * 3)
        if (chestplateSlot?.getLore().includes("module field") && (chestplateSlot?.typeId == "vatonage:midnight_chestplate" || chestplateSlot?.typeId == "vatonage:hexosteel_chestplate")) {
            entity.applyKnockback(-entity.getViewDirection().x, -entity.getViewDirection().z, data.damage * 3, 0.5)
        }
        if (random == 1) {
            if (helmetSlot?.getLore().includes("module power") && helmetSlot?.typeId == "vatonage:midnight_helmet" || helmetSlot?.typeId == "vatonage:hexosteel_helmet") helmetSlot.getComponent("minecraft:durability").damage > 0 ? helmetSlot.getComponent("minecraft:durability").damage-- : undefined, player?.getComponent("equippable").setEquipment("Head", helmetSlot)
            if (chestplateSlot?.getLore().includes("module power") && chestplateSlot?.typeId == "vatonage:midnight_chestplate" || chestplateSlot?.typeId == "vatonage:hexosteel_chestplate") chestplateSlot.getComponent("minecraft:durability").damage > 0 ? chestplateSlot.getComponent("minecraft:durability").damage-- : undefined, player?.getComponent("equippable").setEquipment("Chest", chestplateSlot)
            if (leggingsSlot?.getLore().includes("module power") && leggingsSlot?.typeId == "vatonage:midnight_leggings" || leggingsSlot?.typeId == "vatonage:hexosteel_leggings") leggingsSlot.getComponent("minecraft:durability").damage > 0 ? leggingsSlot.getComponent("minecraft:durability").damage-- : undefined, player?.getComponent("equippable").setEquipment("Legs", leggingsSlot)
            if (bootsSlot?.getLore().includes("module power") && bootsSlot?.typeId == "vatonage:midnight_boots" || bootsSlot?.typeId == "vatonage:hexosteel_boots") bootsSlot.getComponent("minecraft:durability").damage > 0 ? bootsSlot.getComponent("minecraft:durability").damage-- : undefined, player?.getComponent("equippable").setEquipment("Feet", bootsSlot)
        }
    }
})
function veinMine(player, item, block, listOfBlocks, blockId) {
    let allBlocks = []
    if (listOfBlocks.includes(blockId)) {
        allBlocks.push({ origin: block, actual: block })
        veinRecursion(block, block)
    }
    function veinRecursion(origin, actual) {
        if (allBlocks.length < 50) {
            let allFaces = [
                actual.north(),
                actual.south(),
                actual.west(),
                actual.east(),
                actual.above(),
                actual.below(),
                actual.north().west(),
                actual.north().east(),
                actual.north().above(),
                actual.north().below(),
                actual.south().west(),
                actual.south().east(),
                actual.south().above(),
                actual.south().below(),
                actual.west().above(),
                actual.west().below(),
                actual.east().above(),
                actual.east().below(),
                actual.north().west().above(),
                actual.north().west().below(),
                actual.north().east().above(),
                actual.north().east().below(),
                actual.south().west().above(),
                actual.south().west().below(),
                actual.south().east().above(),
                actual.south().east().below()
            ];

            for (const face of allFaces) {
                if (face?.getItemStack()?.typeId == blockId && !allBlocks.some(tube => tube.actual.location.x === face.location.x && tube.actual.location.y === face.location.y && tube.actual.location.z === face.location.z)) {
                    allBlocks.push({ origin: block, actual: face })
                    veinRecursion(block, face)
                }
            }
        }
    }
    for (const currentBreak of allBlocks) {
        if (item.getLore().includes('module smelt') && (blockId == 'minecraft:deepslate_iron_ore' || blockId == 'minecraft:deepslate_gold_ore' || blockId == 'minecraft:deepslate_copper_ore' || blockId == 'minecraft:gold_ore' || blockId == 'minecraft:iron_ore' || blockId == 'minecraft:copper_ore')) {
            block.dimension.runCommand(`setblock ${currentBreak.actual.x} ${currentBreak.actual.y} ${currentBreak.actual.z} air`)
            let result
            if (blockId.includes('iron_ore')) result = 'minecraft:iron_ingot'
            if (blockId.includes('gold_ore')) result = 'minecraft:gold_ingot'
            if (blockId.includes('copper_ore')) result = 'minecraft:copper_ingot'
            currentBreak.actual.dimension.spawnItem(new mc.ItemStack(result), currentBreak.actual.center())
            currentBreak.actual.dimension.spawnParticle('vatonage:eletric_particle', currentBreak.actual.center())
        } else block.dimension.runCommand(`setblock ${currentBreak.actual.x} ${currentBreak.actual.y} ${currentBreak.actual.z} air destroy`)
    }
}
mc.world.beforeEvents.playerBreakBlock.subscribe((data) => {
    let player = data.player
    let item = data.itemStack
    let block = data.block
    let direction = player?.getBlockFromViewDirection()?.face

    if (item?.typeId == 'vatonage:modular_tool_pickaxe' && item?.getLore().includes('module vein')) {
        const list = [
            'minecraft:iron_ore',
            'minecraft:copper_ore',
            'minecraft:gold_ore',
            'minecraft:diamond_ore',
            'minecraft:emerald_ore',
            'minecraft:redstone_ore',
            'minecraft:coal_ore',
            'minecraft:quartz_ore',
            'minecraft:ancient_debris',
            'minecraft:iron_ore',
            'minecraft:deepslate_copper_ore',
            'minecraft:deepslate_gold_ore',
            'minecraft:deepslate_diamond_ore',
            'minecraft:deepslate_emerald_ore',
            'minecraft:deepslate_redstone_ore',
            'minecraft:deepslate_coal_ore'
        ]
        let id = block.getItemStack().typeId
        mc.system.run(() => {
            veinMine(player, item, block, list, id)
        })
    }
    if (item?.typeId == 'vatonage:modular_tool_shovel' && item?.getLore().includes('module vein')) {
        const list = [
            'minecraft:gravel',
            'minecraft:snow_layer'
        ]
        let id = block.getItemStack().typeId
        mc.system.run(() => {
            veinMine(player, item, block, list, id)
        })
    }
    if (item?.typeId == 'vatonage:modular_tool_axe' && item?.getLore().includes('module vein')) {
        const list = [
            'minecraft:acacia_log',
            'minecraft:birch_log',
            'minecraft:cherry_log',
            'minecraft:dark_oak_log',
            'minecraft:jungle_log',
            'minecraft:mangrove_log',
            'minecraft:oak_log',
            'minecraft:spruce_log'
        ]
        let id = block.getItemStack().typeId
        mc.system.run(() => {
            veinMine(player, item, block, list, id)
        })
    }


    let unbreakBlocks = [
        "minecraft:bedrock"
    ]
    let breakableBlocks

    if (item) {
        mc.system.run(() => {
            if (item.typeId == 'vatonage:modular_tool_pickaxe' || item.typeId == 'vatonage:modular_tool_shovel' || item.typeId == 'vatonage:modular_tool_axe') {
                item.getComponent("durability").damage++
                player?.getComponent("equippable").setEquipment("Mainhand", item)
            }
        })
    }

    if (item?.typeId == 'vatonage:modular_tool_pickaxe' && item?.getLore()?.includes('module smelt')) {
        const list = [
            { is: 'minecraft:cobblestone', to: 'minecraft:stone' },
            { is: 'minecraft:stone', to: 'minecraft:smooth_stone' },
            { is: 'minecraft:iron_ore', to: 'minecraft:iron_ingot' },
            { is: 'minecraft:gold_ore', to: 'minecraft:gold_ingot' },
            { is: 'minecraft:cooper_ore', to: 'minecraft:copper_ingot' },
            { is: 'minecraft:deepslate_iron_ore', to: 'minecraft:iron_ingot' },
            { is: 'minecraft:deepslate_gold_ore', to: 'minecraft:gold_ingot' },
            { is: 'minecraft:deepslate_cooper_ore', to: 'minecraft:copper_ingot' },
            { is: 'minecraft:sand', to: 'minecraft:glass' }
        ]
        for (let x = 0; x < list.length; x++) {
            if (block.getItemStack().typeId == list[x].is) {
                mc.system.run(() => {
                    //mc.system.runTimeout(()=>{
                    let items = block.dimension.getEntities({ location: block.center(), maxDistance: 5, type: item })
                    for (const item of items) {
                        if (item.getComponent('item')?.itemStack.typeId == list[x].is || (item.getComponent('item')?.itemStack.typeId == 'minecraft:cobblestone' && list[x].is == 'minecraft:stone')) item.remove()
                    }
                    //    }},1)
                    block.dimension.runCommandAsync(`setblock ${block.location.x} ${block.location.y} ${block.location.z} air`)
                    block.dimension.spawnParticle('minecraft:basic_smoke_particle', block.center())
                    block.dimension.spawnParticle('minecraft:basic_flame_particle', block.center())
                    block.dimension.spawnItem(new mc.ItemStack(list[x].to), block.location)
                })
            }
        }
    }

    if (item?.typeId == 'vatonage:modular_tool_shovel') {
        breakableBlocks = [
            'minecraft:grass_block',
            'minecraft:sand',
            'minecraft:dirt',
            "mincraft:gravel",
            'minecraft:red_sand',
            'minecraft:snow',
            'minecraft:snow_layer',
            'minecraft:farmland'
        ]
    }
    if (item?.typeId == 'vatonage:modular_tool_pickaxe') {
        unbreakBlocks = [
            'minecraft:grass_block',
            'minecraft:sand',
            'minecraft:dirt',
            "mincraft:gravel",
            'minecraft:red_sand',
            'minecraft:snow',
            'minecraft:snow_layer',
            'minecraft:farmland',
            'minecraft:bedrock'
        ]
    }

    if ((item?.typeId == "vatonage:drill" || ((item?.typeId == "vatonage:modular_tool_shovel" || item?.typeId == "vatonage:modular_tool_pickaxe") && item?.getLore()?.includes('module destroy'))) && player.isSneaking && item.getComponent("durability").damage < 1990) {
        let pattern
        if (direction == "North" || direction == "South") {
            pattern = [-1, -1, 0, 1, 1, 0]
        }
        if (direction == "West" || direction == "East") {
            pattern = [0, -1, -1, 0, 1, 1]
        }
        if (direction == "Down" || direction == "Up") {
            pattern = [-1, 0, -1, 1, 0, 1]
        }
        mc.system.run(() => {
            for (let x = pattern[0]; x <= pattern[3]; x++) {
                for (let y = pattern[1]; y <= pattern[4]; y++) {
                    for (let z = pattern[2]; z <= pattern[5]; z++) {
                        let breakBlock = block.dimension.getBlock({ x: block.location.x + x, y: block.location.y + y, z: block.location.z + z })
                        if (!unbreakBlocks.includes(breakBlock.getItemStack()?.typeId) && ((breakableBlocks && breakableBlocks.includes(breakBlock.getItemStack()?.typeId)) || !breakableBlocks)) {
                            block.dimension.runCommand(`setblock ${block.location.x + x} ${block.location.y + y} ${block.location.z + z} air destroy`)
                            item.getComponent("durability").damage++
                            player?.getComponent("equippable").setEquipment("Mainhand", item)
                        }
                    }
                }
            }
        })
    }
})
mc.world.afterEvents.itemUse.subscribe((data) => {
    let player = data.source
    let item = data.itemStack
    if (item?.typeId == "vatonage:nano_sword" && player.isJumping && item.getComponent("durability").damage < 1990) {
        let direction = player.getViewDirection()
        player.runCommand("camera @s set minecraft:third_person")
        mc.system.runTimeout(() => { player.applyKnockback(direction.x, direction.z, 10, direction.y * 3), mc.system.runTimeout(() => { player.runCommand("camera @s clear") }, 7) }, 7)

        item.getComponent("durability").damage++
        player?.getComponent("equippable").setEquipment("Mainhand", item)
        player.playSound('dash.sword')
        player.playAnimation('animation.nano_sword.dash')
    }

    let block = player.getBlockFromViewDirection({ maxDistance: 6 })?.block
    if (item.typeId == "vatonage:modular_tool_hoe" && block) {
        let usesBlock = [
            { on: 'minecraft:grass_block', to: 'minecraft:farmland' },
            { on: 'minecraft:dirt', to: 'minecraft:farmland' }
        ]
        for (const index of usesBlock) {
            if (block.getItemStack().typeId == index.on) {
                player.runCommand(`setblock ${block.location.x} ${block.location.y} ${block.location.z} ${index.to}`)
                item.getComponent("durability").damage++
                player?.getComponent("equippable").setEquipment("Mainhand", item)
                break
            }
        }
    }

    const changeMode = [
        { is: 'vatonage:modular_tool_sword', be: 'vatonage:modular_tool_pickaxe' },
        { is: 'vatonage:modular_tool_pickaxe', be: 'vatonage:modular_tool_axe' },
        { is: 'vatonage:modular_tool_axe', be: 'vatonage:modular_tool_shovel' },
        { is: 'vatonage:modular_tool_shovel', be: 'vatonage:modular_tool_hoe' },
        { is: 'vatonage:modular_tool_hoe', be: 'vatonage:modular_tool_sword' }
    ]
    if (item.typeId.startsWith('vatonage:modular_tool')) {
        for (const index of changeMode) {
            if (item?.typeId == index.is && player.isSneaking) {
                let newItem = new mc.ItemStack(index.be)
                newItem.getComponent('durability').damage = item.getComponent('durability').damage ? item.getComponent('durability').damage : 0
                if (item.getLore().length > 0) newItem.setLore(item.getLore())
                player?.getComponent("equippable").setEquipment("Mainhand", newItem)
                break
            }
        }
    }
})
mc.world.afterEvents.entityHitEntity.subscribe((data) => {
    let entity = data.hitEntity
    let player = data.damagingEntity
    let item = player?.getComponent("equippable")?.getEquipment("Mainhand")
    if ((item?.typeId == "vatonage:nano_sword") || item?.typeId == "vatonage:modular_tool_sword" && item?.getComponent("durability").damage < 1990) {
        if (item?.typeId == "vatonage:nano_sword" || (item?.typeId == "vatonage:modular_tool_sword") && item?.getLore()?.includes('module vein')) {
            let direction = player.getViewDirection()
            entity.dimension.spawnParticle('vatonage:eletric_attack', entity.location)
            mc.system.runTimeout(() => {
                let allEntity = entity.dimension.getEntities({
                    location: entity.location,
                    maxDistance: 5
                })
                allEntity.forEach(nextEntity => {
                    if (nextEntity?.typeId != "minecraft:player" && nextEntity?.typeId != "minecraft:item" && nextEntity?.typeId != "minecraft:xp_orb") {
                        nextEntity.dimension.spawnParticle('vatonage:eletric_attack', nextEntity.location)
                        nextEntity.applyDamage(15)
                    }
                });
            },)
            player.playSound('dash.sword')
            player.playAnimation('animation.nano_sword.dash')
        }
        item.getComponent("durability").damage++
        player?.getComponent("equippable").setEquipment("Mainhand", item)
    }
    if (item && item.getLore()?.includes('module strength')) {
        if (
            item.typeId == 'vatonage:modular_tool_sword' ||
            item.typeId == 'vatonage:modular_tool_pickaxe' ||
            item.typeId == 'vatonage:modular_tool_shovel' ||
            item.typeId == 'vatonage:modular_tool_axe' ||
            item.typeId == 'vatonage:modular_tool_hoe'
        ) {
            mc.system.runTimeout(() => {
                //entity.addEffect('instant_damage', 1, {showParticles: false, amplifier: 2})
                entity.applyDamage(10)
                //entity.setOnFire(5, false)
                entity.dimension.spawnParticle('vatonage:eletric_attack', entity.location)
            }, 10)
        }
    }
    if (item && item.getLore()?.includes('module smelt')) {
        if (
            item.typeId == 'vatonage:modular_tool_sword' ||
            item.typeId == 'vatonage:modular_tool_pickaxe' ||
            item.typeId == 'vatonage:modular_tool_shovel' ||
            item.typeId == 'vatonage:modular_tool_axe' ||
            item.typeId == 'vatonage:modular_tool_hoe'
        ) {
            entity.setOnFire(5, false)
        }
    }
})