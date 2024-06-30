import * as mc from "@minecraft/server"
import * as mcui from "@minecraft/server-ui"
import { generate, generateRemaining } from "./globalTubes.js"
import { isBlockId } from "./stableTriggers.js"
import { allBlocksId } from "./globalTubes.js"

export const unbreakBlocks = [
    "minecraft:air",
    "minecraft:bedrock",
    "minecraft:obsidian"
]

export function setPermutation(block, stateAdd, stateValue, blockId) {
    if (block && blockId) {
        const result = block.permutation.getAllStates();
        result[stateAdd] = stateValue;
        block.setPermutation(mc.BlockPermutation.resolve(blockId, result));
    }
}

export function batteryShowPower(block, contentType) {
    const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" ${contentType} matches 0.. run gamerule sendcommandfeedback false`).successCount
    if (scoreVerify > 0) {
        const Score = mc.world.scoreboard.getObjective(`${contentType}`).getScore(`${block.location.x},${block.location.y},${block.location.z}`)
        if (Score == 0) setPermutation(block, "vatonage:power_stage", 0, 'vatonage:battery')
        if (Score > 0) {
            let amount = Score
            if (amount > 0 && amount < 66) setPermutation(block, "vatonage:power_stage", 1, 'vatonage:battery')
            if (amount > 66 * 1 && amount < 66 * 2) setPermutation(block, "vatonage:power_stage", 2, 'vatonage:battery')
            if (amount > 66 * 2 && amount < 66 * 3) setPermutation(block, "vatonage:power_stage", 3, 'vatonage:battery')
            if (amount > 66 * 3 && amount < 66 * 4) setPermutation(block, "vatonage:power_stage", 4, 'vatonage:battery')
            if (amount > 66 * 4 && amount < 66 * 5) setPermutation(block, "vatonage:power_stage", 5, 'vatonage:battery')
            if (amount > 66 * 5 && amount < 66 * 6) setPermutation(block, "vatonage:power_stage", 6, 'vatonage:battery')
            if (amount > 66 * 6 && amount < 66 * 7) setPermutation(block, "vatonage:power_stage", 7, 'vatonage:battery')
            if (amount > 66 * 7 && amount < 66 * 8) setPermutation(block, "vatonage:power_stage", 8, 'vatonage:battery')
            if (amount > 66 * 8 && amount < 66 * 9) setPermutation(block, "vatonage:power_stage", 9, 'vatonage:battery')
            if (amount > 66 * 9 && amount < 66 * 10) setPermutation(block, "vatonage:power_stage", 10, 'vatonage:battery')
            if (amount > 66 * 10 && amount < 66 * 11) setPermutation(block, "vatonage:power_stage", 11, 'vatonage:battery')
            if (amount > 66 * 11 && amount < 66 * 12) setPermutation(block, "vatonage:power_stage", 12, 'vatonage:battery')
            if (amount > 66 * 12 && amount < 66 * 13) setPermutation(block, "vatonage:power_stage", 13, 'vatonage:battery')
            if (amount > 66 * 13 && amount < 66 * 14) setPermutation(block, "vatonage:power_stage", 14, 'vatonage:battery')
            if (amount > 66 * 14) setPermutation(block, "vatonage:power_stage", 15, 'vatonage:battery')
        }
    }
}
export function tankShowPower(block, type) {
    const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" ${block.permutation.getState(`vatonage:${type}_type`)} matches 0.. run gamerule sendcommandfeedback false`).successCount
    if (scoreVerify > 0) {
        const Score = mc.world.scoreboard.getObjective(`${block.permutation.getState(`vatonage:${type}_type`)}`).getScore(`${block.location.x},${block.location.y},${block.location.z}`)
        if (Score > 0) {
            let amount = Score
            let typeId
            if (type == 'liquid') typeId = 'vatonage:tank'
            if (type == 'gas') typeId = 'vatonage:gastank'
            if (typeId) {
                if (amount == 0) setPermutation(block, `vatonage:${type}_stage`, 0, typeId)
                if (amount > 0 && amount < 66) setPermutation(block, `vatonage:${type}_stage`, 1, typeId)
                if (amount > 100 * 1 && amount < 100 * 2) setPermutation(block, `vatonage:${type}_stage`, 2, typeId)
                if (amount > 100 * 2 && amount < 100 * 3) setPermutation(block, `vatonage:${type}_stage`, 3, typeId)
                if (amount > 100 * 3 && amount < 100 * 4) setPermutation(block, `vatonage:${type}_stage`, 4, typeId)
                if (amount > 100 * 4 && amount < 100 * 5) setPermutation(block, `vatonage:${type}_stage`, 5, typeId)
                if (amount > 100 * 5 && amount < 100 * 6) setPermutation(block, `vatonage:${type}_stage`, 6, typeId)
                if (amount > 100 * 6 && amount < 100 * 7) setPermutation(block, `vatonage:${type}_stage`, 7, typeId)
                if (amount > 100 * 7 && amount < 100 * 8) setPermutation(block, `vatonage:${type}_stage`, 8, typeId)
                if (amount > 100 * 8 && amount < 100 * 9) setPermutation(block, `vatonage:${type}_stage`, 9, typeId)
                if (amount > 100 * 9) setPermutation(block, `vatonage:${type}_stage`, 10)
            }
        }
    }
}
export function cablePattern(block, carriageType, transporterType, blockId) {
    if (!isBlockId(block, 'minecraft:air')) {
        setPermutation(block, `vatonage:above`, (block.above()?.permutation.getState("vatonage:below") == `allOutput` || block.above()?.permutation.getState("vatonage:below") == `${carriageType}Output` || block.above()?.hasTag(`${carriageType}_output`)) ? transporterType :
            (block.above()?.permutation.getState("vatonage:below") == `allInput` || block.above()?.permutation.getState("vatonage:below") == `${carriageType}Input` || block.above()?.hasTag(`${carriageType}_input`)) ? transporterType :
                (block.above()?.hasTag(`${carriageType}_${transporterType}`)) ? transporterType : "none", blockId);

        setPermutation(block, `vatonage:below`, (block.below()?.permutation.getState("vatonage:above") == `allOutput` || block.below()?.permutation.getState("vatonage:above") == `${carriageType}Output` || block.below()?.hasTag(`${carriageType}_output`)) ? transporterType :
            (block.below()?.permutation.getState("vatonage:above") == `allInput` || block.below()?.permutation.getState("vatonage:above") == `${carriageType}Input` || block.below()?.hasTag(`${carriageType}_input`)) ? transporterType :
                (block.below()?.hasTag(`${carriageType}_${transporterType}`)) ? transporterType : "none", blockId);

        setPermutation(block, `vatonage:north`, (block.north()?.permutation.getState("vatonage:south") == `allOutput` || block.north()?.permutation.getState("vatonage:south") == `${carriageType}Output` || block.north()?.hasTag(`${carriageType}_output`)) ? transporterType :
            (block.north()?.permutation.getState("vatonage:south") == `allInput` || block.north()?.permutation.getState("vatonage:south") == `${carriageType}Input` || block.north()?.hasTag(`${carriageType}_input`)) ? transporterType :
                (block.north()?.hasTag(`${carriageType}_${transporterType}`)) ? transporterType : "none", blockId);

        setPermutation(block, `vatonage:south`, (block.south()?.permutation.getState("vatonage:north") == `allOutput` || block.south()?.permutation.getState("vatonage:north") == `${carriageType}Output` || block.south()?.hasTag(`${carriageType}_output`)) ? transporterType :
            (block.south()?.permutation.getState("vatonage:north") == `allInput` || block.south()?.permutation.getState("vatonage:north") == `${carriageType}Input` || block.south()?.hasTag(`${carriageType}_input`)) ? transporterType :
                (block.south()?.hasTag(`${carriageType}_${transporterType}`)) ? transporterType : "none", blockId);

        setPermutation(block, `vatonage:west`, (block.west()?.permutation.getState("vatonage:east") == `allOutput` || block.west()?.permutation.getState("vatonage:east") == `${carriageType}Output` || block.west()?.hasTag(`${carriageType}_output`)) ? transporterType :
            (block.west()?.permutation.getState("vatonage:east") == `allInput` || block.west()?.permutation.getState("vatonage:east") == `${carriageType}Input` || block.west()?.hasTag(`${carriageType}_input`)) ? transporterType :
                (block.west()?.hasTag(`${carriageType}_${transporterType}`)) ? transporterType : "none", blockId);

        setPermutation(block, `vatonage:east`, (block.east()?.permutation.getState("vatonage:west") == `allOutput` || block.east()?.permutation.getState("vatonage:west") == `${carriageType}Output` || block.east()?.hasTag(`${carriageType}_output`)) ? transporterType :
            (block.east()?.permutation.getState("vatonage:west") == `allInput` || block.east()?.permutation.getState("vatonage:west") == `${carriageType}Input` || block.east()?.hasTag(`${carriageType}_input`)) ? transporterType :
                (block.east()?.hasTag(`${carriageType}_${transporterType}`)) ? transporterType : "none", blockId);
    }

    const scoreValue = mc?.world?.scoreboard?.getObjective("resetAll")?.getScore("world");
    if (scoreValue > 0 && block)
        setPermutation(block, `vatonage:${carriageType}_type`, "none", blockId);
}


mc.world.afterEvents.playerPlaceBlock.subscribe((data) => {
    let block = data.block
    if (isBlockId(block, "vatonage:cable")) {
        cablePattern(block, "rf", "cable", 'vatonage:cable')
        if (isBlockId(block.above(), "vatonage:cable")) cablePattern(block.above(), "rf", "cable", 'vatonage:cable')
        if (isBlockId(block.below(), "vatonage:cable")) cablePattern(block.below(), "rf", "cable", 'vatonage:cable')
        if (isBlockId(block.north(), "vatonage:cable")) cablePattern(block.north(), "rf", "cable", 'vatonage:cable')
        if (isBlockId(block.south(), "vatonage:cable")) cablePattern(block.south(), "rf", "cable", 'vatonage:cable')
        if (isBlockId(block.west(), "vatonage:cable")) cablePattern(block.west(), "rf", "cable", 'vatonage:cable')
        if (isBlockId(block.east(), "vatonage:cable")) cablePattern(block.east(), "rf", "cable", 'vatonage:cable')
    }
    if (isBlockId(block, "vatonage:pipe")) {
        cablePattern(block, "liquid", "pipe", 'vatonage:pipe')
        if (isBlockId(block.above(), "vatonage:pipe")) cablePattern(block.above(), "liquid", "pipe", 'vatonage:pipe')
        if (isBlockId(block.below(), "vatonage:pipe")) cablePattern(block.below(), "liquid", "pipe", 'vatonage:pipe')
        if (isBlockId(block.north(), "vatonage:pipe")) cablePattern(block.north(), "liquid", "pipe", 'vatonage:pipe')
        if (isBlockId(block.south(), "vatonage:pipe")) cablePattern(block.south(), "liquid", "pipe", 'vatonage:pipe')
        if (isBlockId(block.west(), "vatonage:pipe")) cablePattern(block.west(), "liquid", "pipe", 'vatonage:pipe')
        if (isBlockId(block.east(), "vatonage:pipe")) cablePattern(block.east(), "liquid", "pipe", 'vatonage:pipe')
    }
    if (isBlockId(block, "vatonage:tube")) {
        cablePattern(block, "gas", "tube", 'vatonage:tube')
        if (isBlockId(block.above(), "vatonage:tube")) cablePattern(block.above(), "gas", "tube", 'vatonage:tube')
        if (isBlockId(block.below(), "vatonage:tube")) cablePattern(block.below(), "gas", "tube", 'vatonage:tube')
        if (isBlockId(block.north(), "vatonage:tube")) cablePattern(block.north(), "gas", "tube", 'vatonage:tube')
        if (isBlockId(block.south(), "vatonage:tube")) cablePattern(block.south(), "gas", "tube", 'vatonage:tube')
        if (isBlockId(block.west(), "vatonage:tube")) cablePattern(block.west(), "gas", "tube", 'vatonage:tube')
        if (isBlockId(block.east(), "vatonage:tube")) cablePattern(block.east(), "gas", "tube", 'vatonage:tube')
    }
})
mc.world.beforeEvents.playerBreakBlock.subscribe((data) => {
    let player = data.player;
    let block = data.block
    mc.system.run(() => {
        if (isBlockId(block.above(), "vatonage:cable")) cablePattern(block.above(), "rf", "cable", 'vatonage:cable')
        if (isBlockId(block.below(), "vatonage:cable")) cablePattern(block.below(), "rf", "cable", 'vatonage:cable')
        if (isBlockId(block.north(), "vatonage:cable")) cablePattern(block.north(), "rf", "cable", 'vatonage:cable')
        if (isBlockId(block.south(), "vatonage:cable")) cablePattern(block.south(), "rf", "cable", 'vatonage:cable')
        if (isBlockId(block.west(), "vatonage:cable")) cablePattern(block.west(), "rf", "cable", 'vatonage:cable')
        if (isBlockId(block.east(), "vatonage:cable")) cablePattern(block.east(), "rf", "cable", 'vatonage:cable')
        if (isBlockId(block.above(), "vatonage:pipe")) cablePattern(block.above(), "liquid", "pipe", 'vatonage:pipe')
        if (isBlockId(block.below(), "vatonage:pipe")) cablePattern(block.below(), "liquid", "pipe", 'vatonage:pipe')
        if (isBlockId(block.north(), "vatonage:pipe")) cablePattern(block.north(), "liquid", "pipe", 'vatonage:pipe')
        if (isBlockId(block.south(), "vatonage:pipe")) cablePattern(block.south(), "liquid", "pipe", 'vatonage:pipe')
        if (isBlockId(block.west(), "vatonage:pipe")) cablePattern(block.west(), "liquid", "pipe", 'vatonage:pipe')
        if (isBlockId(block.east(), "vatonage:pipe")) cablePattern(block.east(), "liquid", "pipe", 'vatonage:pipe')
        if (isBlockId(block.above(), "vatonage:tube")) cablePattern(block.above(), "gas", "tube", 'vatonage:tube')
        if (isBlockId(block.below(), "vatonage:tube")) cablePattern(block.below(), "gas", "tube", 'vatonage:tube')
        if (isBlockId(block.north(), "vatonage:tube")) cablePattern(block.north(), "gas", "tube", 'vatonage:tube')
        if (isBlockId(block.south(), "vatonage:tube")) cablePattern(block.south(), "gas", "tube", 'vatonage:tube')
        if (isBlockId(block.west(), "vatonage:tube")) cablePattern(block.west(), "gas", "tube", 'vatonage:tube')
        if (isBlockId(block.east(), "vatonage:tube")) cablePattern(block.east(), "gas", "tube", 'vatonage:tube')
        if (mc.world.getDynamicProperty(`${block.location.x},${block.location.y},${block.location.z}`) == block.dimension.id) {
            mc.world.setDynamicProperty(`${block.location.x},${block.location.y},${block.location.z}`, '')
        }
    })
    block = player.dimension.getBlock(data.block);
    if (block.hasTag('vatonageblock')) {
        mc.system.run(() => {
            player.runCommand("scriptevent vatonage:resetAll");
            block.dimension.runCommand(`scoreboard players reset "${block.location.x},${block.location.y},${block.location.z}" rf`)
            block.dimension.runCommand(`scoreboard players reset "${block.location.x},${block.location.y},${block.location.z}" ml`)
            block.dimension.runCommand(`scoreboard players reset "${block.location.x},${block.location.y},${block.location.z}" water`)
            block.dimension.runCommand(`scoreboard players reset "${block.location.x},${block.location.y},${block.location.z}" lava`)
            block.dimension.runCommand(`scoreboard players reset "${block.location.x},${block.location.y},${block.location.z}" oil`)
            block.dimension.runCommand(`scoreboard players reset "${block.location.x},${block.location.y},${block.location.z}" exp`)
            block.dimension.runCommand(`scoreboard players reset "${block.location.x},${block.location.y},${block.location.z}" ammonia`)
            block.dimension.runCommand(`scoreboard players reset "${block.location.x},${block.location.y},${block.location.z}" milk`)
            block.dimension.runCommand(`scoreboard players reset "${block.location.x},${block.location.y},${block.location.z}" gasml`)
            block.dimension.runCommand(`scoreboard players reset "${block.location.x},${block.location.y},${block.location.z}" steam`)
            block.dimension.runCommand(`scoreboard players reset "${block.location.x},${block.location.y},${block.location.z}" nitrogen`)
            block.dimension.runCommand(`scoreboard players reset "${block.location.x},${block.location.y},${block.location.z}" hydrogen`)
            block.dimension.runCommand(`scoreboard players reset "${block.location.x},${block.location.y},${block.location.z}" oxygen`)
            block.dimension.runCommand(`scoreboard players reset "${block.location.x},${block.location.y},${block.location.z}" carbon`)
            block.dimension.runCommand(`scoreboard players reset "${block.location.x},${block.location.y},${block.location.z}" nuclear_fuel`)
            block.dimension.runCommand(`scoreboard players reset "${block.location.x},${block.location.y},${block.location.z}" uranium`)
            block.dimension.runCommand(`scoreboard players reset "${block.location.x},${block.location.y},${block.location.z}" fluor`)
            let allDyn = mc.world.getDynamicPropertyIds()
            allDyn.forEach(dynamic => {
                if (mc.world.getDynamicProperty(dynamic) == `${block.location.x},${block.location.y},${block.location.z}`) mc.world.setDynamicProperty(dynamic, undefined)
            });
        });
    }
})
export function clearItem(block, slot, count) {
    let selectedSlot = block.getItem(slot);
    if (selectedSlot?.amount > count) {
        selectedSlot.amount = selectedSlot.amount - count;
        block.setItem(slot, selectedSlot);
    } else {
        let air = new mc.ItemStack("minecraft:air");
        block.setItem(slot, air);
    }
}

mc.system.afterEvents.scriptEventReceive.subscribe((data) => {
    if (data.id === "rc:wrmv") {
        mc.world.clearDynamicProperties()
    }
    if (data.id === "rc:a") {
        allBlocksId.forEach(item => {
            data.sourceEntity.runCommand(`give @s ${item}`)
        });
    }
    if (data.id === "rc:despawn_entity") {
        data.sourceEntity.remove()
    }
    if (data.id === "vatonage:resetAll") {
        data.sourceEntity.runCommand("scoreboard objectives add resetAll dummy");
        data.sourceEntity.runCommand("scoreboard players set world resetAll 25");
    }
    if (data.id === "vatonage:takexp") {
        let block = data.sourceBlock
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
    if (data.id === "vatonage:get_bucket") {
        let block = data.sourceBlock
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







    if (data.id === "vatonage:wireless_interact") {
        let block = data.sourceBlock
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


    class Vec3 {
        constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }
    if (data.id === 'vatonage:conveyor_item') {
        let item = data.sourceEntity
        let block = item?.dimension?.getBlock(item?.location)
        if (data.message == 'down') block = item.dimension.getBlock(new Vec3(item.location.x, item.location.y - 1, item.location.z))
        if (item && block) {
            let states = block.permutation.getAllStates()
            if (states["vatonage:state"] == "default" || block.getItemStack().typeId != 'vatonage:conveyor') {
                if (states["minecraft:cardinal_direction"] == 'north') {
                    item.teleport({ x: block.location.x + 0.5, y: block.location.y + 0.2, z: item.location.z - 0.2 })
                }
                if (states["minecraft:cardinal_direction"] == 'south') {
                    item.teleport({ x: block.location.x + 0.5, y: block.location.y + 0.2, z: item.location.z + 0.2 })
                }
                if (states["minecraft:cardinal_direction"] == 'west') {
                    item.teleport({ x: item.location.x - 0.2, y: block.location.y + 0.2, z: block.location.z + 0.5 })
                }
                if (states["minecraft:cardinal_direction"] == 'east') {
                    item.teleport({ x: item.location.x + 0.2, y: block.location.y + 0.2, z: block.location.z + 0.5 })
                }
            }

            if (states["vatonage:state"] == "diagonal_up") {
                if (states["minecraft:cardinal_direction"] == 'north') {
                    item.teleport(new Vec3(block.north().center().x, block.north().center().y + 1, block.north().center().z));
                }
                if (states["minecraft:cardinal_direction"] == 'south') {
                    item.teleport(new Vec3(block.south().center().x, block.south().center().y + 1, block.south().center().z));
                }
                if (states["minecraft:cardinal_direction"] == 'west') {
                    item.teleport(new Vec3(block.west().center().x, block.west().center().y + 1, block.west().center().z));
                }
                if (states["minecraft:cardinal_direction"] == 'east') {
                    item.teleport(new Vec3(block.east().center().x, block.east().center().y + 1, block.east().center().z));
                }
            }

            if (states["vatonage:state"] == "diagonal_down") {
                if (states["minecraft:cardinal_direction"] == 'north') {
                    item.teleport(new Vec3(block.south().below().center().x, block.south().below().center().y, block.south().below().center().z));
                }
                if (states["minecraft:cardinal_direction"] == 'south') {
                    item.teleport(new Vec3(block.north().below().center().x, block.north().below().center().y, block.north().below().center().z));
                }
                if (states["minecraft:cardinal_direction"] == 'west') {
                    item.teleport(new Vec3(block.east().below().center().x, block.east().below().center().y, block.east().below().center().z));
                }
                if (states["minecraft:cardinal_direction"] == 'east') {
                    item.teleport(new Vec3(block.west().below().center().x, block.west().below().center().y, block.west().below().center().z));
                }
            }


        }
    }
    if (data.id === "vatonage:crusher") {
        let entity = data.sourceEntity
        let block = entity.dimension.getBlock(entity.location)
        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount

        const crusherRecipe = [
            { input: "minecraft:stone", output: "minecraft:cobblestone" },
            { input: "minecraft:cobblestone", output: "minecraft:gravel" },
            { input: "minecraft:gravel", output: "minecraft:sand" }
        ]

        let item = entity
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
                if (item) {


                    for (const recipe of crusherRecipe) {
                        if (item.getComponent("item")?.itemStack?.typeId == recipe?.input && !item.hasTag('ja')) {
                            block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 5`)
                            let spawned = block.dimension.spawnItem(new mc.ItemStack(recipe.output), item.location)
                            spawned.addTag('ja')
                            if (item.getComponent("item")?.itemStack.amount == 1) item.remove()
                            if (item.getComponent("item")?.itemStack.amount > 1) {
                                block.dimension.spawnItem(new mc.ItemStack(item.getComponent("item")?.itemStack.typeId, item.getComponent("item")?.itemStack.amount - 1), item.location)
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
                setPermutation(block, "vatonage:on", 1, 'vatonage:crusher')
            } else setPermutation(block, "vatonage:on", 0, 'vatonage:crusher')
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }
    if (data.id === "vatonage:heavy_press") {
        let entity = data.sourceEntity
        let block = entity.dimension.getBlock(entity.location)
        let states = block.permutation.getAllStates()
        const scoreVerify = block.dimension.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" rf matches 0.. run gamerule sendcommandfeedback false`).successCount

        const crusherRecipe = [
            { input: "minecraft:coal", output: "minecraft:emerald" },
            { input: "minecraft:emerald", output: "minecraft:diamond" }
        ]

        let item = entity
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
                if (item) {
                    for (const recipe of crusherRecipe) {
                        if (item?.getComponent("item")?.itemStack?.typeId == recipe.input && !item.hasTag(`${block.location.x},${block.location.y},${block.location.z}`)) {
                            block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 50`)
                            let itemSpawned = block.dimension.spawnItem(new mc.ItemStack(recipe.output), item.location)
                            itemSpawned.addTag(`${block.location.x},${block.location.y},${block.location.z}`)
                            if (item.getComponent("item")?.itemStack.amount == 1) item.remove()
                            if (item.getComponent("item")?.itemStack.amount > 1) {
                                block.dimension.spawnItem(new mc.ItemStack(item.getComponent("item")?.itemStack.typeId, item.getComponent("item")?.itemStack.amount - 1), item.location)
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
                setPermutation(block, "vatonage:on", 1, 'vatonage:heavy_press')
            } else setPermutation(block, "vatonage:on", 0, 'vatonage:heavy_press')
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }
    if (data.id === "vatonage:powered_furnace") {
        let entity = data.sourceEntity
        let block = entity.dimension.getBlock(entity.location)
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

        let item = entity
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
        let itemse = block.dimension.getEntities({
            type: "minecraft:item",
            location: { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 },
            maxDistance: 0.3
        })
        for (const item of itemse) {
            if (scoreVerify > 0) {
                const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
                if (rfScore >= 20) {
                    if (item) {
                        for (const recipe of furnaceRecipe) {
                            if (item.getComponent("item")?.itemStack.typeId == recipe.input) {
                                block.dimension.runCommand(`scoreboard players remove "${block.location.x},${block.location.y},${block.location.z}" rf 20`)
                                generate(block, "carbon", 10, "gas", "tube", true, "above")
                                block.dimension.spawnItem(new mc.ItemStack(recipe.output), item.location)
                                if (item.getComponent("item")?.itemStack.amount == 1) item.remove()
                                if (item.getComponent("item")?.itemStack.amount > 1) {
                                    block.dimension.spawnItem(new mc.ItemStack(item.getComponent("item")?.itemStack.typeId, item.getComponent("item")?.itemStack.amount - 1), item.location)
                                    item.remove()
                                }
                            }
                        }
                    }
                }
            }
        }
        if (scoreVerify > 0) {
            const rfScore = mc.world.scoreboard.getObjective("rf").getScore(`${block.location.x},${block.location.y},${block.location.z}`)
            if (rfScore >= 20) {
                setPermutation(block, "vatonage:on", 1, 'vatonage:powered_furnace')
                block.dimension.spawnParticle('vatonage:powered_furnace', { x: block.center().x, y: block.location.y + 0.8, z: block.center().z })
            } else setPermutation(block, "vatonage:on", 0, 'vatonage:powered_furnace')
        } else {
            block.dimension.runCommand(`scoreboard players add "${block.location.x},${block.location.y},${block.location.z}" rf 0`)
        }
    }

    if (data.id === 'vatonage:grb') {
        let block = data.sourceBlock
        var numeroAleatorio = Math.floor(Math.random() * 41)
        block.dimension.spawnItem(new mc.ItemStack(allBlocksId[numeroAleatorio]), block.center())
    }

})



mc.world.afterEvents.itemUse.subscribe((data) => {
    if (data.itemStack.typeId === "vatonage:wrench" && data.source.getBlockFromViewDirection({ maxDistance: 5 })?.block?.getItemStack()?.typeId == 'vatonage:power_wireless') {
        let block = data.source.getBlockFromViewDirection({ maxDistance: 5 })?.block
        let player = data.source
        let states = block.permutation.getAllStates()
        if (player.isSneaking) {
            if (states["vatonage:state"] == "transmitter") {
                setPermutation(block, "vatonage:state", "receiver", 'vatonage:power_wireless')
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
                    setPermutation(block, "vatonage:state", "transmitter", 'vatonage:power_wireless')
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
})