execute if score world resetAll matches 1.. run scoreboard players remove world resetAll 1
gamerule sendcommandfeedback false
scoreboard players add world resetAll 0
execute as @a at @a run scriptevent vatonage:armor
execute as @e[type=vatonage:modification_station] at @s unless block ~~~ vatonage:modification_station run scriptevent rc:despawn_entity
replaceitem entity @a[hasitem={item=vatonage:cable,location=slot.weapon.mainhand}] slot.weapon.mainhand 0 vatonage:cable_item
replaceitem entity @a[hasitem={item=vatonage:tube,location=slot.weapon.mainhand}] slot.weapon.mainhand 0 vatonage:tube_item
replaceitem entity @a[hasitem={item=vatonage:pipe,location=slot.weapon.mainhand}] slot.weapon.mainhand 0 vatonage:pipe_item
execute as @e[type=item] at @s if block ~~~ vatonage:conveyor run scriptevent vatonage:conveyor_item
execute as @e[type=item] at @s if block ~~-1~ vatonage:conveyor run scriptevent vatonage:conveyor_item down
execute as @e[type=item] at @s if block ~~~ vatonage:crusher run scriptevent vatonage:crusher
execute as @e[type=item] at @s if block ~~~ vatonage:powered_furnace run scriptevent vatonage:powered_furnace
execute as @e[type=item] at @s if block ~~~ vatonage:heavy_press run scriptevent vatonage:heavy_press