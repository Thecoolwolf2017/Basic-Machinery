var t,e,r,i=Object.create,n=Object.defineProperty,o=Object.getOwnPropertyDescriptor,a=Object.getOwnPropertyNames,s=Object.getPrototypeOf,c=Object.prototype.hasOwnProperty,l=(t,e)=>function(){return e||(0,t[a(t)[0]])((e={exports:{}}).exports,e),e.exports},u=l({"../../node_modules/@minecraft/math/lib/general/clamp.js"(t){Object.defineProperty(t,"__esModule",{value:!0}),t.clampNumber=void 0,t.clampNumber=function(t,e,r){return Math.min(Math.max(t,e),r)}}}),d=l({"../../node_modules/@minecraft/math/lib/vector3/coreHelpers.js"(t){Object.defineProperty(t,"__esModule",{value:!0}),t.VECTOR3_SOUTH=t.VECTOR3_NORTH=t.VECTOR3_EAST=t.VECTOR3_WEST=t.VECTOR3_ZERO=t.VECTOR3_ONE=t.VECTOR3_BACK=t.VECTOR3_FORWARD=t.VECTOR3_RIGHT=t.VECTOR3_LEFT=t.VECTOR3_DOWN=t.VECTOR3_UP=t.Vector2Utils=t.Vector3Utils=void 0;var e=u();t.Vector3Utils=class t{static equals(t,e){return t.x===e.x&&t.y===e.y&&t.z===e.z}static add(t,e){return{x:t.x+e.x,y:t.y+e.y,z:t.z+e.z}}static subtract(t,e){return{x:t.x-e.x,y:t.y-e.y,z:t.z-e.z}}static scale(t,e){return{x:t.x*e,y:t.y*e,z:t.z*e}}static dot(t,e){return t.x*e.x+t.y*e.y+t.z*e.z}static cross(t,e){return{x:t.y*e.z-t.z*e.y,y:t.z*e.x-t.x*e.z,z:t.x*e.y-t.y*e.x}}static magnitude(t){return Math.sqrt(t.x**2+t.y**2+t.z**2)}static distance(e,r){return t.magnitude(t.subtract(e,r))}static normalize(e){const r=t.magnitude(e);return{x:e.x/r,y:e.y/r,z:e.z/r}}static floor(t){return{x:Math.floor(t.x),y:Math.floor(t.y),z:Math.floor(t.z)}}static toString(t,e){const r=e?.decimals??2;return[t.x.toFixed(r),t.y.toFixed(r),t.z.toFixed(r)].join(e?.delimiter??", ")}static clamp(t,r){return{x:(0,e.clampNumber)(t.x,r?.min?.x??Number.MIN_SAFE_INTEGER,r?.max?.x??Number.MAX_SAFE_INTEGER),y:(0,e.clampNumber)(t.y,r?.min?.y??Number.MIN_SAFE_INTEGER,r?.max?.y??Number.MAX_SAFE_INTEGER),z:(0,e.clampNumber)(t.z,r?.min?.z??Number.MIN_SAFE_INTEGER,r?.max?.z??Number.MAX_SAFE_INTEGER)}}static lerp(t,e,r){return{x:t.x+(e.x-t.x)*r,y:t.y+(e.y-t.y)*r,z:t.z+(e.z-t.z)*r}}static slerp(e,r,i){const n=Math.acos(t.dot(e,r)),o=Math.sin(n),a=Math.sin((1-i)*n)/o,s=Math.sin(i*n)/o;return t.add(t.scale(e,a),t.scale(r,s))}};t.Vector2Utils=class{static toString(t,e){const r=e?.decimals??2;return[t.x.toFixed(r),t.y.toFixed(r)].join(e?.delimiter??", ")}},t.VECTOR3_UP={x:0,y:1,z:0},t.VECTOR3_DOWN={x:0,y:-1,z:0},t.VECTOR3_LEFT={x:-1,y:0,z:0},t.VECTOR3_RIGHT={x:1,y:0,z:0},t.VECTOR3_FORWARD={x:0,y:0,z:1},t.VECTOR3_BACK={x:0,y:0,z:-1},t.VECTOR3_ONE={x:1,y:1,z:1},t.VECTOR3_ZERO={x:0,y:0,z:0},t.VECTOR3_WEST={x:-1,y:0,z:0},t.VECTOR3_EAST={x:1,y:0,z:0},t.VECTOR3_NORTH={x:0,y:0,z:1},t.VECTOR3_SOUTH={x:0,y:0,z:-1}}}),y=l({"../../node_modules/@minecraft/math/lib/vector3/vectorWrapper.js"(t){Object.defineProperty(t,"__esModule",{value:!0}),t.Vector2Builder=t.Vector3Builder=void 0;var e=d();t.Vector3Builder=class{constructor(t,e,r){"object"==typeof t?(this.x=t.x,this.y=t.y,this.z=t.z):(this.x=t,this.y=e??0,this.z=r??0)}assign(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}equals(t){return e.Vector3Utils.equals(this,t)}add(t){return this.assign(e.Vector3Utils.add(this,t))}subtract(t){return this.assign(e.Vector3Utils.subtract(this,t))}scale(t){return this.assign(e.Vector3Utils.scale(this,t))}dot(t){return e.Vector3Utils.dot(this,t)}cross(t){return this.assign(e.Vector3Utils.cross(this,t))}magnitude(){return e.Vector3Utils.magnitude(this)}distance(t){return e.Vector3Utils.distance(this,t)}normalize(){return this.assign(e.Vector3Utils.normalize(this))}floor(){return this.assign(e.Vector3Utils.floor(this))}toString(t){return e.Vector3Utils.toString(this,t)}clamp(t){return this.assign(e.Vector3Utils.clamp(this,t))}lerp(t,r){return this.assign(e.Vector3Utils.lerp(this,t,r))}slerp(t,r){return this.assign(e.Vector3Utils.slerp(this,t,r))}};t.Vector2Builder=class{constructor(t,e){"object"==typeof t?(this.x=t.x,this.y=t.y):(this.x=t,this.y=e??0)}toString(t){return e.Vector2Utils.toString(this,t)}}}}),_=l({"../../node_modules/@minecraft/math/lib/vector3/index.js"(t){var e=t&&t.__createBinding||(Object.create?function(t,e,r,i){void 0===i&&(i=r);var n=Object.getOwnPropertyDescriptor(e,r);n&&!("get"in n?!e.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,i,n)}:function(t,e,r,i){void 0===i&&(i=r),t[i]=e[r]}),r=t&&t.__exportStar||function(t,r){for(var i in t)"default"===i||Object.prototype.hasOwnProperty.call(r,i)||e(r,t,i)};Object.defineProperty(t,"__esModule",{value:!0}),r(d(),t),r(y(),t)}}),m=l({"../../node_modules/@minecraft/math/lib/general/index.js"(t){var e=t&&t.__createBinding||(Object.create?function(t,e,r,i){void 0===i&&(i=r);var n=Object.getOwnPropertyDescriptor(e,r);n&&!("get"in n?!e.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,i,n)}:function(t,e,r,i){void 0===i&&(i=r),t[i]=e[r]}),r=t&&t.__exportStar||function(t,r){for(var i in t)"default"===i||Object.prototype.hasOwnProperty.call(r,i)||e(r,t,i)};Object.defineProperty(t,"__esModule",{value:!0}),r(u(),t)}}),p=l({"../../node_modules/@minecraft/math/lib/index.js"(t){var e=t&&t.__createBinding||(Object.create?function(t,e,r,i){void 0===i&&(i=r);var n=Object.getOwnPropertyDescriptor(e,r);n&&!("get"in n?!e.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,i,n)}:function(t,e,r,i){void 0===i&&(i=r),t[i]=e[r]}),r=t&&t.__exportStar||function(t,r){for(var i in t)"default"===i||Object.prototype.hasOwnProperty.call(r,i)||e(r,t,i)};Object.defineProperty(t,"__esModule",{value:!0}),r(_(),t),r(m(),t)}}),b=(t=p(),e=1,r=null!=t?i(s(t)):{},((t,e,r,i)=>{if(e&&"object"==typeof e||"function"==typeof e)for(let s of a(e))c.call(t,s)||s===r||n(t,s,{get:()=>e[s],enumerable:!(i=o(e,s))||i.enumerable});return t})(!e&&t&&t.__esModule?r:n(r,"default",{value:t,enumerable:!0}),t));import{EquipmentSlot as f,ItemStack as g,Player as O,system as x,world as h}from"@minecraft/server";var E="vatonage_basic:not_first_join";h.afterEvents.playerSpawn.subscribe((t=>{if(!t.initialSpawn||t.player.getDynamicProperty(E))return;t.player.setDynamicProperty(E,!0);const e=new g("vatonage_basic:tutorial_book0");t.player.dimension.spawnItem(e,t.player.location)}));var z=new Map;function v(t,e){if(e>=17||e<0)return;t.playSound("item.book.page_turn");const r=new g(`vatonage_basic:tutorial_book${e}`);t.getComponent("equippable").setEquipment(f.Mainhand,r)}h.afterEvents.itemUse.subscribe((t=>{if(!t.itemStack.hasTag("vatonage_basic:tutorial_book"))return;const e=Number(t.itemStack.typeId.slice(28));v(t.source,e+1)})),h.afterEvents.entityHitEntity.subscribe((t=>{if("vatonage_basic:tutorial_book_punch_dummy"!==t.hitEntity.typeId||!(t.damagingEntity instanceof O)||z.get(t.damagingEntity.id)!==t.hitEntity)return;const e=t.damagingEntity.getComponent("equippable").getEquipment(f.Mainhand);if(!e?.hasTag("vatonage_basic:tutorial_book"))return;const r=Number(e.typeId.slice(28));v(t.damagingEntity,r-1)})),x.runInterval((()=>{for(const t of h.getAllPlayers()){let e=z.get(t.id);const r=t.getComponent("equippable").getEquipment(f.Mainhand);if(!r?.hasTag("vatonage_basic:tutorial_book"))return void(e&&(e.remove(),z.delete(t.id)));const i=b.Vector3Utils.add(t.location,b.VECTOR3_UP);e?e.teleport(i):(e=t.dimension.spawnEntity("vatonage_basic:tutorial_book_punch_dummy",i),z.set(t.id,e))}}));