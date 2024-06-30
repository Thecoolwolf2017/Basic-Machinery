import * as mc from "@minecraft/server"
import { machinesEvent } from "./machines.js"
import { allBlocksId } from "./globalTubes.js"
import {allEvents} from "./allEvents.js"

mc.world.afterEvents.playerPlaceBlock.subscribe((data)=>{
    let player = data.player
    let block = data.block
    let dimension = data.dimension


    for (const thisBlock of allBlocksId){
      if (isBlockId(block, thisBlock)){
        mc.world.setDynamicProperty(`${block.location.x},${block.location.y},${block.location.z}`,block.dimension.id)
      }
    }
})

mc.system.runInterval(()=>{
    let worldProperties = mc.world.getDynamicPropertyIds()
    for (const worldPropertyId of worldProperties){
        let worldProperty = mc.world.getDynamicProperty(worldPropertyId)
        if (worldProperty){
            let propertyLoc = worldPropertyId.split(",")
            let x = parseInt(propertyLoc[0])
            let y = parseInt(propertyLoc[1])
            let z = parseInt(propertyLoc[2])
            if (worldProperty == 'minecraft:overworld' || worldProperty == 'minecraft:nether' || worldProperty == 'minecraft:theend'){
            let block = mc.world.getDimension(worldProperty).getBlock({x: x, y: y, z: z})
            if ((
                block?.getItemStack()?.typeId != 'vatonage:cable' &&
                block?.getItemStack()?.typeId != 'vatonage:tube' &&
                block?.getItemStack()?.typeId != 'vatonage:pipe' &&
                block?.getItemStack()?.typeId != 'vatonage:conveyor' &&
                block?.getItemStack()?.typeId != 'vatonage:powered_furnace' &&
                block?.getItemStack()?.typeId != 'vatonage:crusher' &&
                block?.getItemStack()?.typeId != 'vatonage:heavy_press'
            )) {
                allEvents(block?.getItemStack()?.typeId, block, block?.getItemStack()?.typeId)
                //break
            }
        }
        }
    }
},20)
mc.system.runInterval(()=>{
    let worldProperties = mc.world.getDynamicPropertyIds()
    for (const worldPropertyId of worldProperties){
        let worldProperty = mc.world.getDynamicProperty(worldPropertyId)
        if (worldProperty){
            let propertyLoc = worldPropertyId.split(",")
            let x = parseInt(propertyLoc[0])
            let y = parseInt(propertyLoc[1])
            let z = parseInt(propertyLoc[2])
            if (worldProperty == 'minecraft:overworld' || worldProperty == 'minecraft:nether' || worldProperty == 'minecraft:theend'){
            let block = mc.world.getDimension(worldProperty).getBlock({x: x, y: y, z: z})
            if (isBlockId(block, 'vatonage:cable')) allEvents('vatonage:cable', block, 'vatonage:cable')
            if (isBlockId(block, 'vatonage:tube')) allEvents('vatonage:tube', block, 'vatonage:tube')
            if (isBlockId(block, 'vatonage:pipe')) allEvents('vatonage:pipe', block, 'vatonage:pipe')
            if (isBlockId(block, 'vatonage:conveyor')) allEvents('vatonage:conveyor', block, 'vatonage:conveyor')
        }
        }
    }
},100)

export function isBlockId(block, id){
    let cm = block?.dimension?.runCommand(`testforblock ${block?.location.x} ${block?.location.y} ${block?.location.z} ${id}`).successCount
    if (cm > 0) return true; else return false
}