var equippedID={};
equippedID.Bomb=1;
equippedID.Bow=2;
equippedID.Boomerang=3;

var numEquippable=2;


function bomb(croom,isSuper)
{
	if(!isSuper) {isSuper=false;}
	this.isSuper=isSuper;
	this.x=0;
	this.y=0;
	this.exists=false;
	this.timePlaced=0;
	this.fuse=4;
	this.room=croom;
	this.armed=false;
	this.sprites=new Array();
	this.sprites.push(Sprite("bomb1"));
	this.sprites.push(Sprite("bomb2"));
	this.sprites.push(Sprite("superbomb"));
	this.sprites.push(Sprite("superbomb1"));
	this.update=function()
	{
		var millip=new Date().getTime();
		if((millip-this.timePlaced>this.fuse*1000) && (this.armed))
		{
			this.explode();
		}
	}
	this.explode=function()
	{
		playSound("explosion");
		this.exists=false;
		if(this.isSuper)
		{
			for (var n=this.x-2;n<this.x+3;n++)
			{
				for (var m=this.y-2;m<this.y+3;m++)
				{
					//particles, sprites, trigger switches, destroy walls and cracked floors
					if((n<this.x+2) && (m<this.y+2))
					{
						var boop=new explosionEffect();
						boop.setup(n,m,this.room);
						explosions.push(boop);
					}
					for(var i=0;i<this.room.exits.length;i++)
					{
						var otherX=this.room.exits[i].x
						var otherY=this.room.exits[i].y
						if(this.room.exits[i].orientation==0)
						{
							otherX=this.room.exits[i].x+1
						}else if(this.room.exits[i].orientation==1)
						{
							otherY=this.room.exits[i].y+1
						}else if(this.room.exits[i].orientation==2)
						{
							otherX=this.room.exits[i].x+1
						}else if(this.room.exits[i].orientation==3)
						{
							otherY=this.room.exits[i].y+1
						}
						var blow=false;
						if((this.room.exits[i].x==n) && (this.room.exits[i].y==m))
						{
							blow=true;
						}else if((otherX==n) && (otherY==m)) // other
						{
							blow=true;
						}
						if((blow) && (this.room.exits[i].type==3))
						{
							playSound("secret");
							this.room.exits[i].open();
						}
					}
					for(var i=0;i<this.room.objects.length;i++)
					{
						var blow=false;
						if((this.room.objects[i].x==n) && (this.room.objects[i].y==m))
						{
							blow=true;
						}
						if((blow) && (this.room.objects[i].bombable))
						{
							this.room.objects[i].activate();
						}
						
					}
					for(var i=0;i<entities.length;i++)
					{
						var blow=false;
						if((entities[i].x==n) && (entities[i].y==m))
						{
							blow=true;
						}
						if((blow) && (entities[i].room.z==this.room.z)&&(entities[i].room.x==this.room.x)&&(entities[i].room.y==this.room.y))
						{
							entities[i].hurt(20);
						}
					}
					var blow=false;
					if((this.room.tiles[n][m].data==DungeonTileType.Unstable) || (this.room.tiles[n][m].data==DungeonTileType.ReallyUnstable))
					{
						blow=true;
						this.room.tiles[n][m].data=DungeonTileType.Hole;
					}
					if(blow)
					{
						playSound("secret");
					}
				}
				
			}
			return;
		}
		
		
		//particles, sprites, trigger switches, destroy walls and cracked floors
		var boop=new explosionEffect();
		boop.setup(this.x-1,this.y-1,this.room);
		explosions.push(boop);
		boop=new explosionEffect();
		boop.setup(this.x-2,this.y-1,this.room);
		explosions.push(boop);
		boop=new explosionEffect();
		boop.setup(this.x,this.y-1,this.room);
		explosions.push(boop);
		boop=new explosionEffect();
		boop.setup(this.x-1,this.y-2,this.room);
		explosions.push(boop);
		boop=new explosionEffect();
		boop.setup(this.x-1,this.y,this.room);
		explosions.push(boop);
		for(var i=0;i<this.room.exits.length;i++)
		{
			var otherX=this.room.exits[i].x
			var otherY=this.room.exits[i].y
			if(this.room.exits[i].orientation==0)
			{
				otherX=this.room.exits[i].x+1
			}else if(this.room.exits[i].orientation==1)
			{
				otherY=this.room.exits[i].y+1
			}else if(this.room.exits[i].orientation==2)
			{
				otherX=this.room.exits[i].x+1
			}else if(this.room.exits[i].orientation==3)
			{
				otherY=this.room.exits[i].y+1
			}
			var blow=false;
			if((this.room.exits[i].x==this.x) && (this.room.exits[i].y==this.y))
			{
				blow=true;
			}else if((this.room.exits[i].x+1==this.x) && (this.room.exits[i].y==this.y))
			{
				blow=true;
			}else if((this.room.exits[i].x-1==this.x) && (this.room.exits[i].y==this.y))
			{
				blow=true;
			}else if((this.room.exits[i].x==this.x) && (this.room.exits[i].y-1==this.y))
			{
				blow=true;
			}else if((this.room.exits[i].x==this.x) && (this.room.exits[i].y+1==this.y))
			{
				blow=true;
			}else if((otherX==this.x) && (otherY==this.y)) // other
			{
				blow=true;
			}else if((otherX+1==this.x) && (otherY==this.y))
			{
				blow=true;
			}else if((otherX-1==this.x) && (otherY==this.y))
			{
				blow=true;
			}else if((otherX==this.x) && (otherY-1==this.y))
			{
				blow=true;
			}else if((otherX==this.x) && (otherY+1==this.y))
			{
				blow=true;
			}
			if((blow) && (this.room.exits[i].type==3))
			{
				playSound("secret");
				this.room.exits[i].open();
			}
		}
		for(var i=0;i<this.room.objects.length;i++)
		{
			var blow=false;
			if((this.room.objects[i].x==this.x) && (this.room.objects[i].y==this.y))
			{
				blow=true;
			}else if((this.room.objects[i].x==this.x+1) && (this.room.objects[i].y==this.y))
			{
				blow=true;
			}else if((this.room.objects[i].x==this.x-1) && (this.room.objects[i].y==this.y))
			{
				blow=true;
			}else if((this.room.objects[i].x==this.x) && (this.room.objects[i].y==this.y-1))
			{
				blow=true;
			}else if((this.room.objects[i].x==this.x) && (this.room.objects[i].y==this.y+1))
			{
				blow=true;
			}
			if((blow) && (this.room.objects[i].bombable))
			{
				this.room.objects[i].activate();
			}
			
		}
		for(var i=0;i<entities.length;i++)
		{
			var blow=false;
			if((entities[i].x==this.x) && (entities[i].y==this.y))
			{
				blow=true;
			}else if((entities[i].x==this.x+1) && (entities[i].y==this.y))
			{
				blow=true;
			}else if((entities[i].x==this.x-1) && (entities[i].y==this.y))
			{
				blow=true;
			}else if((entities[i].x==this.x) && (entities[i].y==this.y-1))
			{
				blow=true;
			}else if((entities[i].x==this.x) && (entities[i].y==this.y+1))
			{
				blow=true;
			}
			if((blow) && (entities[i].room.z==this.room.z)&&(entities[i].room.x==this.room.x)&&(entities[i].room.y==this.room.y))
			{
				entities[i].hurt(20);
			}
		}
		var blow=false;
		if((this.room.tiles[this.x][this.y].data==DungeonTileType.Unstable) || (this.room.tiles[this.x][this.y].data==DungeonTileType.ReallyUnstable))
		{
			blow=true;
			this.room.tiles[this.x][this.y].data=DungeonTileType.Hole;
		}
		if((this.room.tiles[this.x+1][this.y].data==DungeonTileType.Unstable) || (this.room.tiles[this.x+1][this.y].data==DungeonTileType.ReallyUnstable))
		{
			blow=true;
			this.room.tiles[this.x+1][this.y].data=DungeonTileType.Hole;
		}
		if((this.room.tiles[this.x-1][this.y].data==DungeonTileType.Unstable) || (this.room.tiles[this.x-1][this.y].data==DungeonTileType.ReallyUnstable))
		{
			blow=true;
			this.room.tiles[this.x-1][this.y].data=DungeonTileType.Hole;
		}
		if((this.room.tiles[this.x][this.y+1].data==DungeonTileType.Unstable) || (this.room.tiles[this.x][this.y+1].data==DungeonTileType.ReallyUnstable))
		{
			blow=true;
			this.room.tiles[this.x][this.y+1].data=DungeonTileType.Hole;
		}
		if((this.room.tiles[this.x][this.y-1].data==DungeonTileType.Unstable) || (this.room.tiles[this.x][this.y-1].data==DungeonTileType.ReallyUnstable))
		{
			blow=true;
			this.room.tiles[this.x][this.y-1].data=DungeonTileType.Hole;
		}			
		if(blow)
		{
			playSound("secret");
		}
	}
	this.draw=function(can,xoffh,yoffh)
	{
		if((this.room.z==curDungeon.roomZ) &&(this.room.x==curDungeon.roomX) &&(this.room.y==curDungeon.roomY))
		{
			var millip= new Date().getTime();
			var dex=0;
			if(this.isSuper)
			{
				dex=2;
			}
			if((millip-this.timePlaced>this.fuse*800) && (this.armed))
			{
				if(millip%2==0)
				{
					this.sprites[dex+1].draw(can,this.x*32+xoffh,this.y*32+yoffh);
				}else
				{
					this.sprites[dex+0].draw(can,this.x*32+xoffh,this.y*32+yoffh);
				}
			}else
			{
				this.sprites[dex+0].draw(can,this.x*32+xoffh,this.y*32+yoffh);
			}
		}
	}
}

var actionID={};
actionID.Boomarang=0;
actionID.Bow=1;
actionID.Hookshot=2;
actionID.Sword=3; //for holding sword out/ pegasus dash

function entity(croom)
{
	this.dir=0;
	this.hp=100;
	this.maxHp=100;
	this.keys=0;
	this.AI=0;
	this.x=4;
	this.y=3;
	this.team=0;
	this.enteredX=this.x;
	this.enteredY=this.y;
	this.partyPos=0;
	this.partyMember=false;
	this.mapSprite=Sprite("profhead");
	this.name="Waffles";
	this.lastX=4;
	this.maxBombs=10;
	this.maxArrows=20;
	this.swimming=false;
	this.diving=false;
	this.busyrang=false;
	this.lastY=3;
	this.width=32;
	this.height=48;
	this.holdBreath=2;
	this.acting=false;
	this.actfor=0;
	this.action=0;
	this.shieldSprites=shieldSprites;
	this.actingSprites=new Array();
	this.actingSprites.push(new Array());
	this.actingSprites.push(new Array());
	this.actingSprites.push(new Array());
	this.actingSprites.push(new Array());
	this.actingSprites[0].push(Sprite("linkupbooma"));
	this.actingSprites[1].push(Sprite("linkrightbooma"));
	this.actingSprites[2].push(Sprite("linkdownbooma"));
	this.actingSprites[3].push(Sprite("linkleftbooma"));
	this.actingSprites[0].push(Sprite("linkbow0"));
	this.actingSprites[1].push(Sprite("linkbow1"));
	this.actingSprites[2].push(Sprite("linkbow2"));
	this.actingSprites[3].push(Sprite("linkbow3"));
	//sword?
	this.swinging=false; 
	this.poking=false; 
	this.swingrate=2;
	this.swingtrack=0;
	this.swingcount=0;
	this.pokeSprites=new Array()
	this.pokeSprites.push(Sprite("swordswing04"));
	this.pokeSprites.push(Sprite("poke1"));
	this.pokeSprites.push(Sprite("poke2"));
	this.pokeSprites.push(Sprite("poke3"));
	this.swingSprites=new Array();
	this.swingSprites.push(new Array());
	this.swingSprites.push(new Array());
	this.swingSprites.push(new Array());
	this.swingSprites.push(new Array());
	for(var i=0;i<4;i++)
	{
		for(var j=0;j<8;j++) // change j max to eight!
		{
			var daPath= "swordswing"+i+j;
			this.swingSprites[i].push(Sprite(daPath));
		}
	}

	
	this.tookBreath=0;
	this.canSwim=false;
	this.autoJoin=false;
	this.alignment=0; //friends 1==neutral, 2== enemy 
	this.featherCount=0;
	this.falling=false;
	this.fallingY=0;
	this.room=null;
	this.tracker=false;
	this.tracking=null;
	this.shells=0;
	this.talkBox=new textbox();
	this.getOffChest=0; //how many elements of talkBank should be said without prompting him
	this.textBank=new Array();
	this.textSaid=new Array();
	this.textConditions=new Array();
	this.textTrack=0;
	this.chatterBank=new Array(); //random stuff said
	this.equippedTrack=0;
	if(croom)
	{
		this.room=croom;
	}
	this.status="not set";
	
	this.sprites=new Array();
	this.sprites.push(Sprite("prof0"));
	this.sprites.push(Sprite("prof1"));
	this.sprites.push(Sprite("prof2"));
	this.sprites.push(Sprite("prof3"));
	this.swimSprites=new Array();
	this.swimSprites.push(Sprite("profswim0"));
	this.swimSprites.push(Sprite("profswim1"));
	this.swimSprites.push(Sprite("profswim2"));
	this.swimSprites.push(Sprite("profswim3"));
	this.isPlayer=false;
	this.money=0;
	this.bombs=0;
	this.arrows=0;
	this.wallet=250;
	this.exists=true; 
	this.has=new Array();
	this.destObj=null;
	this.destX=0;
	this.destY=0;
	this.path=null; 
	this.walkTrack=0;
	this.walkSpeed=8;
	this.going=false;
	this.pathTrack=0;
	this.healAmount=0;
	this.healRate=6;
	this.healCount=0;
	this.alive=true;
	this.gotHurt=0;
	this.deadSprites=new Array();
	this.deadSprites.push(Sprite("profdeath0"));
	this.deadSprites.push(Sprite("profdeath1"));
	this.deadSprites.push(Sprite("profdeath2"));
	this.deathAniTrack=0;
	this.aniCount=0;
	this.aniTrack=0;
	this.aniRate=19;
	this.activebombs=new Array();
	this.inventory=new Array();
	this.inventoryAmounts=new Array();
	var meeee=new Object;
	meeee.type=ObjectID.PotStand;
	meeee.sprite=nullSprite;
	this.inventory.push(meeee);
	this.inventoryAmounts.push(1);
	this.has=new Array();
	this.projectiles=new Array();
	this.pushText=function()
	{
	 //todo - the forgotten dwarf. 
	}
	this.kill=function()
	{
		if(this.lastWords)
		{
			this.say(this.lastWords);
		}
		bConsoleBox.log(this.name+" has died.");
		//if(this.isPlayer)
		playSound("playerdying");
		//this.exists=false;
		this.alive=false;
	}
	
	this.dive=function()
	{
		if((this.room.tiles[this.x][this.y].data<20) || (this.room.tiles[this.x][this.y].data>24))
		{
			return false
			bConsoleBox.log("Can't dive here.");
			playSound("error");
		}
		if(!this.diving)
		{
			this.diving=true;
			this.firstBreath=new Date().getTime();
			return true;
		}else
		{
			this.diving=false;
			//todo sound?
		}
		
	}
	
	this.getScore=function()
	{
		var scar=0;
		//rupees collected (current minus start? 
		  //excess arrows and bombs? all items? converted to rupees if you have krugman alive 
		//rooms explored - loop through all rooms and count those that are explored
		//heart containers found- just compare maxhp to 120 / start maxhp
		//special items found =check .has
		//enemies killed? exp gained? 
		//-1000 if you have the poop
		//-500 if you don't, but you touched it. 
		//5000 - 100% bonus - found all chests + special items (has) + rooms
		return scar;
	
	}
	
	this.revive=function(amt)
	{
		playSound("chant");
		if(this.isPlayer)
		{
			if(gameOver)
			{
				$("#dialogBox").remove();
				gameOver=false;
			}
		}
		if(!amt) {amt=this.maxHp;}
		this.alive=true;
		bConsoleBox.log(this.name + " has returned to life!");
		this.deathAniTrack=0;
		this.hp=amt;
		
		
	}
	
	
	this.heal=function(amt)
	{
		if(this.hp>this.maxHp-1) {return;}
		if(amt==0){ amt=this.maxHp;}
		this.healAmount=amt;
		/*playSound("heal");
		this.hp+=amt;
		if(this.hp>this.maxHp)
		{
			this.hp=this.maxHp;
		}*/
	}
	
	this.placeBomb=function()
	{
		if(!this.has[hasID.Bomb]) {return;}
		if(this.bombs<1) {return;}
		this.bombs--;
		var edsbomb=new bomb(this.room,this.has[hasID.SuperBomb]);
		edsbomb.x=this.x;
		edsbomb.y=this.y;
		edsbomb.exists=true;
		edsbomb.armed=true;
		edsbomb.timePlaced=new Date().getTime();
		this.activebombs.push(edsbomb);
	}
	this.getEquipped=function()
	{
		return this.inventory[this.equippedTrack].type;//==ObjectID.Bomb
	}
	
	this.getUsableInventory=function()
	{
		return this.inventory;
	}
	
	this.hasItem=function(id)
	{
		for(var i=0;i<this.inventory.length;i++)
		{
			if(this.inventory[i].type==id)
			{
				return true;
			}
		}
		return false;
	}
	
	this.getItem=function(id)
	{
		for(var i=0;i<this.inventory.length;i++)
		{
			if(this.inventory[i].type==id)
			{
				return this.inventory[i];
			}
		}
		return null;
	}
	
	this.giveItem=function(obj,amt)
	{
		if(!amt){amt=1;}
		if(!this.hasItem(obj.type))
		{
			this.inventory.push(obj);
			
			if(obj.type==ObjectID.Bomb)
			{
				if(amt>this.maxBombs)
				{
					amt=this.maxBombs;
					this.bombs=this.maxBombs;
				}
				
			}else if(obj.type==ObjectID.Bow)
			{
				if(amt>this.maxArrows)
				{
					amt=this.maxArrows;
					this.arrows=this.maxArrows
				}
				
			}
			this.inventoryAmounts.push(amt); 
		}else
		{
			for(var i=0;i<this.inventory.length;i++)
			{
				if(this.inventory[i].type==obj.type)
				{
					this.inventoryAmounts[i]+=amt;
					if(obj.type==ObjectID.Bomb)
					{
						if(this.inventoryAmounts[i]>this.maxBombs)
						{
							this.inventoryAmounts[i]=this.maxBombs;
							this.bombs=this.maxBombs;
						}
						
					}else if(obj.type==ObjectID.Bow)
					{
						if(this.inventoryAmounts[i]>this.maxArrows)
						{
							this.inventoryAmounts[i]=this.maxArrows;
							this.arrows=this.maxArrows
						}
						
					}
				}
			}
		}
		if(obj.type==ObjectID.Bomb)
		{
			if(this.inventoryAmounts[i]>this.maxBombs)
			{
				this.inventoryAmounts[i]=this.maxBombs;
			}
			
		}
		if(this.isPlayer)
		{

		
		}
	}
	
	this.removeItem=function(obj,amt)
	{
		
		for(var i=0;i<this.inventory.length;i++)
		{
			if(this.inventory[i].type==obj)
			{
				if(amt)
				{
					this.inventoryAmounts[i]-=amt;
					if(this.inventoryAmounts[i]<1)
					{
						this.inventory.splice(i,1);
						this.inventoryAmounts.splice(i,1);
						i--;
						miles.equippedTrack=0;
					}
				}else
				{
					this.inventory.splice(i,1);
					this.inventoryAmounts.splice(i,1);
					i--;
					miles.equippedTrack=0;
				}
			}
		}

	}
	
	this.dig=function() //fuck you, it's dig now. It shoulda been dig to begin with! the verb of shovel is dig!
	{
		
		var spotX=this.x;
		var spotY=this.y;
		
		if((spotX<0) || (spotY<0) || (spotX>ROOM_WIDTH-2)|| (spotY>ROOM_HEIGHT-2)|| (this.room.tiles[spotX][spotY].dug) || (!this.room.digable(this.x,this.y)))//TODO: check for digability.
		{
			playSound("error");
			return false;
		}else
		{
			playSound("shovel")
			this.room.tiles[spotX][spotY].dug=true;
			if(false)//specifically buried loot somehow
			{
				
			}else if(Math.random()*10>4)
			{
				var bmoke=3;
				if(Math.random()*10>8)
				{
					makeObject(spotX,spotY,this.room,ObjectID.Shell);
					return;
				}
				if((this.hp<miles.maxHp) && (Math.random()*10<3))
				{
					makeObject(spotX,spotY,this.room,ObjectID.Heart);
					return;
				}
				if((this.has[hasID.Bow]) && (Math.random()*10<3))
				{
					makeObject(spotX,spotY,this.room,ObjectID.Arrow);
					return;
				}
				if((this.has[hasID.Bomb]) && (Math.random()*10<3))
				{
					makeObject(spotX,spotY,this.room,ObjectID.BombRefill);
					return;
				}
				var pojk=500+Math.floor(Math.random()*2);
				makeObject(spotX,spotY,this.room,pojk);
			}
			return true;
		}
	}
	
	this.cycleEquipped=function(up)
	{
		var mup=this.getUsableInventory();
		if(up)
		{
			this.equippedTrack++;
			if(this.equippedTrack>mup.length-1)
			{
				this.equippedTrack=mup.length-1;
			}
		}else
		{
			this.equippedTrack--;
			if(this.equippedTrack<0)
			{
				this.equippedTrack=0;
			}
		}
		
	}
	this.onArrival=function()
	{
	}
	this.hurt=function(dmg)
	{
		if(!this.alive) {return;}
		if(this.diving) {return;}
		if(this.gotHurt>0) {return;}
		this.hp-=dmg;
		playSound("playerhurt");
		if (this.hp<1) 
		{
			this.kill();
		}else
		{
			this.gotHurt=60;
		}
	}
	
	this.getScreenX=function()
	{
		return this.x*32;
	}
	this.getScreenY=function()
	{
		return this.y*32;
	}
	this.tossBoomarang=function(ang)
	{
		if(!this.busyrang)
		{
			playSound("boomerang");
			this.acting=true;
			this.action=actionID.Boomarang;
			this.actfor=100; 
			this.busyrang=true;
			this.actStart=new Date().getTime();
			var poot=new projectile(this);
			poot.exists=true; 
			poot.angle=ang;
			poot.speed=.5;
			if(this.has[hasID.MagicBoomarang])
			{
				poot.speed=1;
				poot.peakTime=375;
			}
			poot.xv=-Math.cos((Math.PI / 180)*Math.floor(ang));
			poot.yv=-Math.sin((Math.PI / 180)*Math.floor(ang));
			if(this.has[hasID.MagicBoomarang])
			{
				poot.setup(2);
			}else
			{
				poot.setup(1);
			}
			this.projectiles.push(poot);
		}
	}
	
	this.shootArrowAt=function(targ)
	{
		var beta=Math.atan2(this.targ.y-this.y,this.targ.x-this.x)* (180 / Math.PI);
			if (beta < 0.0)
				beta += 360.0;
			else if (beta > 360.0)
				beta -= 360;
		this.shootArrow(beta);
	}
	
	this.shootArrow=function(ang,bmb)
	{
		playSound("shoot");
	
		this.acting=true;
		this.action=actionID.Bow;
		this.actfor=750;
		this.actStart=new Date().getTime();

		var poot=new projectile(this);
		if(bmb) {poot.bombArrow=true;}
		poot.exists=true; 
		poot.angle=ang;
		if(ang==270) //hack
		{
			poot.x+=32;
		}
		if(ang==0)
		{
			poot.y+=28;
		}
		poot.xv=-Math.cos((Math.PI / 180)*Math.floor(ang));
		poot.yv=-Math.sin((Math.PI / 180)*Math.floor(ang));
		poot.setup(0);
		this.projectiles.push(poot);
	}
	this.draw=function(can)
	{
		for(var i=0;i<this.projectiles.length;i++)
		{
			this.projectiles[i].draw(can,xOffset,yOffset);
		}
		if(!this.alive)
		{
			//if((this.deathAniTrack<2) || (this.isPlayer))//hack
			//{
				this.deadSprites[this.deathAniTrack].draw(can,this.x*32+xOffset,this.y*32+yOffset-14-this.fallingY*2)
			//}else
			//{
			//	this.deadSprites[this.deathAniTrack].draw(can,this.x*32+xOffset-16,this.y*32+yOffset+8-this.fallingY*2)
			//}
			return;
		}else if((this.isPlayer) && (this.holding))
		{
			this.sprites[4].draw(can,this.x*32+xOffset,this.y*32+yOffset-14-this.fallingY*2);
			this.holding.draw(can,this.x*32+xOffset,this.y*32+yOffset-14-16-this.fallingY*2);
		}else if((this.isPlayer) && (this.swinging))
		{
			var knuckx=-48;
			var knucky=-48;
			
			var shX=0;
			var shY=0;
			if(this.dir==0)
			{
				shX=8;
				shY=6;
			}else if(this.dir==1)
			{
				shX=0;
				shY=0;
			}else if(this.dir==2)
			{
				shX=0;
				shY=4;
			}else if(this.dir==3)
			{
				shX=8;
				shY=8;
			}
			if((this.dir==0)&&(this.has[hasID.Shield]))
			{
				this.shieldSprites[1].draw(can,this.x*32+xOffset+shX,this.y*32+yOffset-14-this.fallingY*2+shY);
			}else if((this.dir==1) &&(this.has[hasID.Shield]))
			{
				this.shieldSprites[0].draw(can,this.x*32+xOffset+shX,this.y*32+yOffset-14-this.fallingY*2+shY);
			}
			this.swingSprites[this.dir][this.swingtrack].draw(can,this.x*32+xOffset+knuckx,this.y*32+yOffset-14-this.fallingY*2+knucky);
			if((this.dir!=0) && (this.dir!=1) &&(this.has[hasID.Shield]))
			{
				if(this.dir==2)
				{
					this.shieldSprites[3].draw(can,this.x*32+xOffset+shX,this.y*32+yOffset-14-this.fallingY*2+shY);
				}else if(this.dir==3)
				{
					this.shieldSprites[2].draw(can,this.x*32+xOffset+shX,this.y*32+yOffset-14-this.fallingY*2+shY);
				}
			}
		}else if((this.isPlayer) && (this.poking))
		{
			var knuckx=-48;
			var knucky=-48;
			
			var shX=0;
			var shY=0;
			if(this.dir==0)
			{
				shX=8;
				shY=6;
			}else if(this.dir==1)
			{
				shX=0;
				shY=0;
			}else if(this.dir==2)
			{
				shX=0;
				shY=4;
			}else if(this.dir==3)
			{
				shX=8;
				shY=8;
			}
			if((this.dir==0)&&(this.has[hasID.Shield]))
			{
				this.shieldSprites[1].draw(can,this.x*32+xOffset+shX,this.y*32+yOffset-14-this.fallingY*2+shY);
			}else if((this.dir==1) &&(this.has[hasID.Shield]))
			{
				this.shieldSprites[0].draw(can,this.x*32+xOffset+shX,this.y*32+yOffset-14-this.fallingY*2+shY);
			}
			this.pokeSprites[this.dir].draw(can,this.x*32+xOffset+knuckx,this.y*32+yOffset-14-this.fallingY*2+knucky);
			if((this.dir!=0) && (this.dir!=1) &&(this.has[hasID.Shield]))
			{
				if(this.dir==2)
				{
					this.shieldSprites[3].draw(can,this.x*32+xOffset+shX,this.y*32+yOffset-14-this.fallingY*2+shY);
				}else if(this.dir==3)
				{
					this.shieldSprites[2].draw(can,this.x*32+xOffset+shX,this.y*32+yOffset-14-this.fallingY*2+shY);
				}
			}
		}else
		{
			if(this.gotHurt%2==0)
			{
				if(this.diving)
				{
					var jerry=can.globalAlpha;
					can.globalAlpha=0.75;
					divesprite.draw(can,this.x*32+xOffset,this.y*32+yOffset-14-this.fallingY*2);
					can.globalAlpha=jerry; 
				}else if(this.swimming)
				{
					this.swimSprites[this.dir].draw(can,this.x*32+xOffset,this.y*32+yOffset-14-this.fallingY*2);
				}else
				{
					if((this.has[hasID.Shield]) && (this.dir==0))
					{
						this.shieldSprites[0].draw(can,this.x*32+xOffset,this.y*32+yOffset-14-this.fallingY*2);
					}
					
				
					if(this.acting)
					{
							if((this.dir==0) || (this.dir==1))
							{
								this.actingSprites[this.dir][this.action].draw(can,this.x*32+xOffset-12,this.y*32+yOffset-14-this.fallingY*2);
							}else
							{
								this.actingSprites[this.dir][this.action].draw(can,this.x*32+xOffset,this.y*32+yOffset-14-this.fallingY*2);
							}
					}else
					{
						this.sprites[this.dir].draw(can,this.x*32+xOffset,this.y*32+yOffset-14-this.fallingY*2);
					}
					
					if((this.has[hasID.Shield]) && (this.dir>0))
					{
						if(this.dir==3)
						{
							this.shieldSprites[this.dir].draw(can,this.x*32+xOffset-5,this.y*32+yOffset-14-this.fallingY*2);
						}else
						{
							this.shieldSprites[this.dir].draw(can,this.x*32+xOffset,this.y*32+yOffset-14-this.fallingY*2);
						}
					
					}
				}
				
			}
			if((this.fallingY>0) && (this.room.tiles[this.x][this.y].data!=DungeonTileType.Hole))
			{
				if(this.fallingY>100)
				{
					shadowSprite[0].draw(can,this.x*32+xOffset,this.y*32+yOffset);
				}else if(this.fallingY>50)
				{
					shadowSprite[1].draw(can,this.x*32+xOffset,this.y*32+yOffset);
				}else 
				{
					shadowSprite[2].draw(can,this.x*32+xOffset,this.y*32+yOffset);
				}
			}
		}
		for(var i=0;i<this.activebombs.length;i++)
		{
			if(this.activebombs[i].exists)
			{
				this.activebombs[i].draw(can,xOffset,yOffset);
			}
		}
		
		
	}
	this.goHole=function(x,y,obj)
	{
		this.destX=x;
		this.destY=y;
		this.path=this.room.getPath(this.x,this.y,x,y,this,false);
		this.pathTrack=0;
		if(obj)
		{
			this.destObj=obj;
		}
		this.going=true;
	}
	this.go=function(x,y,obj)
	{
		this.destX=x;
		this.destY=y;
		this.path=this.room.getPath(this.x,this.y,x,y,this,true);
		this.pathTrack=0;
		if((obj)) //&& (!obj.underWater))
		{
			this.destObj=obj;
		}
		this.going=true;
	}

	this.say=function(saywhat)
	{
		playSound("textbox");
		/*this.talkBox=new textbox();
		this.talkBox.setup();
		this.talkBox.x=200;
		this.talkBox.y=200;
		this.talkBox.textLim=102;*/
		if(saywhat==null)
		{
			if((this.textTrack<this.textBank.length) && (this.textConditions[this.textTrack]()))
			{
				//this.talkBox.log(this.name+": "+this.textBank[this.textTrack]);
				$("<div id='dialogBox'>").text(this.name+": "+this.textBank[this.textTrack]).appendTo("body");
				if(!this.textSaid[this.textTrack])
				{
					this.textSaid[this.textTrack]=true;
					this.textTrack++;
					
				}

			}else
			{
				var k=Math.floor(Math.random()*this.chatterBank.length);
				//this.talkBox.log(this.name+": "+this.chatterBank[k]);
				$("<div id='dialogBox'>").text(this.name+": "+this.chatterBank[k]).appendTo("body");
			}
		}else
		{
			//this.talkBox.log(this.name+": "+saywhat);
			$("<div id='dialogBox'>").text(this.name+": "+saywhat).appendTo("body");
		}
		//this.talkBox.hasFocus=true;
		//buttons.push(this.talkBox);
		return;
	}
	
	this.update=function()
	{
		for(var i=0;i<this.projectiles.length;i++)
		{
			this.projectiles[i].update();
			if(!this.projectiles[i].exists)
			{
				this.projectiles.splice(i,1);
				i--;
			}
		}
		if(this.diving)
		{
			//check for underwater shit
			var sunt=new Date().getTime();
			if(sunt-this.firstBreath>this.holdBreath*1000)
			{
				this.diving=false; 
			}
			this.swinging=false;
		}
		if(this.swinging)
		{
			this.swingcount++;
			if(this.swingcount>this.swingrate)
			{
//				console.log("swinging");
				this.swingcount=0;
				this.swingtrack++;
				if (this.swingtrack>7)
				{
					this.swingtrack=0;
					this.swinging=false; 
				}
			}
			//return;
		}else if((this.acting) && (this.actfor>0))
		{
			var hupp=new Date().getTime();
			if(hupp-this.actStart>this.actfor)
			{
				this.acting=false;
			}
		}
		if(this.holding)
		{
			this.going=false;
			this.path=null; 
			this.onArrival=function(){};
			this.destObj=null;
		}
		this.swimming=false;
		if(!this.alive)
		{
			if(this.deathAniTrack>1) {return;}
			this.aniCount++;
			if(this.aniCount>this.aniRate)
			{
				this.aniCount=0;
				this.aniTrack++;
				this.deathAniTrack++;
			}
			return;
		}
		if(this.gotHurt>0) //not so quick?
		{
			this.gotHurt--;
		}
		
		if(this.healAmount>4)
		{
			this.healCount++;
			if(this.healCount>this.healRate)
			{
				this.healCount=0;
			
				this.healAmount-=5;
				if(this.healAmount<0)
				{
					this.healAmount=0;
				}
				this.hp+=5;
				playSound("heal");
				if(this.hp>this.maxHp)
				{
					this.hp=this.maxHp;
					this.healAmount=0;
				}
			}
		}
		if(!OPTIONS.UpdateAllRooms)
		{
			if((this.room) && (this.room.name!=curDungeon.curRoom().name))
			{
				return; 
			}
		}
		
		for(var i=0;i<this.activebombs.length;i++)
		{
			this.activebombs[i].update();
			if(!this.activebombs[i].exists)
			{
				this.activebombs.splice(i,1);
				//i--;
			}
			
		}
	
		if(this.falling)
		{
			this.swinging=false;
			this.poking=false;
			this.fallingY-=5;
			if(this.fallingY<1)
			{
				if(this.room.tiles[this.x][this.y].data==DungeonTileType.ReallyUnstable)
				{
					playSound("landing");
					playSound("cavein");
					this.room.tiles[this.x][this.y].data=DungeonTileType.Hole;
				}
				this.falling=false;
				this.fallingY=0;
				if(this.room.tiles[this.x][this.y].data!=DungeonTileType.Hole)
				{
					playSound("landing");
					this.lastX=this.x;
					this.lastY=this.y;
				}
				
			}
			this.path=null;
			this.going=false;
			this.walkTrack=0;
			this.destObj=null;
			this.onArrival=function(){};
			
		}
		if(this.isPlayer)
		{
			//this.room=curDungeon.curRoom();
		}
		for(var i=0;i<this.room.objects.length;i++)
		{
			if(this.fallingY<1)
			{
		
				if(this.room.objects[i].type==ObjectID.Spikes)
				{
					if((this.room.objects[i].on)&&(this.room.objects[i].x==this.x) && (this.room.objects[i].y==this.y))
					{
						this.hurt(10); 
					}
				}else if(this.room.objects[i].type==ObjectID.ToggleSwitch)
				{
					
					if(this.isPlayer)//OPTION?
					{
						if((!this.room.objects[i].on)&&(this.room.objects[i].x==this.x) && (this.room.objects[i].y==this.y))
						{
							this.room.objects[i].playerActivate();
						}
					}
				}else if(this.room.objects[i].type==ObjectID.Pot)
				{
					
					if(this.isPlayer)//OPTION?
					{
						if((this.room.objects[i].curSprite==0)&&(this.room.objects[i].x==this.x) && (this.room.objects[i].y==this.y))
						{
							this.room.objects[i].playerActivate();
						}
					}
				}else if((this.room.objects[i].pickupable) &&(this.room.objects[i].x==this.x) && (this.room.objects[i].y==this.y))
				{
					if(!this.room.objects[i].underWater)
					{
						if((this.AI==0) || (OPTIONS.NPCPickup))
						{
							this.room.objects[i].playerActivate();
						}
					}else if(this.diving)
					{
						if((this.AI==0) || (OPTIONS.NPCPickup))
						{
							this.room.objects[i].playerActivate();
						}
					}
				}
			}
		}
		if(this.fallingY<1)
		{
			if((this.room.tiles[this.x][this.y].data==DungeonTileType.Unstable) && (OPTIONS.UnsafeWalking))
			{
				
				if((this.x!=this.lastX) || (this.y!=this.lastY))
				{
					this.room.tiles[this.x][this.y].data=DungeonTileType.ReallyUnstable;
					playSound("unstable");
					this.lastX=this.x;
					this.lastY=this.y;
				}
			}else if((this.room.tiles[this.x][this.y].data==DungeonTileType.ReallyUnstable)&& (OPTIONS.UnsafeWalking))
			{
				if((this.x!=this.lastX) || (this.y!=this.lastY))
				{
					this.room.tiles[this.x][this.y].data=DungeonTileType.Hole;
					playSound("cavein");
					//this.lastX=this.x;
					//this.lastY=this.y;
				}
			}else if((this.room.tiles[this.x][this.y].data==DungeonTileType.Hole) &&(!this.falling))
			{
				
				if(this.isPlayer)
				{	
					playSound("fall");
				}else
				{
					//playSound("enemyfall");
				}
				//console.log("you fell down a floor!")
				//Do better drawing?
				this.falling=true;
				this.fallingY=150;
				if(this.isPlayer)
				{
					if(this.room.z==0)
					{
						this.fallingY=0;
						bConsoleBox.log("can't fall any lower");
						this.hurt(20);
						this.x=this.enteredX;
						this.y=this.enteredY;
						//damage and find nearest standable point. 
					}else if(!curDungeon.rooms[this.room.z-1][this.room.x][this.room.y].active)
					{
						this.fallingY=0;
						bConsoleBox.log("no room below");
						console.log(this.enteredX,this.enteredY);
						this.hurt(20);
						this.x=this.enteredX;
						this.y=this.enteredY;
					}else
					{
						if(this.isPlayer)
						{
							curDungeon.roomZ--;
							this.room=curDungeon.curRoom();
							this.room.explored=true;
							this.room.hidden=false;
						}else
						{
							this.room=curDungeon.rooms[curDungeon.roomZ-1][this.room.x][this.room.y];
						}
						
					
						this.enteredX=this.x;
						this.enteredY=this.y;
					}
				}else if (this.room.z>0)
				{
					this.room=curDungeon.rooms[this.room.z-1][this.room.x][this.room.y];

				}else
				{
					bConsoleBox.log("npc can't fall any lower");
					this.hurt(20);
					this.x=this.enteredX;
					this.y=this.enteredY;
				}
				//this.room=curDungeon.rooms[curDungeon.roomZ-1][curDungeon.roomX][curDungeon.roomY];
			}else if((this.room.tiles[this.x][this.y].data>19) && (this.room.tiles[this.x][this.y].data<25))
			{
				this.swimming=true;
			}
		}
		
		if((this.AI==1) && (!this.going))
		{
			//this.go(Math.floor(Math.random()*12) need function to find walkable tile.
			
			if((this.room.name==miles.room.name) && (this.room.z==miles.room.z))
			{
				var neddle=null;//.room.closestAdj(miles,this);
				if((this.party) && (this.partyPos>0))
				{
					neddle=this.party.members[this.partyPos-1];
				}else
				{
					neddle=miles;
				}
				if((this.x!=neddle.x) || (this.y!=neddle.y))
				{
					this.go(neddle.x,neddle.y)
					this.path.pop();
					this.status="Target is in the same room!";
				}else
				{
					this.status="Arrived." 
					//if arrived at player, which we'll assume for now.
					if((this.textTrack<this.getOffChest) && ($("#dialogBox").length < 1))//(!this.talkBox.exists))
					{
						//this.textSaid[this.textTrack]=true; penis
						if((!this.partyMember) && (this.autoJoin))
						{
							theParty.add(this);
						}
						this.say();
						//this.textBank.splice(0,1);
					}
						
				}
				
				
			}else if(this.room.z>miles.room.z) //find stairs (or hole?) down and head there
			{	
				this.status="Target is below";
				if(this.room.hasStairs(false))
				{
					this.status+=" and there are stairs!";
					this.onArrival=function()
					{
						this.room=curDungeon.rooms[this.room.z-1][this.room.x][this.room.y]
					}
					var nex=this.room.getStairs(false);
					this.go(nex.x,nex.y);
					return;
				}else 
				{
					for(var i=2;i<this.room.width-3;i++) //TODO check this
					{
						for(var j=2;j<this.room.height-3;j++)
						{
							if(this.room.tiles[i][j].data==DungeonTileType.Hole)
							{
								this.status+=" and there is a hole!";
								this.onArrival=function()
								{
									//this.room=curDungeon.rooms[this.room.z-1][this.room.x][this.room.y]
								}
								var nex=this.room.getStairs(false);
								this.goHole(i,j);
								return;
							}
						}
					}
				}
			}else if(this.room.z<miles.room.z) //find stairs up and head there
			{
				this.status="Target is above";
				if(this.room.hasStairs(true))
				{
					this.status+=" and there are stairs!";
					this.onArrival=function()
					{
						this.room=curDungeon.rooms[this.room.z+1][this.room.x][this.room.y]
					}
					var nex=this.room.getStairs(true)
					this.go(nex.x,nex.y);
				}
			}else //you have the right floor.
			{
				var nard=new Array();
				this.status="Target is on the same floor";
				if((miles.room.y<this.room.y) && (this.room.getOpenDoor(0,this)))
				{
					this.status="he's to the north and there is an open door!";
					var peg=this.room.getOpenDoor(0,this);
					nard=this.room.getPath(this.x,this.y,peg.x,peg.y+1,this,true);
					if((this.x==peg.x) &&  (this.y==peg.y+1))
					{
						nard.push(0);
					}
				}if((miles.room.x>this.room.x) && (this.room.getOpenDoor(1,this)))
				{
					this.status="he's to the east and there is an open door!";
					var peg=this.room.getOpenDoor(1,this);
					nard=this.room.getPath(this.x,this.y,peg.x-1,peg.y,this,true);
					if((this.x==peg.x-1) &&  (this.y==peg.y))
					{
						nard.push(0);
					}
				}if((miles.room.y>this.room.y) && (this.room.getOpenDoor(2,this)))
				{
					this.status="he's to the south and there is an open door!";
					var peg=this.room.getOpenDoor(2,this);
					nard=this.room.getPath(this.x,this.y,peg.x,peg.y-1,this,true);
					if((this.x==peg.x) &&  (this.y==peg.y-1))
					{
						nard.push(0);
					}
				} if((miles.room.x<this.room.x) && (this.room.getOpenDoor(3,this)))
				{
					this.status="he's to the west and there is an open door!";
					var peg=this.room.getOpenDoor(3,this);
					nard=this.room.getPath(this.x,this.y,peg.x+1,peg.y,this,true);
					if((this.x==peg.x+1) &&  (this.y==peg.y))
					{
						nard.push(0);
					}
				}
				if((nard) && (nard.length>0))
				{
								
					if(peg)
					{
						if(peg.orientation==0) 
						{
							this.onArrival=function()
							{
								//curDungeon.changeRoom(0,true);
								if(this.room.y>0){
									this.room=curDungeon.rooms[this.room.z][this.room.x][this.room.y-1]
									this.y=12;
									this.x=peg.x;
								}
							}
							this.go(peg.x,peg.y+1);
						}else if(peg.orientation==1) 
						{
							
							this.onArrival=function()
							{
								if(this.room.x<curDungeon.getWidth()-1){
									this.room=curDungeon.rooms[this.room.z][this.room.x+1][this.room.y]
									this.x=2;
									this.y=peg.y;
								}
							}
							
							this.go(peg.x-1,peg.y);
						}else if(peg.orientation==2) 
						{
							this.onArrival=function()
							{
								if(this.room.y<curDungeon.getHeight()-1){
									this.room=curDungeon.rooms[this.room.z][this.room.x][this.room.y+1]
									this.y=2;
									this.x=peg.x;
								}
							}
							this.go(peg.x,peg.y-1);
						}else if(peg.orientation==3) 
						{
							this.onArrival=function()
							{
								if(this.room.x>0){
									this.room=curDungeon.rooms[this.room.z][this.room.x-1][this.room.y]
									this.x=17;
									this.y=peg.y;
								}
							}
							this.go(peg.x+1,peg.y);
						}
					}
				}else
				{
					this.status="on same floor, but no open door";
				}
				
			}	

		}
		if(this.going)
		{
			this.walkTrack++;
			if((this.walkTrack>this.walkSpeed) && (this.path)) //if path. length==0, you're there. do function. 
			{
				if(this.path.length>0)
				{
					this.walkTrack=0;
					if(this.path[this.pathTrack].x>this.x) //facing east
					{
						this.dir=1;
					}
					if(this.path[this.pathTrack].x<this.x) //facing west
					{
						this.dir=3;
					}
					if(this.path[this.pathTrack].y>this.y) //facing south
					{
						this.dir=2;
					}
					if(this.path[this.pathTrack].y<this.y) //facing north
					{
						this.dir=0;
					}
					this.lastX=this.x;
					this.lastY=this.y;
					this.x=this.path[this.pathTrack].x;
					this.y=this.path[this.pathTrack].y;
					this.pathTrack++;
				}
				if(this.pathTrack==this.path.length)
				{
					this.going=false;
					this.walkTrack=0;
					this.pathTrack=0;
					//this.lastX=this.x;
					//this.lastY=this.y;
					this.path=null;
					if((this.AI>0) && (this.tracking))
					{
						var bup=this.room.closestAdj(this.tracking,this,this);
						if((bup)&&(this.x==bup.x) && (this.y==bup.y))
						{
							this.status="Arrived." 
							
							//if arrived at player, which we'll assume for now.
							if((!this.partyMember) && (this.autoJoin))
							{
								theParty.add(this);
							}
							if((this.textTrack<this.getOffChest) && ($("#dialogBox").length < 1))//(!this.talkBox.exists))
							{
								this.say();
								//this.textBank.splice(0,1);
							}
						}
					}
					if((this.destObj) && ((!this.destObj.underWater) || (this.diving)))
					{
						if(this.destObj.x>this.x)
						{
							this.dir=1;
						}else if(this.destObj.x<this.x)
						{
							this.dir=3;
						}else if(this.destObj.y>this.y)
						{
							this.dir=2;
						}else if(this.destObj.y<this.y)
						{
							this.dir=0;
						}
						if(this.destObj.playerUsable)
						{
							//if((!this.destObj.underWater) || (this.diving))
							//{
								this.destObj.playerActivate();
							//}
						}
						this.destObj=null;
					}
					this.onArrival();
					this.onArrival=function()
					{
					}
				}
			}
		}
		if(!this.swimming)
		{
			this.diving=false;
		}
	}

	for(var i=0;i<numHas;i++)
	{
		this.has.push(false);
	}
	//this.has[5]=true;

}