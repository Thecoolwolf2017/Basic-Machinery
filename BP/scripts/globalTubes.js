import { isBlockId } from "./stableTriggers.js"
import * as mc from "@minecraft/server"

function setPermutation(block, stateAdd, stateValue, blockId) {
    if (block) {
        const result = block.permutation.getAllStates();
        result[stateAdd] = stateValue;
        block.setPermutation(mc.BlockPermutation.resolve(blockId, result));
    }
}
export const allBlocksId = [
    'vatonage:advanced_solar_panel',
    'vatonage:ammonia_mixer',
    'vatonage:battery',
    'vatonage:block_breaker',
    'vatonage:block_placer',
    'vatonage:cable',
    'vatonage:chargepad',
    'vatonage:coal_generator',
    'vatonage:cobblestone_generator',
    'vatonage:conveyor',
    'vatonage:crusher',
    'vatonage:exp_generator',
    'vatonage:exp_transmitter',
    'vatonage:explosion_generator',
    'vatonage:freezer',
    'vatonage:gas_absorber',
    'vatonage:gas_condenser',
    'vatonage:gas_separator',
    'vatonage:gastank',
    'vatonage:geothermal_generator',
    'vatonage:graphene_factory',
    'vatonage:heavy_press',
    'vatonage:hydrogen_generator',
    'vatonage:impact_reactor',
    'vatonage:item_magnet',
    'vatonage:lava_generator',
    'vatonage:liquid_pump',
    'vatonage:milk_generator',
    'vatonage:modification_station',
    'vatonage:monster_masher',
    'vatonage:nether_quantum_miner',
    'vatonage:nitrogen_extractor',
    'vatonage:oil_generator',
    'vatonage:oil_rig',
    'vatonage:pipe',
    'vatonage:plastic_refinery',
    'vatonage:power_wireless',
    'vatonage:powered_fisher',
    'vatonage:powered_furnace',
    'vatonage:quantum_miner',
    'vatonage:silicon_factory',
    'vatonage:solar_panel',
    'vatonage:tank',
    'vatonage:trash_can',
    'vatonage:tube',
    'vatonage:water_filter',
    'vatonage:water_generator'
]

const machineConsume = [
    { id: "vatonage:cobblestone_generator", maxStorage: 5 },
    { id: "vatonage:trash_can", maxStorage: 1 },
    { id: "vatonage:item_magnet", maxStorage: 5 },
    { id: "vatonage:liquid_pump", maxStorage: 5 },
    { id: "vatonage:oil_rig", maxStorage: 60 },
    { id: "vatonage:block_breaker", maxStorage: 5 },
    { id: "vatonage:block_placer", maxStorage: 5 },
    { id: "vatonage:crusher", maxStorage: 10 },
    { id: "vatonage:monster_masher", maxStorage: 10 },
    { id: "vatonage:powered_fisher", maxStorage: 20 },
    { id: "vatonage:powered_furnace", maxStorage: 40 },
    { id: "vatonage:plastic_refinery", maxStorage: 70 },
    { id: "vatonage:gas_absorber", maxStorage: 10 },
    { id: "vatonage:gas_separator", maxStorage: 10 },
    { id: "vatonage:silicon_factory", maxStorage: 20 },
    { id: "vatonage:graphene_factory", maxStorage: 40 },
    { id: "vatonage:quantum_miner", maxStorage: 100 },
    { id: "vatonage:exp_generator", maxStorage: 100 },
    { id: "vatonage:power_wireless", maxStorage: 50 },
    { id: "vatonage:milk_generator", maxStorage: 10 },
    { id: "vatonage:nitrogen_extractor", maxStorage: 20 },
    { id: "vatonage:ammonia_mixer", maxStorage: 20 },
    { id: "vatonage:nether_quantum_miner", maxStorage: 100 },
    { id: "vatonage:chargepad", maxStorage: 100 },
    { id: "vatonage:heavy_press", maxStorage: 99 },
    { id: "vatonage:battery", maxStorage: 1000 }
]
const liquidConsume = [
    { id: "vatonage:tank", maxStorage: 1000 },
    { id: "vatonage:silicon_factory", maxStorage: 20 },
    { id: "vatonage:oil_generator", maxStorage: 20 },
    { id: "vatonage:lava_generator", maxStorage: 20 },
    { id: "vatonage:water_generator", maxStorage: 20 },
    { id: "vatonage:plastic_refinery", maxStorage: 70 },
    { id: "vatonage:gas_separator", maxStorage: 20 },
    { id: "vatonage:explosion_generator", maxStorage: 20 },
    { id: "vatonage:freezer", maxStorage: 20 },
    { id: "vatonage:water_filter", maxStorage: 20 },
    { id: "vatonage:impact_reactor", maxStorage: 50 },
    { id: "vatonage:geothermal_generator", maxStorage: 20 },
    { id: "vatonage:nitrogen_extractor", maxStorage: 20 }
]
const gasConsume = [
    { id: "vatonage:silicon_factory", maxStorage: 20 },
    { id: "vatonage:gas_condenser", maxStorage: 20 },
    { id: "vatonage:graphene_factory", maxStorage: 10 },
    { id: "vatonage:explosion_generator", maxStorage: 20 },
    { id: "vatonage:hydrogen_generator", maxStorage: 20 },
    { id: "vatonage:nitrogen_extractor", maxStorage: 20 },
    { id: "vatonage:impact_reactor", maxStorage: 50 },
    { id: "vatonage:ammonia_mixer", maxStorage: 20 },
    { id: "vatonage:gastank", maxStorage: 1000 }
]
export function generateRemaining(block, contentType, type, transporterType, filter, face1, face2, face3, face4, face5, face6) {
    const scoreVerify = block.dimension?.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" ${contentType} matches 0.. run gamerule sendcommandfeedback false`)?.successCount ?? 0;
    if (scoreVerify > 0) {
        const Score = mc.world.scoreboard?.getObjective(`${contentType}`)?.getScore(`${block.location.x},${block.location.y},${block.location.z}`) ?? 0;
        if (Score > 0) {
            generate(block, contentType, Score, type, transporterType, filter, face1, face2, face3, face4, face5, face6);
        }
    }
}

export function generate(block, contentType, amount, type, transporterType, filter, face1, face2, face3, face4, face5, face6) {
    block?.dimension?.runCommand(`scoreboard objectives add ${contentType} dummy ${contentType}`);
    let allFaces = [
        block?.north(),
        block?.south(),
        block?.west(),
        block?.east(),
        block?.above(),
        block?.below()
    ];
    block?.dimension?.runCommand(`scoreboard players set "${block.location.x},${block.location.y},${block.location.z}" ${contentType} ${amount}`);

    if (filter == true) {
        allFaces = [];
        if (face1 == "north" || face2 == "north" || face3 == "north" || face4 == "north" || face5 == "north" || face6 == "north") allFaces.push(block?.north());
        if (face1 == "south" || face2 == "south" || face3 == "south" || face4 == "south" || face5 == "south" || face6 == "south") allFaces.push(block?.south());
        if (face1 == "east" || face2 == "east" || face3 == "east" || face4 == "east" || face5 == "east" || face6 == "east") allFaces.push(block?.east());
        if (face1 == "west" || face2 == "west" || face3 == "west" || face4 == "west" || face5 == "west" || face6 == "west") allFaces.push(block?.west());
        if (face1 == "above" || face2 == "above" || face3 == "above" || face4 == "above" || face5 == "above" || face6 == "above") allFaces.push(block?.above());
        if (face1 == "below" || face2 == "below" || face3 == "below" || face4 == "below" || face5 == "below" || face6 == "below") allFaces.push(block?.below());
    }

    let index1 = 0;
    allFaces.forEach(face => {
        index1++;
        if (face?.hasTag(`${type}_${transporterType}`)) {
            let states = face?.permutation?.getAllStates();
            let connectedTubes = [];
            let lastBlock;
            connectedTubes.push({ origin: block, actual: block });
            detectTubeAround(block, block, filter, face1, face2, face3, face4, face5, face6);
            function detectTubeAround(origin, actual, filter, face1, face2, face3, face4, face5, face6) {
                //console.warn(connectedTubes.length)
                if (connectedTubes.length < 90) {
                    let allFaces = [
                        actual?.north(),
                        actual?.south(),
                        actual?.west(),
                        actual?.east(),
                        actual?.above(),
                        actual?.below()
                    ];
                    if (filter == true) {
                        allFaces = [];
                        if (face1 == "north" || face2 == "north" || face3 == "north" || face4 == "north" || face5 == "north" || face6 == "north") allFaces.push(block?.north());
                        if (face1 == "south" || face2 == "south" || face3 == "south" || face4 == "south" || face5 == "south" || face6 == "south") allFaces.push(block?.south());
                        if (face1 == "east" || face2 == "east" || face3 == "east" || face4 == "east" || face5 == "east" || face6 == "east") allFaces.push(block?.east());
                        if (face1 == "west" || face2 == "west" || face3 == "west" || face4 == "west" || face5 == "west" || face6 == "west") allFaces.push(block?.west());
                        if (face1 == "above" || face2 == "above" || face3 == "above" || face4 == "above" || face5 == "above" || face6 == "above") allFaces.push(block?.above());
                        if (face1 == "below" || face2 == "below" || face3 == "below" || face4 == "below" || face5 == "below" || face6 == "below") allFaces.push(block?.below());
                    }
                    lastBlock = face;
                    let index = 0;
                    for (const face of allFaces) {
                        index++;
                        if (face?.hasTag(`${type}_${transporterType}`) && ((isBlockId(face, 'vatonage:cable') && isBlockId(lastBlock, 'vatonage:cable')) || (isBlockId(face, 'vatonage:tube') && isBlockId(lastBlock, 'vatonage:tube')) || (isBlockId(face, 'vatonage:pipe') && isBlockId(lastBlock, 'vatonage:pipe'))) && !connectedTubes.some(tube => tube.actual?.location.x === face?.location.x && tube.actual?.location.y === face?.location.y && tube.actual?.location.z === face?.location.z)) {
                            connectedTubes.push({ origin: origin, actual: face });
                            let faceId;
                            if (isBlockId(face, 'vatonage:cable')) faceId = 'vatonage:cable';
                            if (isBlockId(face, 'vatonage:pipe')) faceId = 'vatonage:pipe';
                            if (isBlockId(face, 'vatonage:tube')) faceId = 'vatonage:tube';
                            setPermutation(face, `vatonage:${type}_type`, contentType, faceId);
                            if (type == "rf") {
                                let random = Math.floor(Math.random() * 100);
                                if (random > 95) block?.dimension?.spawnParticle("vatonage:eletric_particle", face?.above(1.5));
                            }
                            detectTubeAround(origin, face);
                        } else if (face?.hasTag(`${contentType}_receiver`)) {
                            let faceIdIndexMinus;
                            for (const id of allBlocksId) {
                                if (isBlockId(allFaces[index - 1], id)) faceIdIndexMinus = id;
                            }
                            if (
                                (
                                    (isBlockId(actual?.north(), faceIdIndexMinus) && (actual?.north()?.permutation?.getState("vatonage:south") == `${type}Input` || actual?.north()?.permutation?.getState("vatonage:south") == `allInput`)) ||
                                    (isBlockId(actual?.south(), faceIdIndexMinus) && (actual?.south()?.permutation?.getState("vatonage:north") == `${type}Input` || actual?.south()?.permutation?.getState("vatonage:north") == `allInput`)) ||
                                    (isBlockId(actual?.west(), faceIdIndexMinus) && (actual?.west()?.permutation?.getState("vatonage:east") == `${type}Input` || actual?.west()?.permutation?.getState("vatonage:east") == `allInput`)) ||
                                    (isBlockId(actual?.east(), faceIdIndexMinus) && (actual?.east()?.permutation?.getState("vatonage:west") == `${type}Input` || actual?.east()?.permutation?.getState("vatonage:west") == `allInput`)) ||
                                    (isBlockId(actual?.above(), faceIdIndexMinus) && (actual?.above()?.permutation?.getState("vatonage:below") == `${type}Input` || actual?.above()?.permutation?.getState("vatonage:below") == `allInput`)) ||
                                    (isBlockId(actual?.below(), faceIdIndexMinus) && (actual?.below()?.permutation?.getState("vatonage:above") == `${type}Input` || actual?.below()?.permutation?.getState("vatonage:above") == `allInput`)))
                                ||
                                (
                                    face?.permutation?.getState("vatonage:north") == undefined &&
                                    face?.permutation?.getState("vatonage:south") == undefined &&
                                    face?.permutation?.getState("vatonage:above") == undefined &&
                                    face?.permutation?.getState("vatonage:below") == undefined &&
                                    face?.permutation?.getState("vatonage:east") == undefined &&
                                    face?.permutation?.getState("vatonage:west") == undefined
                                )
                            ) {
                                let typeConsume;
                                if (type == "rf") typeConsume = machineConsume;
                                if (type == "gas") typeConsume = gasConsume;
                                if (type == "liquid") typeConsume = liquidConsume;

                                for (let x = 0; x < typeConsume.length; x++) {
                                    if (isBlockId(face, typeConsume[x].id)) {
                                        const scoreVerify = block?.dimension?.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" ${contentType} matches 0.. run gamerule sendcommandfeedback false`)?.successCount ?? 0;
                                        if (scoreVerify > 0) {
                                            block?.dimension?.runCommand(`scoreboard players add "${face?.location.x},${face?.location.y},${face?.location.z}" ${contentType} 0`);
                                            const scoreValue = mc.world.scoreboard?.getObjective(contentType)?.getScore(`${block?.location.x},${block?.location.y},${block?.location.z}`) ?? 0;
                                            const machineScoreValue = mc.world.scoreboard?.getObjective(contentType)?.getScore(`${face?.location.x},${face?.location.y},${face?.location.z}`) ?? 0;

                                            if (scoreValue >= typeConsume[x].maxStorage - machineScoreValue) {
                                                block?.dimension?.runCommand(`scoreboard players add "${face?.location.x},${face?.location.y},${face?.location.z}" ${contentType} ${typeConsume[x].maxStorage - machineScoreValue}`);
                                                block?.dimension?.runCommand(`scoreboard players remove "${block?.location.x},${block?.location.y},${block?.location.z}" ${contentType} ${typeConsume[x].maxStorage - machineScoreValue}`);
                                                if (face?.permutation?.getState(`vatonage:${type}_type`) == contentType || face?.permutation?.getState(`vatonage:${type}_type`) == 'none') setPermutation(face, `vatonage:${type}_type`, contentType, typeConsume[x].id);
                                            } else if (scoreValue < typeConsume[x].maxStorage - machineScoreValue && 1 <= typeConsume[x].maxStorage - machineScoreValue) {
                                                block?.dimension?.runCommand(`scoreboard players add "${face?.location.x},${face?.location.y},${face?.location.z}" ${contentType} ${scoreValue}`);
                                                block?.dimension?.runCommand(`scoreboard players remove "${block?.location.x},${block?.location.y},${block?.location.z}" ${contentType} ${scoreValue}`);
                                                if (face?.permutation?.getState(`vatonage:${type}_type`) == contentType || face?.permutation?.getState(`vatonage:${type}_type`) == 'none') setPermutation(face, `vatonage:${type}_type`, contentType, typeConsume[x].id);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (!isBlockId(face, 'minecraft:air')) {
            if (face?.hasTag(`${contentType}_receiver`)) {
                let typeConsume;
                if (type == "rf") typeConsume = machineConsume;
                if (type == "gas") typeConsume = gasConsume;
                if (type == "liquid") typeConsume = liquidConsume;
                let faceIdIndexMinus;
                for (const id of allBlocksId) {
                    if (isBlockId(allFaces[index1 - 1], id)) faceIdIndexMinus = id;
                }
                if (
                    (
                        (isBlockId(block?.north(), faceIdIndexMinus) && (block?.north()?.permutation?.getState("vatonage:south") == `${type}Input` || block?.north()?.permutation?.getState("vatonage:south") == `allInput`)) ||
                        (isBlockId(block?.south(), faceIdIndexMinus) && (block?.south()?.permutation?.getState("vatonage:north") == `${type}Input` || block?.south()?.permutation?.getState("vatonage:north") == `allInput`)) ||
                        (isBlockId(block?.west(), faceIdIndexMinus) && (block?.west()?.permutation?.getState("vatonage:east") == `${type}Input` || block?.west()?.permutation?.getState("vatonage:east") == `allInput`)) ||
                        (isBlockId(block?.east(), faceIdIndexMinus) && (block?.east()?.permutation?.getState("vatonage:west") == `${type}Input` || block?.east()?.permutation?.getState("vatonage:west") == `allInput`)) ||
                        (isBlockId(block?.above(), faceIdIndexMinus) && (block?.above()?.permutation?.getState("vatonage:below") == `${type}Input` || block?.above()?.permutation?.getState("vatonage:below") == `allInput`)) ||
                        (isBlockId(block?.below(), faceIdIndexMinus) && (block?.below()?.permutation?.getState("vatonage:above") == `${type}Input` || block?.below()?.permutation?.getState("vatonage:above") == `allInput`))
                    ) ||
                    (
                        face?.permutation?.getState("vatonage:north") == undefined &&
                        face?.permutation?.getState("vatonage:south") == undefined &&
                        face?.permutation?.getState("vatonage:above") == undefined &&
                        face?.permutation?.getState("vatonage:below") == undefined &&
                        face?.permutation?.getState("vatonage:east") == undefined &&
                        face?.permutation?.getState("vatonage:west") == undefined
                    )
                ) {
                    let typeConsume;
                    if (type == "rf") typeConsume = machineConsume;
                    if (type == "gas") typeConsume = gasConsume;
                    if (type == "liquid") typeConsume = liquidConsume;

                    for (let x = 0; x < typeConsume.length; x++) {
                        if (isBlockId(face, typeConsume[x].id)) {
                            const scoreVerify = block?.dimension?.runCommand(`execute if score "${block.location.x},${block.location.y},${block.location.z}" ${contentType} matches 0.. run gamerule sendcommandfeedback false`)?.successCount ?? 0;
                            if (scoreVerify > 0) {
                                block?.dimension?.runCommand(`scoreboard players add "${face?.location.x},${face?.location.y},${face?.location.z}" ${contentType} 0`);
                                const scoreValue = mc.world.scoreboard?.getObjective(contentType)?.getScore(`${block?.location.x},${block?.location.y},${block?.location.z}`) ?? 0;
                                const machineScoreValue = mc.world.scoreboard?.getObjective(contentType)?.getScore(`${face?.location.x},${face?.location.y},${face?.location.z}`) ?? 0;

                                if (scoreValue >= typeConsume[x].maxStorage - machineScoreValue) {
                                    block?.dimension?.runCommand(`scoreboard players add "${face?.location.x},${face?.location.y},${face?.location.z}" ${contentType} ${typeConsume[x].maxStorage - machineScoreValue}`);
                                    block?.dimension?.runCommand(`scoreboard players remove "${block?.location.x},${block?.location.y},${block?.location.z}" ${contentType} ${typeConsume[x].maxStorage - machineScoreValue}`);
                                    if (face?.permutation?.getState(`vatonage:${type}_type`) == contentType || face?.permutation?.getState(`vatonage:${type}_type`) == 'none') setPermutation(face, `vatonage:${type}_type`, contentType, typeConsume[x].id);
                                } else if (scoreValue < typeConsume[x].maxStorage - machineScoreValue && 1 <= typeConsume[x].maxStorage - machineScoreValue) {
                                    block?.dimension?.runCommand(`scoreboard players add "${face?.location.x},${face?.location.y},${face?.location.z}" ${contentType} ${scoreValue}`);
                                    block?.dimension?.runCommand(`scoreboard players remove "${block?.location.x},${block?.location.y},${block?.location.z}" ${contentType} ${scoreValue}`);
                                    if (face?.permutation?.getState(`vatonage:${type}_type`) == contentType || face?.permutation?.getState(`vatonage:${type}_type`) == 'none') setPermutation(face, `vatonage:${type}_type`, contentType, typeConsume[x].id);
                                }
                            }
                        }
                    }
                }
            }
        }
    });
}
