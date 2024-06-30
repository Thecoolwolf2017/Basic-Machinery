import { setPermutation } from './system'
import * as mc from "@minecraft/server"
mc.system.afterEvents.scriptEventReceive.subscribe((data) => {

if (data.id === "vatonage:conveyor") {
    let block = data.sourceBlock;
    let states = block.permutation.getAllStates();
    
    if (states["vatonage:lado"] == 2) {
        setPermutation(block, "vatonage:north", (block.north().hasTag("conveyor_connect") && (block.north().permutation.getState("vatonage:lado") != 3)) || (block.below().north().hasTag("conveyor_connect") && block.below().north().permutation.getState("vatonage:state") != "default" && block.below().north().permutation.getState("vatonage:lado") == 3) || (block.north().hasTag("conveyor_connect") && block.north().permutation.getState("vatonage:state") != "default" && block.north().permutation.getState("vatonage:lado") == 3));
        setPermutation(block, "vatonage:south", (block.south()?.hasTag("conveyor_connect") && (block.south().permutation.getState("vatonage:lado") == 2)) || (block.below().south().hasTag("conveyor_connect") && block.below().south().permutation.getState("vatonage:state") != "default" && block.below().south().permutation.getState("vatonage:lado") == 2) || (block.south().hasTag("conveyor_connect") && block.south().permutation.getState("vatonage:state") != "default" && block.south().permutation.getState("vatonage:lado") == 3));
        setPermutation(block, "vatonage:east", block.east().hasTag("conveyor_connect") && block.east().permutation.getState("vatonage:lado") == 4);
        setPermutation(block, "vatonage:west", block.west().hasTag("conveyor_connect") && block.west().permutation.getState("vatonage:lado") == 5);
    }

    if (states["vatonage:lado"] == 3) {
        setPermutation(block, "vatonage:south", (block.north().hasTag("conveyor_connect") && block.north().permutation.getState("vatonage:lado") == 3) || (block.below().north().hasTag("conveyor_connect") && block.below().north().permutation.getState("vatonage:state") != "default" && block.below().north().permutation.getState("vatonage:lado") == 3) || (block.north().hasTag("conveyor_connect") && block.north().permutation.getState("vatonage:state") != "default" && block.north().permutation.getState("vatonage:lado") == 2));
        setPermutation(block, "vatonage:north", (block.south().hasTag("conveyor_connect") && block.south().permutation.getState("vatonage:lado") != 2) || (block.below().south().hasTag("conveyor_connect") && block.below().south().permutation.getState("vatonage:state") != "default" && block.below().south().permutation.getState("vatonage:lado") == 2) || (block.south().hasTag("conveyor_connect") && block.south().permutation.getState("vatonage:state") != "default" && block.south().permutation.getState("vatonage:lado") == 2));
        setPermutation(block, "vatonage:west", block.east().hasTag("conveyor_connect") && block.east().permutation.getState("vatonage:lado") == 4);
        setPermutation(block, "vatonage:east", block.west().hasTag("conveyor_connect") && block.west().permutation.getState("vatonage:lado") == 5);
    }

    if (states["vatonage:lado"] == 4) {
        setPermutation(block, "vatonage:east", block.north().hasTag("conveyor_connect") && block.north().permutation.getState("vatonage:lado") == 3);
        setPermutation(block, "vatonage:west", block.south().hasTag("conveyor_connect") && block.south().permutation.getState("vatonage:lado") == 2);
        setPermutation(block, "vatonage:south", (block.east().hasTag("conveyor_connect") && block.east().permutation.getState("vatonage:lado") == 4) || (block.below().east().hasTag("conveyor_connect") && block.below().east().permutation.getState("vatonage:state") != "default" && block.below().east().permutation.getState("vatonage:lado") == 4) || (block.east().hasTag("conveyor_connect") && block.east().permutation.getState("vatonage:state") != "default" && block.east().permutation.getState("vatonage:lado") == 5));
        setPermutation(block, "vatonage:north", (block.west().hasTag("conveyor_connect") && block.west().permutation.getState("vatonage:lado") != 5) || (block.below().west().hasTag("conveyor_connect") && block.below().west().permutation.getState("vatonage:state") != "default" && block.below().west().permutation.getState("vatonage:lado") == 5) || (block.west().hasTag("conveyor_connect") && block.west().permutation.getState("vatonage:state") != "default" && block.west().permutation.getState("vatonage:lado") == 5));
    }

    if (states["vatonage:lado"] == 5) {
        setPermutation(block, "vatonage:west", block.north().hasTag("conveyor_connect") && block.north().permutation.getState("vatonage:lado") == 3);
        setPermutation(block, "vatonage:east", block.south().hasTag("conveyor_connect") && block.south().permutation.getState("vatonage:lado") == 2);
        setPermutation(block, "vatonage:north", (block.east()?.hasTag("conveyor_connect") && block.east().permutation.getState("vatonage:lado") != 4) || (block.below().east().hasTag("conveyor_connect") && block.below().east().permutation.getState("vatonage:state") != "default" && block.below().east().permutation.getState("vatonage:lado") == 4) || (block.east().hasTag("conveyor_connect") && block.east().permutation.getState("vatonage:state") != "default" && block.east().permutation.getState("vatonage:lado") == 4));
        setPermutation(block, "vatonage:south", (block.west().hasTag("conveyor_connect") && block.west().permutation.getState("vatonage:lado") == 5) || (block.below().west().hasTag("conveyor_connect") && block.below().west().permutation.getState("vatonage:state") != "default" && block.below().west().permutation.getState("vatonage:lado") == 5) || (block.west().hasTag("conveyor_connect") && block.west().permutation.getState("vatonage:state") != "default" && block.west().permutation.getState("vatonage:lado") == 4));
    }

    if (states["vatonage:lado"] == 2 || states["vatonage:lado"] == 3) {
        if (block.south().hasTag("conveyor_connect") && block.above().north().hasTag("conveyor_connect") && block.above().north().permutation.getState("vatonage:lado") == 2 && block.south().permutation.getState("vatonage:lado") == 2) {
            setPermutation(block, "vatonage:state", "diagonal_up");
            setPermutation(block, "vatonage:lado", 2);
        } else if (block.south().hasTag("conveyor_connect") && block.above().north().hasTag("conveyor_connect") && block.above().north().permutation.getState("vatonage:lado") == 3 && block.south().permutation.getState("vatonage:lado") == 3) {
            setPermutation(block, "vatonage:state", "diagonal_down");
            setPermutation(block, "vatonage:lado", 2);
        } else if (block.north().hasTag("conveyor_connect") && block.above().south().hasTag("conveyor_connect") && block.above().south().permutation.getState("vatonage:lado") == 3 && block.north().permutation.getState("vatonage:lado") == 3) {
            setPermutation(block, "vatonage:state", "diagonal_up");
            setPermutation(block, "vatonage:lado", 3);
        } else if (block.north().hasTag("conveyor_connect") && block.above().south().hasTag("conveyor_connect") && block.above().south().permutation.getState("vatonage:lado") == 2 && block.north().permutation.getState("vatonage:lado") == 2) {
            setPermutation(block, "vatonage:state", "diagonal_down");
            setPermutation(block, "vatonage:lado", 3);
        } else {
            setPermutation(block, "vatonage:state", "default");
        }
    }

    if (states["vatonage:lado"] == 4 || states["vatonage:lado"] == 5) {
        if (block.east().hasTag("conveyor_connect") && block.above().west().hasTag("conveyor_connect") && block.above().west().permutation.getState("vatonage:lado") == 4 && block.east().permutation.getState("vatonage:lado") == 4) {
            setPermutation(block, "vatonage:state", "diagonal_up");
            setPermutation(block, "vatonage:lado", 4);
        } else if (block.east().hasTag("conveyor_connect") && block.above().west().hasTag("conveyor_connect") && block.above().west().permutation.getState("vatonage:lado") == 5 && block.east().permutation.getState("vatonage:lado") == 5) {
            setPermutation(block, "vatonage:state", "diagonal_down");
            setPermutation(block, "vatonage:lado", 4);
        } else if (block.west().hasTag("conveyor_connect") && block.above().east().hasTag("conveyor_connect") && block.above().east().permutation.getState("vatonage:lado") == 5 && block.west().permutation.getState("vatonage:lado") == 5) {
            setPermutation(block, "vatonage:state", "diagonal_up");
            setPermutation(block, "vatonage:lado", 5);
        } else if (block.west().hasTag("conveyor_connect") && block.above().east().hasTag("conveyor_connect") && block.above().east().permutation.getState("vatonage:lado") == 4 && block.west().permutation.getState("vatonage:lado") == 4) {
            setPermutation(block, "vatonage:state", "diagonal_down");
            setPermutation(block, "vatonage:lado", 5);
        } else {
            setPermutation(block, "vatonage:state", "default");
        }
    }
    let items = block.dimension.getEntitiesAtBlockLocation(block.location)
    if (items[0]){
        for (const item of items){
            if (item.typeId == "minecraft:item"){
                if (states["vatonage:state"] == "default"){
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
                if (states["vatonage:state"] == "diagonal_up"){
                    if (states["vatonage:lado"] == 2){
                        item.teleport({x: block.north().location.x+0.5, y:block.above().location.y+0.2, z:block.north().location.z+1})
                    }
                    if (states["vatonage:lado"] == 3){
                        item.teleport({x: block.south().location.x+0.5, y:block.above().location.y+0.2, z:block.south().location.z+1})
                    }
                    if (states["vatonage:lado"] == 4){
                        item.teleport({x: block.west().location.x+0.5, y:block.above().location.y+0.2, z:block.west().location.z+1})
                    }
                    if (states["vatonage:lado"] == 5){
                        item.teleport({x: block.east().location.x+0.5, y:block.above().location.y+0.2, z:block.east().location.z+1})
                    }
                }
                if (states["vatonage:state"] == "diagonal_down"){
                    if (states["vatonage:lado"] == 2){
                        item.teleport({x: block.south().location.x+0.5, y:block.location.y+0.2, z:block.south().location.z+1})
                    }
                    if (states["vatonage:lado"] == 3){
                        item.teleport({x: block.north().location.x+0.5, y:block.location.y+0.2, z:block.north().location.z+1})
                    }
                    if (states["vatonage:lado"] == 4){
                        item.teleport({x: block.east().location.x+0.5, y:block.location.y+0.2, z:block.east().location.z+1})
                    }
                    if (states["vatonage:lado"] == 5){
                        item.teleport({x: block.west().location.x+0.5, y:block.location.y+0.2, z:block.west().location.z+1})
                    }
                }
            }
        }
    }
}


})