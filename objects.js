var numLoots=11;
var LOAD_COUNT=0;
var Object_Count=0;

var Spikey_Accel=100;
var Spikey_Vel=7;


var objectName=new Array()

for(var i=0;i<600;i++)
{
	objectName.push("ERROR!");
}

objectName[0]="Roc's Feather";
objectName[1]="Bombs";
objectName[2]="Bow";
objectName[3]="Lantern";
objectName[4]="Hammer";
objectName[5]="Red Potion";
objectName[6]="Blue Potion";
objectName[7]="Green Potion";
objectName[8]="Purple Potion";
objectName[9]="Mirror";
objectName[10]="Boomerang";
objectName[11]="Hookshot";
objectName[12]="Flippers";
objectName[13]="Lens of something or other";
objectName[14]="Pegasus Boots";
objectName[15]="Power Glove";
objectName[16]="Feces";
objectName[17]="Half-decent sword";
objectName[18]="Mushroom";
objectName[19]="Shield";
objectName[20]="Better Shield";
objectName[21]="Best Shield";
objectName[22]="Magic Boomerang";
objectName[23]="Cane of Somaria";
objectName[24]="Magic Cape";
objectName[25]="Fire Rod";
objectName[26]="Ice Rod";
objectName[27]="Shovel";
objectName[28]="Ocarina";
objectName[29]="Rum Ham";

objectName[100]="Lamp";
objectName[101]="Sign";
objectName[102]="Candle";
objectName[103]="Tall Lamp";
objectName[104]="Toggle Switch";
objectName[105]="Pot stand";
objectName[106]="Pot";
objectName[107]="Curtains";
objectName[108]="Warp";
objectName[109]="Wall shield";
objectName[110]="Wood table";
objectName[111]="Chest";
objectName[112]="Stump seat";
objectName[113]="Statue";
objectName[114]="Bookcase";
objectName[115]="Bones";
objectName[116]="Spikey thing";
objectName[117]="Eye Switch";
objectName[117]="Hold Switch";

objectName[200]="Bush";
objectName[201]="Peg";
objectName[202]="Blue Blocker";
objectName[203]="Red Blocker";
objectName[204]="Blue Orb";
objectName[205]="Red Orb";
objectName[206]="Spikes";
objectName[207]="Brick";
objectName[208]="Keyhole brick";
objectName[209]="Rock";
objectName[210]="Crystal";
objectName[211]="Crystal2";
objectName[212]="Rock2";
objectName[213]="Rock2 Cracked";
objectName[214]="Skull";
objectName[215]="Hole Plugger";
objectName[216]="Mine";
objectName[217]="Cactus";
objectName[218]="Ice Block";
objectName[219]="Stairs";

objectName[300]="Small key";
objectName[301]="Triforce";

objectName[400]="larger bomb bag";
objectName[401]="larger quiver";
objectName[402]="heart container";
objectName[403]="super bombs";
objectName[404]="Map";
objectName[405]="Compass";
objectName[406]="Master Sword";
objectName[407]="silver arrow";
objectName[408]="larger wallet";
objectName[409]="Pendant of Power";
objectName[410]="Pendant of Wisdom";
objectName[411]="Pendant of Swiftness";
objectName[412]="Pendant of ????";
objectName[413]="Pendant of ????";
objectName[414]="Pendant of ????";

objectName[500]="a rupee";
objectName[501]="five rupees";
objectName[502]="arrow";
objectName[503]="heart";
objectName[504]="bombs";
objectName[505]="Secret Seashell";
objectName[506]="apple";
objectName[507]="fifty rupees";

//var howManyOfEach={18,16,10,1,7,7} //use this eventually. 





function object(oroom) //not a tile, not an enemy
{
	this.sprites=new Array();
	this.ID=Object_Count;
	Object_Count++;
	this.curSprite=0;
	this.on=false;
	this.ctype=0;
	this.shatters=false;
	this.offWalkable=false;
	this.room=oroom;
	this.flammable=false;
	this.hurty=false; 
	this.singular=true;
	this.pickupable=false;
	this.type=0;
	this.pokable=false;
	this.returning=false;
	this.targetedX=false;
	this.targetedY=false;
	this.projPassable=false;
	this.targX=0;
	this.targY=0;
	this.homeX=0;
	this.homeY=0;
	this.torchActivate=false;
	this.pushable=false;
	this.floating=true; 
	this.persistTime=30;
	this.grabbable=false;
	this.timed=false;
	this.underWater=false;
	this.buried=false; 
	this.createdTime=0;
	this.bombable=false;
	this.projPassible=false; 
	this.blockArrows=false;
	this.arrowsActivate=false;
	this.boomerangActivate=false;
	this.swordActivate=function(){return false;};
	this.hookable=true;
	this.hidden=false;
	this.active=false;
	this.activateOnImpact=false;
	this.hasSecret=false;
	this.cooldown=0;
	this.frontOnly=false;
	this.lastActivated=0; 
	this.linkDescriptions=new Array();
	this.exists=true;
	this.playerUsable=true;
	this.canSwim=true;
	this.jumping=false;
	this.usable=false; //is an item that can be used like a bomb or a potion.
	this.x=2;
	this.y=2;
	this.xv=0;
	this.yv=0;
	this.xa=0;
	this.ya=0;
	this.decel=0.000;
	this.friction=0.05;
	this.fallingY=0;
	this.xSmall=0;
	this.ySmall=0;
	this.peakXV=2;
	this.peakYV=2;
	this.topLayer=new Array();
	this.ani=0;
	this.aniRate=30;
	this.orientation=0;
	this.curTopSprite=0;
	this.width=32;
	this.height=32;
	this.alwaysWalkable=false;
	this.canLavaSwim=false;
	this.ignite=function()
	{
		if(this.flammable)
		{
			this.exists=false;
			playSound("icemelt");
		}
		if((this.type==ObjectID.Lamp) && (!this.on))
		{
			this.activate();
			//this.on=true;
			//playSound();
		}
		
	}
	
	this.walkable=function()
	{
		if(this.alwaysWalkable)
		{
			return true;
		}
		if((this.hidden) && (!miles.has[hasID.Lens]))
		{
			return true;
		}
		if((this.type==ObjectID.HolePlugger) && (this.on))
		{
			return true;
		}
		if(this.offWalkable)
		{
			if(!this.on) {
				return true;
			}
		}
		
		return false;
	}
	this.text="";
	this.dest=new Array(); //i.e. door to be opened on activate
	this.flame=null;
	//this.setup();
}

object.prototype.getScreenX=function()
{
	return this.x*32;
}
object.prototype.getScreenY=function()
{
	return this.y*32;
}

object.prototype.toss=function(dir,force)
{
	this.fallingUp=24;
	playSound("throw");
	if(force==null) {force=10000;}
	if(dir==0)
	{
		this.ya=-force;
	}
	if(dir==1)
	{
		this.xa=+force;
	}
	if(dir==2)
	{
		this.ya=+force;
	}
	if(dir==3)
	{
		this.xa=-force;
	}
}

object.prototype.move=function(x,y) //brings along what is needed (like the flame of the lamp)
{
	this.x=x;
	this.y=y;
	this.homeX=this.x;
	this.homeY=this.y;
	this.xSmall=0;
	this.ySmall=0;
	this.underWater=false;
	if((this.room.tiles[this.x][this.y].data>19) && (this.room.tiles[this.x][this.y].data<24))
	{
		this.underWater=true;
	}
	if(this.flame)
	{
		this.flame.x=this.x*32+xOffset+this.xSmall;
		this.flame.y=this.y*32+yOffset-16+this.ySmall;
		this.flame.flare.x=this.x*32+xOffset+this.xSmall;
		this.flame.flare.y=this.y*32+yOffset-16+this.ySmall;
		if(this.type==ObjectID.TallLamp)
		{
			this.flame.y=this.y*32+yOffset-36+this.ySmall;
			this.flame.flare.y=this.y*32+yOffset-36+this.ySmall;
		}
	}
}

object.prototype.setup=function(id,par)
{
	if(id) {this.type=id;}
	//this.ignite=function() {return;};
	this.sprites=objectSprites[this.type];
	if((this.room)&&(this.room.tiles[this.x][this.y].data>19) && (this.room.tiles[this.x][this.y].data<24))
	{
		this.underWater=true;
	}
	if (this.type==ObjectID.TallLamp) {
		this.aniRate=5;
		this.projPossible=false;
		this.projPassable=false;
		this.curSprite=1;
		this.topLayer=objectTopSprites[this.type];
		this.curTopSprite=1;
	    this.name="Tall lamp";
		this.playerUsable=true;
		this.flame=new flame(this.room.lights);
		this.flame.x=this.x*32+xOffset;
		this.flame.y=(this.y-1)*32+yOffset-20;
		//this.flame.flare.alive=true;
		this.flame.type=0;
		this.flame.alive=false;
		//this.room.fires.push(this.flame);

		this.playerActivate=function()
		{
			//return;//for now
			if((!this.on)&&(!miles.has[hasID.Lantern]))
			{
				bConsoleBox.log("Need the lantern!","yellow");
				playSound("error");
				return;
			}
			this.activate();
		}
		this.activate=function()
		{
			//return;//for now
			this.on=!this.on;
			
			if(!this.on)
			{
				this.flame.flare.alive=false;
				this.flame.alive=false;
				
			}else{
				this.flame=new flame(this.room.lights);
				this.flame.x=this.x*32+xOffset;//miles.x;
				this.flame.y=(this.y-1)*32+yOffset-32;//miles.y;
				this.flame.type=0;
				playSound("lamp");
			}
		}
		this.activateEdit=this.activate;
		this.activate(); //oooh that's why it's backwards. 
		//this.ignite=this.activate();
	}else if (this.type==ObjectID.Lamp) {
	    this.name="lamp";
		this.flame=new flame(this.room.lights);
		this.flame.x=this.x*32+xOffset+2;
		this.flame.y=this.y*32+yOffset-15;
		this.flame.type=0;
		this.playerUsable=true;
		this.flame.alive=false;
		//this.room.fires.push(this.flame);
		
		this.playerActivate=function()
		{
			if((!this.on)&&(!miles.has[hasID.Lantern]))
			{
				bConsoleBox.log("Need the lantern!","yellow");
				playSound("error");
				return;
			}
			this.activate();
		}
		this.activate=function()
		{
			this.on=!this.on;
			
			if(!this.on)
			{
				this.flame.flare.alive=false;
				this.flame.alive=false;
				
			}else{
				this.flame=new flame(this.room.lights);
				this.flame.x=this.x*32+xOffset;//miles.x;
				this.flame.y=this.y*32+yOffset-16;//miles.y;
				this.flame.type=0;
				playSound("lamp");
			}
		}
		this.activateEdit=this.activate;
		this.activate(); //oooh that's why it's backwards. 
		//this.ignite=this.activate();
	}else if (this.type==ObjectID.Candle) {
	    this.name="candle";
		this.flame=new flame(this.room.lights);
		this.flame.x=this.x*32+xOffset+2;
		this.flame.y=this.y*32+yOffset-15;
		this.flame.type=0;
		this.playerUsable=true;
		this.flame.alive=false;
		//this.room.fires.push(this.flame);
		
		this.playerActivate=function()
		{
			if((!this.on)&&(!miles.has[hasID.Lantern]))
			{
				bConsoleBox.log("Need the lantern!","yellow");
				playSound("error");
				return;
			}
			this.activate();
		}
		this.activate=function()
		{
			this.on=!this.on;
			
			if(!this.on)
			{
				this.flame.flare.alive=false;
				this.flame.alive=false;
				
			}else{
				this.flame=new flame(this.room.lights);
				this.flame.x=this.x*32+xOffset;//miles.x;
				this.flame.y=this.y*32+yOffset-16;//miles.y;
				this.flame.type=0;
				playSound("lamp");
			}
		}
		this.activateEdit=this.activate;
		this.activate(); //oooh that's why it's backwards. 
		//this.ignite=this.activate();
	}else if (this.type==ObjectID.Sign) {
		this.name="sign";
		this.frontOnly=true;
		this.text="Snoke";
		if(par!=null){
			this.text=par;
			}
		this.messagebox=null;
		this.activate=function(){
			//display textbox with text. 
			if((!this.messagebox) || (!this.messagebox.exists))
			{
				playSound("textbox");
				var mancy=new textbox();
				mancy.setup();
				mancy.x=200;
				mancy.y=200;
				mancy.textLim=104;
				mancy.log(this.text);
				mancy.hasFocus=true;
				buttons.push(mancy);
				this.messagebox=mancy;
			}
		}
		this.playerActivate=this.activate;
		this.activateEdit=function()
		{
			this.text = prompt("Enter Sign Text");
		}
	}else if (this.type==ObjectID.Chest) {
		this.sprites=objectSprites[this.type];
		this.name="Chest";
		this.frontOnly=true;
		//this.loot=0;
		this.playerActivate=function(){
			if(this.curSprite==1) {return;}
			if((this.hidden) &&(!miles.has[hasID.Lens])) {return;}
			playSound("chestopen");
			playSound("itemfanfare");
			
			this.curSprite=1;
			//give item!
			var btext="You...found a severed pig's head."
			if(this.loot==ObjectID.Key)
			{
				bConsoleBox.log("You got a key!");
				miles.keys++;
				btext = "You have found a small key! ";
			}else if(this.loot==ObjectID.Gold)
			{
				bConsoleBox.log("You got a rupee.");
				btext="You got a a rupee.";
				miles.money++;
			}else if(this.loot==ObjectID.TenGold)
			{
				bConsoleBox.log("You got five rupees!");
				btext="You got five rupees!";
				miles.money+=5;
			}else if(this.loot==ObjectID.FiftyGold)
			{
				bConsoleBox.log("You got fifty rupees! Nice!");
				btext="You got fifty rupees! Nice!";
				miles.money+=50;
			}else if(this.loot==ObjectID.Bow)
			{
				var shinex=new object();
				//shinex.usable=true;
				shinex.type=this.loot;
				shinex.room=this.room;
				shinex.setup();
				shinex.activate();
				/*miles.giveItem(shinex,10);
				miles.arrows+=10;*/
				btext = "You have found the "+objectName[this.loot];
				
			}else if(this.loot==ObjectID.Bomb)
			{
				var shinex=new object();
				//shinex.usable=true;
				shinex.type=this.loot;
				shinex.room=this.room;
				shinex.setup();
				/*miles.giveItem(shinex,5);
				//miles.has[hasID.Bomb]=true;
				miles.bombs+=5;*/
				shinex.activate();
				btext = "You have found the "+objectName[this.loot];
			}else if(this.loot==ObjectID.BombRefill)
			{
				if(!miles.has[hasID.Bomb])
				{
					this.loot=ObjectID.Gold;
				}
				var shinex=new object()
				//shinex.usable=true;
				shinex.type=this.loot;
				shinex.room=this.room;
				shinex.setup();
				/*miles.giveItem(shinex,5);
				//miles.has[hasID.Bomb]=true;
				miles.bombs+=5;*/
				shinex.activate();
				btext = "You have found the "+objectName[this.loot];
			}else if(this.loot==ObjectID.Arrow)
			{
				if(!miles.has[hasID.Bow])
				{
					this.loot=ObjectID.Gold;
				}
				var shinex=new object()
				//shinex.usable=true;
				shinex.type=this.loot;
				shinex.room=this.room;
				shinex.setup();
				/*miles.giveItem(shinex,5);
				//miles.has[hasID.Bomb]=true;
				miles.bombs+=5;*/
				shinex.activate();
				btext = "You have found the "+objectName[this.loot];
			}else
			{
				var shinex=new object();
				//shinex.usable=true;
				shinex.type=this.loot;
				shinex.room=this.room;
				shinex.setup();
				shinex.activate();
				/*if(shinex.usable)
				{
					miles.giveItem(shinex,1);
				}*/
				if(this.loot==ObjectID.RumHam)
				{
					//btext = "You have found the legendary "+objectName[this.loot]+"!";
					btext = "You have found the "+objectName[this.loot];
				}else
				{
					btext = "You have found the "+objectName[this.loot];
				}
			}
			
	
			var mancy=new textbox();
			mancy.setup();
			mancy.x=340;
			mancy.y=100;
			mancy.width=210;
			mancy.textLim=62;
			mancy.log(btext);
			mancy.hasFocus=true;
			buttons.push(mancy);
			this.messagebox=mancy;
		}
		this.activate=function()
		{
			if(this.hidden)
			{	
				this.hidden=false;
				playSound("secret");
			}
		}
		this.activateEdit=function(){
			editor.mode=editModes.ChestLoot;
			editor.lootFor=this;
		}
	}else if(this.type==ObjectID.PendantPower)
	{
		this.name="Pendant of Power";
		this.pickupable=true;
		this.alwaysWalkable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
						
			playSound("itemfanfare");
			bConsoleBox.log("You found the Pendant of Power!");
			btext="You found the Pendant of Power!";
			miles.swordDamage*=1.5;
			miles.holding=this.sprites[0];
			miles.has[hasID.PendantPower]=true;
			this.exists=false;
		}
		this.playerActivate=this.activate;
	}else if(this.type==ObjectID.PendantWisdom)
	{
		this.name="Pendant of Wisdom";
		this.pickupable=true;
		this.alwaysWalkable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
						
			playSound("itemfanfare");
			bConsoleBox.log("You found the Pendant of Wisdom!");
			btext="You found the Pendant of Wisdom!";
			miles.magicRegen+=0.05;
			miles.holding=this.sprites[0];
			miles.has[hasID.PendantWisdom]=true;
			this.exists=false;
		}
		this.playerActivate=this.activate;
	}else if(this.type==ObjectID.PendantSwiftness)
	{
		this.name="Pendant of Swiftness";
		this.pickupable=true;
		this.alwaysWalkable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
						
			playSound("itemfanfare");
			bConsoleBox.log("You found the Pendant of Swiftness!");
			btext="You found the Pendant of Swiftness!";
			miles.baseSpeed=6;
			miles.holding=this.sprites[0];
			miles.has[hasID.PendantSwiftness]=true;
			this.exists=false;
		}
		this.playerActivate=this.activate;
	}else if(this.type==ObjectID.PendantFour)
	{
		this.name="Pendant of ????";
		this.pickupable=true;
		this.alwaysWalkable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
						
			playSound("itemfanfare");
			bConsoleBox.log("You found the Pendant of ????!");
			btext="You found the Pendant of ????!";
			//miles.baseSpeed=6;
			miles.holding=this.sprites[0];
			miles.has[hasID.PendantFour]=true;
			this.exists=false;
		}
		this.playerActivate=this.activate;
	}else if(this.type==ObjectID.PendantFive)
	{
		this.name="Pendant of ????";
		this.pickupable=true;
		this.alwaysWalkable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
						
			playSound("itemfanfare");
			bConsoleBox.log("You found the Pendant of ????!");
			btext="You found the Pendant of ????!";
			//miles.baseSpeed=6;
			miles.holding=this.sprites[0];
			miles.has[hasID.PendantFive]=true;
			this.exists=false;
		}
		this.playerActivate=this.activate;
	}else if(this.type==ObjectID.PendantSix)
	{
		this.name="Pendant of ????";
		this.pickupable=true;
		this.alwaysWalkable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
						
			playSound("itemfanfare");
			bConsoleBox.log("You found the Pendant of ????!");
			btext="You found the Pendant of ????!";
			//miles.baseSpeed=6;
			miles.holding=this.sprites[0];
			miles.has[hasID.PendantFive]=true;
			this.exists=false;
		}
		this.playerActivate=this.activate;
	}else if(this.type==ObjectID.Shield)
	{
		this.name="Shield";
		this.pickupable=true;
		this.alwaysWalkable=true;
		this.hookable=false;
		this.activate=function()
		{
			if(this.buried){return;}
			if((miles.has[hasID.Shield]) || (miles.has[hasID.BetterShield]) ||(miles.has[hasID.BestShield]))
			{
				playSound("item");
				bConsoleBox.log("You found a shield, but it's not an improvement over the one you already have.");
				btext="You found a shield, but it's not an improvement over the one you already have.";
				this.exists=false;
				return;
			}
			
			playSound("itemfanfare");
			bConsoleBox.log("You found a shield!");
			btext="You found a shield!";
			miles.holding=this.sprites[0];
			miles.has[hasID.Shield]=true;
			this.exists=false;
		}
		this.playerActivate=this.activate;
	}else if(this.type==ObjectID.BetterShield)
	{
		this.name="Better shield";
		this.pickupable=true;
		this.hookable=false;
		this.alwaysWalkable=true;
		this.activate=function()
		{
			if(this.buried){return;}
			
			if(miles.has[hasID.BestShield])
			{
				playSound("item");
				bConsoleBox.log("You found a shield, but it's not as shiny as the one you already have.");
				btext="You found a shield, but it's not as shiny as the one you already have.";
				this.exists=false;
				return;
			}
			if(miles.has[hasID.BetterShield])
			{
				playSound("item");
				bConsoleBox.log("You found a shield, but it's not an improvement over the one you already have.");
				btext="You found a shield, but it's not an improvement over the one you already have.";
				this.exists=false;
				return;
			}
			
			playSound("itemfanfare");
			bConsoleBox.log("You found a nicer shield!");
			btext="You found a nice shield!";
			miles.holding=this.sprites[0];
			miles.has[hasID.BetterShield]=true;
			miles.has[hasID.Shield]=true;
			miles.shieldSprites=bettershieldSprites;
			//this.shieldDef++?
			this.exists=false;
		}
		this.playerActivate=this.activate;
	}else if(this.type==ObjectID.BestShield)
	{
		this.name="Mirror shield";
		this.pickupable=true;
		this.alwaysWalkable=true;
		this.hookable=false;
		this.activate=function()
		{
			if(this.buried){return;}
			if(miles.has[hasID.BestShield])
			{
				playSound("item");
				bConsoleBox.log("You found a shield, but it's not an improvement over the one you already have.");
				btext="You found a shield, but it's not an improvement over the one you already have.";
				this.exists=false;
				return;
			}
			playSound("itemfanfare");
			bConsoleBox.log("You found a shiny shield!");
			btext="You found a shiny shield!";
			miles.holding=this.sprites[0];
			miles.has[hasID.BestShield]=true;
			miles.has[hasID.Shield]=true;
			miles.shieldSprites=bestshieldSprites;
			//this.shieldDef++?
			this.exists=false;
		}
		this.playerActivate=this.activate;
	}else if(this.type==ObjectID.MagicBoomerang)
	{
		this.name="Magic Boomerang";
		this.pickupable=true;
		this.alwaysWalkable=true;
		this.activate=function()
		{
			if(this.buried){return;}
			if(miles.has[hasID.MagicBoomerang])
			{
				playSound("item");
				bConsoleBox.log("You found another Magic Boomerang! You really don't need two.");
				btext="You found another Magic Boomerang! You really don't need two.";
				this.exists=false;
				return;
			}
			playSound("itemfanfare");
			bConsoleBox.log("You found a magic boomerang!");
			btext="You found a magic boomerang";
			miles.holding=this.sprites[0];
			miles.has[hasID.MagicBoomerang]=true;
			if(!miles.has[hasID.Boomerang])
			{
				miles.has[hasID.Boomerang]=true;
				var shinex=new object();
				//shinex.usable=true;
				shinex.type=ObjectID.Boomerang;
				shinex.room=this.room;
				shinex.setup();
				miles.giveItem(shinex);
			}
			var gurt=miles.getItem(ObjectID.Boomerang);
			if(gurt)
			{
				gurt.sprites=new Array();
				gurt.sprites.push(magicboomerangsprite1);
			}
			miles.actingSprites[0][0]=magicboomact[0];
			miles.actingSprites[1][0]=magicboomact[1];
			miles.actingSprites[2][0]=magicboomact[2];
			miles.actingSprites[3][0]=magicboomact[3];
			//objectSprites[ObjectID.Boomerang]
		//	miles.shieldSprites=bestshieldSprites;
			this.exists=false;
		}
		this.playerActivate=this.activate;
	}else if(this.type==ObjectID.SuperBomb)
	{
		this.name="Super Bombs";
		this.pickupable=true;
		this.alwaysWalkable=true;
		this.activate=function()
		{
			if(this.buried){return;}
			if(miles.has[hasID.SuperBomb])
			{
				playSound("item");
				this.exists=false;
				bConsoleBox.log("You found some bombs.");
				btext="You found some bombs."
				var shinex=new object();
				shinex.type=ObjectID.Bomb;
				shinex.room=this.room;
				shinex.setup();
				miles.giveItem(shinex,5);
				miles.bombs+=5;
				return;
			}
			playSound("itemfanfare");
			bConsoleBox.log("You got the super bombs!");
			btext="You got the super bombs!";
			miles.holding=this.sprites[0];
			miles.has[hasID.SuperBomb]=true;
			miles.has[hasID.Bomb]=true;
			var shinex=new object();
			//shinex.usable=true;
			shinex.type=ObjectID.Bomb;
			shinex.room=this.room;
			shinex.setup();
			miles.giveItem(shinex,5);
			miles.bombs+=5;
			//error. but when and why? because you ran out of bombs? 
			miles.getItem(ObjectID.Bomb).sprites=new Array();
			miles.getItem(ObjectID.Bomb).sprites.push(superbombsprite);
			this.exists=false;
		}
		this.playerActivate=this.activate;
	}else if(this.type==ObjectID.SilverArrow)
	{
		this.name="Silver Arrow";
		this.pickupable=true;
		this.alwaysWalkable=true;
		this.activate=function()
		{
			if(this.buried){return;}
			if(miles.has[hasID.SilverArrows])
			{
				playSound("item");
				this.exists=false;
				bConsoleBox.log("You found some arrows.");
				btext="You found some arrows.";
				var shinex=new object();
				shinex.type=ObjectID.Bow;
				shinex.room=this.room;
				shinex.setup();
				miles.giveItem(shinex,5);
				miles.arrows+=5;
				return;
			}
			playSound("itemfanfare");
			bConsoleBox.log("You got the silver arrows!");
			btext="You got the silver arrows!";
			miles.holding=this.sprites[0];
			miles.has[hasID.SilverArrows]=true;
			this.exists=false;
			var shinex=new object();
			shinex.usable=true;
			shinex.type=ObjectID.Bow;
			shinex.setup();
			miles.arrows+=5;
			miles.giveItem(shinex,5);
		}
		this.playerActivate=this.activate;
	}else if(this.type==ObjectID.RedPotion)
	{
		this.name="Red potion";
		this.pickupable=true;
		this.alwaysWalkable=true;
		this.usable=true;
		this.singular=false;
		this.activate=function()
		{
			playSound("itemfanfare");
			bConsoleBox.log("You found a red potion!");
			btext="You found a red potion!";
			miles.giveItem(this);
			miles.holding=this.sprites[0];
			this.exists=false;
		}
		this.playerActivate=this.activate;
	}else if(this.type==ObjectID.PurplePotion)
	{
		this.name="Life potion";
		this.pickupable=true;
		this.alwaysWalkable=true;
		this.usable=true;
		this.singular=false;
		this.activate=function()
		{
			playSound("itemfanfare");
			bConsoleBox.log("You found a Life Potion!");
			btext="You found a Life Potion!";
			miles.giveItem(this);
			miles.holding=this.sprites[0];
			this.exists=false;
		}
		this.playerActivate=this.activate;
		
	}else if(this.type==ObjectID.GreenPotion)
	{
		this.name="Green potion";
		this.pickupable=true;
		this.alwaysWalkable=true;
		this.usable=true;
		this.singular=false;
		this.activate=function()
		{
			playSound("itemfanfare");
			bConsoleBox.log("You found a green potion!");
			btext="You found a green potion!";
			miles.giveItem(this);
			miles.holding=this.sprites[0];
			this.exists=false;
		}
		this.playerActivate=this.activate;
		
	}else if(this.type==ObjectID.BluePotion)
	{
		this.name="Blue potion";
		this.pickupable=true;
		this.alwaysWalkable=true;
		this.usable=true;
		this.singular=false;
		this.activate=function()
		{
			playSound("itemfanfare");
			bConsoleBox.log("You found a blue potion!");
			btext="You found a blue potion!";
			miles.giveItem(this);
			miles.holding=this.sprites[0];
			this.exists=false;
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Key) {
		this.name="Key";
		this.pickupable=true;
		this.alwaysWalkable=true;
		this.activate=function()
		{
			if(this.buried){return;}
			playSound("key");
			this.exists=false;
			bConsoleBox.log("Acquired a key!");
			//miles.holding=this.sprites[0];
			miles.keys++;
		}
		this.playerActivate=this.activate;
	}else if(this.type==ObjectID.Wallet)
	{
		this.name="Wallet";
		this.pickupable=true;
		this.alwaysWalkable=true;
		this.usable=false;
		this.activate=function()
		{
			if(this.buried){return;}
			playSound("itemfanfare");
			bConsoleBox.log("You found a bigger wallet!");
			btext="You found a bigger wallet!";
			this.exists=false;
			miles.wallet=miles.wallet*2;
			if(miles.wallet>999)
			{
				miles.wallet=999;
			}
		}
		this.playerActivate=this.activate;
	}else if(this.type==ObjectID.Quiver)
	{
		this.name="Quiver";
		this.pickupable=true;
		this.alwaysWalkable=true;
		this.usable=false;
		this.activate=function()
		{
			if(this.buried){return;}
			playSound("itemfanfare");
			bConsoleBox.log("You found a bigger quiver!");
			btext="You found a bigger quiver!";
			miles.maxArrows+=10;
			this.exists=false;
			miles.holding=this.sprites[0];
		}
		this.playerActivate=this.activate;
	}else if(this.type==ObjectID.BombBag)
	{
		this.name="bomb bag";
		this.pickupable=true;
		this.alwaysWalkable=true;
		this.usable=false;
		this.activate=function()
		{
			if(this.buried){return;}
			playSound("itemfanfare");
			bConsoleBox.log("You found a bigger bomb bag!");
			btext="You found a bigger bomb bag!";
			miles.maxBombs=miles.maxBombs+10;
			this.exists=false;
			miles.holding=this.sprites[0];
		}
		this.playerActivate=this.activate;
	}else if(this.type==ObjectID.Map)
	{
		this.name="Map";
		this.pickupable=true;
		this.alwaysWalkable=true;
		this.usable=false;
		this.activate=function()
		{
			if(this.buried){return;}
			if(miles.has[hasID.Map])
			{
				playSound("item");
				this.exists=false;
				bConsoleBox.log("You found another map, but it's the same as the one you already have.");
				btext="You found another map, but it's the same as the one you already have.";
				return;
			}
			playSound("itemfanfare");
			bConsoleBox.log("You found a map of this dungeon! hit G to use it");
			btext="You found a map of this dungeon! hit G to use it"
			miles.has[hasID.Map]=true;
			this.exists=false;
			miles.holding=this.sprites[0];
		}
		this.playerActivate=this.activate;
	}else if(this.type==ObjectID.Compass)
	{
		this.name="Compass";
		this.pickupable=true;
		this.alwaysWalkable=true;
		this.usable=false;
		this.activate=function()
		{
			if(this.buried){return;}
			if(miles.has[hasID.Compass])
			{
				playSound("item");
				this.exists=false;
				bConsoleBox.log("You found another compass, but this one also appears to be broken.");
				btext="You found another compass, but this one also appears to be broken.";
				return;
			}
			playSound("itemfanfare");
			bConsoleBox.log("You found a compass! It will eventually reveal the location of things.");
			btext="You found the compass"
			miles.has[hasID.Compass]=true;
			this.exists=false;
			miles.holding=this.sprites[0];
		}
		this.playerActivate=this.activate;
	}else if(this.type==ObjectID.Poo)
	{
		this.name="Poop";
		this.pickupable=true;
		this.floating=false;
		this.alwaysWalkable=true;
		this.hookable=true;
		this.projPassable=true;
		this.drawOrder=1;
		this.usable=true;
		this.activate=function()
		{
			if(this.buried){return;}
			playSound("itemfanfare");
			miles.has[hasID.Poo]=true;
			//miles.inventory.push(this);
			if((Krugman) && (!this.on))
			{
				Krugman.say("Eeeww!! You're touching it!!");
				Krugman.textBank.push("If we're going to keep travelling together, I feel I have a right to know why you're carrying my feces around in your bag." );
				Krugman.textSaid.push(false);
				var loj=function()
				{
					if(miles.has[hasID.Poo])
					{
						return true;
					}else {return false;}
				}
				Krugman.textConditions.push(loj);
				this.on=true;
			}
			if(!miles.has[hasID.Poo])
			{
				bConsoleBox.log("You've found... Krugman's leavings. Gross.");
				btext="You've found... the professor's leavings. Gross.";
			}else
			{
				bConsoleBox.log("Seriously though, why do you keep grabbing the poop?");
				btext="Seriously though, why do you keep grabbing the poop?";
			}
			miles.holding=this.sprites[0];
			miles.giveItem(this);
			this.exists=false;
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.HoldSwitch) {
		this.name="Hold Switch";
		this.alwaysWalkable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=0;
		this.activateEdit=function(){
			editor.mode=editModes.SwitchLink
			editor.linkingFrom=this;
		}
		this.activate=function(){}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.ToggleSwitch) {
		this.name="Switch";
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=0;
		this.alwaysWalkable=true;
		this.activateEdit=function(){
			editor.mode=editModes.SwitchLink
			editor.linkingFrom=this;
		}
		this.activate=function(){
			if(this.buried){return;}
			playSound("switch");
			this.on=!this.on
			if(this.on)
			{
				this.curSprite= 1;
			}else
			{
				this.curSprite= 0;
			}
			for(var i=0;i<this.dest.length;i++){
				this.dest[i].activate();
				if(this.dest[i].room.z<this.room.z)
				{
					bConsoleBox.log("You hear a sound from below");
					playSound("switchhit");
				}else if(this.dest[i].room.z>this.room.z)
				{
					bConsoleBox.log("You hear a sound from above");
					playSound("switchhit");
				}else
				{
					if(this.dest[i].room.x<this.room.x)
					{
						bConsoleBox.log("You hear a sound from the west");
					}else if(this.dest[i].room.x>this.room.x)
					{
						bConsoleBox.log("You hear a sound from the east");
					}else if(this.dest[i].room.y<this.room.y)
					{
						bConsoleBox.log("You hear a sound from the north");
					}else if(this.dest[i].room.y>this.room.y)
					{
						bConsoleBox.log("You hear a sound from the south");
					}
				}
			}
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.PotStand) {
		this.alwaysWalkable=true;
		this.playerUsable=false;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=0;
		this.name="Pot stand";
		this.playerActivate=function() {};//this.activate;
	}else if (this.type==ObjectID.SpikeyThing) {
		this.alwaysWalkable=false;
		this.hurty=true; 
		//this.friction=0;
		this.homeX=this.x;
		this.homeY=this.y;
		this.playerUsable=false;
		this.name="Spikey thing";
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Crystal) {
		this.alwaysWalkable=false;
		this.playerUsable=false;
		this.projPossible=false;
		this.pokable=true;
		this.on=true;
		this.swordActivate=function() {
			if(miles.has[hasID.MasterSword])
			{
				return true;
			}
			return false;
		}
		this.name="strange crystal";
		this.activate=function()
		{
			if(!miles.has[hasID.Sword]) //need sword
			{
				return false;
			} 
			if(this.on)
			{
				playSound("shatter");
				//this.curSprite=1;
				//this.aniRate=3;
				this.exists=false;
				
			}
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Crystal2) {
		this.alwaysWalkable=false;
		this.playerUsable=false;
		this.swordActivate=function() {
			return (miles.reallyDashing);
		}
		this.projPossible=false;
		this.pokable=true;
		this.name="stranger crystal";
		this.activate=function()
		{
			this.exists=false
			playSound("shatter");
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.KeyBrick) {
		this.alwaysWalkable=false;
		this.playerUsable=true;
		this.hookable=true;
		this.projPossible=false;
		this.name="Key Block"; 
		this.playerActivate=function()
		{
			if(miles.keys>0)
			{
				this.exists=false;
				miles.keys--;
				playSound("unlock");
				bConsoleBox.log("Unlocked!");
				return true;
			}else 
			{
				playSound("locked");
				bConsoleBox.log("Need a key!");
				return false;
			}
		}
	}else if (this.type==ObjectID.Mine) {
		this.alwaysWalkable=true;
		//this.playerUsable=true;
		this.hookable=false;
		this.projPossible=true;
		this.name="Land Mine"; 
		this.drawOrder=2;
		this.activate=function()
		{
			this.exists=false;
			//spawn bomb and detonate. 
			var edsbomb=new bomb(this.room,false);
			edsbomb.x=this.x;
			edsbomb.y=this.y;
		
			edsbomb.exists=true;
			edsbomb.armed=true;
			edsbomb.timePlaced=new Date().getTime();
			this.room.bombs.push(edsbomb);
			edsbomb.explode();;
		}
	}else if (this.type==ObjectID.Bones) {
		this.alwaysWalkable=true;
		this.playerUsable=true;
		this.name="Bones";
		this.width=48;
		this.height=32;
		this.on=false;
		this.playerActivate=function()
		{
			if((Krugman) && (!this.on))
			{
				Krugman.say("Ah yes, poor Edward. He was my intern. He died of... non-suspicious causes shortly after we fell down here.");
				Krugman.chatterBank.push("I'm starting to get hungry. Do you have any food? Well I hope we find something to eat soon. I'm not a doctor but I could tell Edward's fate was sealed when we ran out of rations.");
				Krugman.textBank.push("I'm starting to sense some tension in the air, and I feel like I should just be honest. So here it goes. I'm putting it all on the line here, so you'll have to promise you won't  judge me...")
				Krugman.textSaid.push(false);
				var plo=function ()
				{
					if(miles.room.z>0)
					{
						return true;
					}else
					{
						return false;
					}
				}
				Krugman.textConditions.push(plo);
				Krugman.textBank.push("...I ate Edward. He was delicious. But I swear I didn't kill him! At best it was an assist.");
				Krugman.textSaid.push(false);
				//Krugman.getOffChest=Krugman.textTrack+1;//Bank.length-1;
				golp=function(){return true;};
				Krugman.textConditions.push(golp);
				Krugman.textBank.push("Phew I'm so glad that's all out in the open now. Lets keep going. And let me know if you get hungry I still have some Edward in my pack.");
				Krugman.textSaid.push(false);
				Krugman.textConditions.push(golp);
				this.on=true;
			}
		}

	}else if (this.type==ObjectID.Table) {
		this.alwaysWalkable=false;
		this.playerUsable=false;
		this.width=96;
		this.height=64;
		this.name="Table";
		this.curSprite=1;
		this.activate=function() {};
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.StumpSeat) {
		this.alwaysWalkable=false;
		this.playerUsable=false;
		this.name="Seat";
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Bookcase) {
		this.alwaysWalkable=false;
		this.playerUsable=true;
		this.width=96;
		this.curSprite=1;
		this.projPossible=false;
		this.height=32;
		this.topLayer=objectTopSprites[this.type];
		this.name="Bookcase";
		this.playerActivate=function()
		{
			if(OPTIONS.SafeMode)
			{
				$("<div id='dialogBox'>").text("Books on various subjects.").appendTo("body");
			}else
			{
				if(Math.random()*2000<2)
				{
					$("<div id='dialogBox'>").text("Books on various subjects. You scan for pornography but find ..wait. What's that?! You found the pornography! Lucky!").appendTo("body");
				}else
				{
					$("<div id='dialogBox'>").text("Books on various subjects. You scan for pornography but find none.").appendTo("body");
				}
			}
		};
	}else if (this.type==ObjectID.Statue) {
		this.alwaysWalkable=false;
		this.playerUsable=false;
		this.projPossible=false;
		//this.height=64;
		this.topLayer=objectTopSprites[this.type];
		this.name="Statue";
		this.curSprite=1;
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Cactus) {
		this.alwaysWalkable=false;
		this.playerUsable=false;
		this.projPossible=false;
		//this.height=64;
		this.topLayer=objectTopSprites[this.type];
		this.name="cactus";
		this.curSprite=1;
		this.hurty=true;
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Pot) {
		this.bombable=true;
		this.grababble=true;
		this.floating=false;
		this.shatters=true;
		this.drawOrder=4;
		this.activateOnImpact=true;
		this.name="Pot";
		this.playerUsable=false;
		this.swordActivate=function() {
			if(miles.has[hasID.MasterSword])
			{
				return true;
			}
			return false;
		}
		this.activate=function()
		{
			if(!this.on)
			{
				playSound("shatter");
				this.curSprite=1;
				this.aniRate=3;
				this.on=true;
				if(false)//(this.loot)
				{
				
				}else if(Math.random()*10>4)
				{
					var bmoke=3;
					if((miles.hp<miles.maxHp) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.Heart);
						return;
					}
					if((miles.has[hasID.Bow]) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.Arrow);
						return;
					}
					if((miles.has[hasID.Bomb]) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.BombRefill);
						return;
					}
					if((miles.mp<miles.maxMp) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.MagicJar);
						return;
					}else if((miles.mp<miles.maxMp) && (Math.random()*10>6))
					{
						makeObject(this.x,this.y,this.room,ObjectID.SmallJar);
						return;
					}
					var pojk=500+Math.floor(Math.random()*2);
					makeObject(this.x,this.y,this.room,pojk);
				}
			}
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Skull) {
		this.bombable=false;//true;
		this.on=true;
		this.shatters=true;
		this.grababble=true;
		this.projPossible=false;
		this.floating=false;
		this.activateOnImpact=true;
		this.name="skull";
		this.activate=function()
		{
			if(!miles.has[hasID.Glove]) //need glvoes
			{
				if(OPTIONS.SafeMode)
				{
					bConsoleBox.log("Too heavy to lift with your bear hands!", "yellow"); 
				}else
				{
					bConsoleBox.log("No glove no love!", "yellow"); 
					playSound("error");
				}
				return false;
			} 
			if(this.on)
			{
				playSound("shatter");
				this.curSprite=1;
				this.aniRate=3;
				this.on=false;
				if(true)//(this.loot) //no loot for skulls I think? 
				{
				
				}else if(Math.random()*10>4)
				{
					var bmoke=3;
					if((miles.hp<miles.maxHp) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.Heart);
						return;
					}
					if((miles.has[hasID.Bow]) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.Arrow);
						return;
					}
					if((miles.has[hasID.Bomb]) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.BombRefill);
						return;
					}if((miles.mp<miles.maxMp) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.MagicJar);
						return;
					}else if((miles.mp<miles.maxMp) && (Math.random()*10>6))
					{
						makeObject(this.x,this.y,this.room,ObjectID.SmallJar);
						return;
					}
					var pojk=500+Math.floor(Math.random()*2);
					makeObject(this.x,this.y,this.room,pojk);
				}
			}
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Rock) {
		this.shatters=true;
		this.bombable=false;//true;
		this.on=true;
		this.offWalkable=true;
		this.floating=false;
		this.grababble=true;
		this.projPossible=false;
		this.activateOnImpact=true;
		this.name="rock";
		this.activate=function()
		{
			if(!miles.has[hasID.Glove]) //need glvoes
			{
				if(OPTIONS.SafeMode)
				{
					bConsoleBox.log("Too heavy to lift with your bear hands!", "yellow"); 
				}else
				{
					bConsoleBox.log("No glove no love!", "yellow"); 
					playSound("error");
				}
				return false;
			} 
			if(this.on)
			{
				playSound("shatter");
				this.curSprite=1;
				this.aniRate=3;
				this.on=false;
				if(false)//(this.loot)
				{
				
				}else if(Math.random()*10>4)
				{
					var bmoke=3;
					if((miles.hp<miles.maxHp) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.Heart);
						return;
					}
					if((miles.has[hasID.Bow]) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.Arrow);
						return;
					}
					if((miles.has[hasID.Bomb]) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.BombRefill);
						return;
					}if((miles.mp<miles.maxMp) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.MagicJar);
						return;
					}else if((miles.mp<miles.maxMp) && (Math.random()*10>6))
					{
						makeObject(this.x,this.y,this.room,ObjectID.SmallJar);
						return;
					}
					var pojk=500+Math.floor(Math.random()*2);
					makeObject(this.x,this.y,this.room,pojk);
				}
			}
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Rock2) {
		this.bombable=false;//true;
		this.on=true;
		this.shatters=true;
		this.projPossible=false;
		this.floating=false;
		this.name="rock";
		this.activate=function()
		{
			if(this.on)
			{
				playSound("shatter");
				this.curSprite=1;
				this.aniRate=3;
				this.on=false;
				if(false)//(this.loot)
				{
				
				}else if(Math.random()*10>4)
				{
					var bmoke=3;
					if((miles.hp<miles.maxHp) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.Heart);
						return;
					}
					if((miles.has[hasID.Bow]) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.Arrow);
						return;
					}
					if((miles.has[hasID.Bomb]) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.BombRefill);
						return;
					}if((miles.mp<miles.maxMp) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.MagicJar);
						return;
					}else if((miles.mp<miles.maxMp) && (Math.random()*10>6))
					{
						makeObject(this.x,this.y,this.room,ObjectID.SmallJar);
						return;
					}
					var pojk=500+Math.floor(Math.random()*2);
					makeObject(this.x,this.y,this.room,pojk);
				}
			}
		}
		this.playerActivate=function(){};
	}else if (this.type==ObjectID.Rock2Cracked) {
		this.bombable=true;
		this.on=true;
		this.shatters=true;
		this.projPossible=false;
		this.floating=false;
		this.drawOrder=3;
		this.name="cracked rock";
		this.activate=function()
		{
			if(this.on)
			{
				playSound("shatter");
				this.curSprite=1;
				this.aniRate=3;
				this.on=false;
				if(false)//(this.loot)
				{
				
				}else if(Math.random()*10>4)
				{
					var bmoke=3;
					if((miles.hp<miles.maxHp) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.Heart);
						return;
					}
					if((miles.has[hasID.Bow]) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.Arrow);
						return;
					}
					if((miles.has[hasID.Bomb]) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.BombRefill);
						return;
					}if((miles.mp<miles.maxMp) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.MagicJar);
						return;
					}else if((miles.mp<miles.maxMp) && (Math.random()*10>6))
					{
						makeObject(this.x,this.y,this.room,ObjectID.SmallJar);
						return;
					}
					var pojk=500+Math.floor(Math.random()*2);
					makeObject(this.x,this.y,this.room,pojk);
				}
			}
		}
		this.playerActivate=function(){};
	}else if (this.type==ObjectID.Bush) {
		this.bombable=true;
		this.hookable=false;
		this.offWalkable=true;
		this.swordActivate=function(){return true;};
		this.name="bush";
		this.pokable=true;
		this.on=true;
		this.playerUsable=false;
		this.drawOrder=4;
		this.aniRate=3;
		this.boomerangActivate=true;
		this.ignite=function()
		{
			playSound("burn");
			this.curSprite=1;
			this.on=false;
			this.drawOrder=1;
			this.hookable-false;
			
		}
		this.activate=function(rang)
		{
			if(this.on)
			{
				playSound("curtains");
				
				//this.aniRate=3;
				this.curSprite=1;
				var bumj= new explosionEffect(this.room);
				bumj.setup(this.x-1,this.y-2,this.room);
				bumj.numFrames=7;
				bumj.type=1;
				explosions.push(bumj);
				this.hookable=false;
				this.projPassable=true;
				this.drawOrder=1;
				this.on=false;
				if(false)//(this.loot)
				{
				
				}else if(Math.random()*10>4)
				{
					var bmoke=3;
					if((miles.hp<miles.maxHp) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.Heart);
						return;
					}
					if((miles.has[hasID.Bow]) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.Arrow);
						return;
					}
					if((miles.has[hasID.Bomb]) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.BombRefill);
						return;
					}if((miles.mp<miles.maxMp) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.MagicJar);
						return;
					}else if((miles.mp<miles.maxMp) && (Math.random()*10>6))
					{
						makeObject(this.x,this.y,this.room,ObjectID.SmallJar);
						return;
					}
					var pojk=500+Math.floor(Math.random()*2);
					makeObject(this.x,this.y,this.room,pojk);
				}
			}
		}
		this.playerActivate=function(rang) 
		{
			if((!miles.has[hasID.Sword]) &&(!rang))
			{	
				bConsoleBox.log("Can't cut bushes with out a sword.");
				playSound("error");
				return;
			}
			if(this.on)
			{
				playSound("curtains");
				this.curSprite=1;
				//this.aniRate=3;
				var bumj= new explosionEffect(this.room);
				bumj.setup(this.x-1,this.y-2,this.room);
				bumj.numFrames=7;
				bumj.type=1;
				this.hookable=false;
				this.projPassable=true;
				this.drawOrder=1;
				explosions.push(bumj);
				this.on=false;
				if(false)//(this.loot)
				{
				
				}else if(Math.random()*10>4)
				{
					var bmoke=3;
					if((miles.hp<miles.maxHp) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.Heart);
						return;
					}
					if((miles.has[hasID.Bow]) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.Arrow);
						return;
					}
					if((miles.has[hasID.Bomb]) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.BombRefill);
						return;
					}if((miles.mp<miles.maxMp) && (Math.random()*10<3))
					{
						makeObject(this.x,this.y,this.room,ObjectID.MagicJar);
						return;
					}else if((miles.mp<miles.maxMp) && (Math.random()*10>6))
					{
						makeObject(this.x,this.y,this.room,ObjectID.SmallJar);
						return;
					}
					var pojk=500+Math.floor(Math.random()*2);
					makeObject(this.x,this.y,this.room,pojk);
				}
			}
		}
	}else if (this.type==ObjectID.Curtains) {
		this.sprites=new Array(); //exception to the new rule.
		this.curSprite=1;
		this.on=true;
		this.offWalkable=true;
		this.orientation=0;
		this.swordActivate=function(){return true;};
		this.alwaysWalkable=true;//false;
//		console.log(this.x,this.y);
		if(this.y==1)
		{
			this.sprites.push(Sprite("curtainsopen0"));
			this.sprites.push(Sprite("curtains0"));
			this.width=64;
			this.height=44
			this.orientation=0;
		}else if(this.x==18)
		{
			this.sprites.push(Sprite("curtainsopen1"));
			this.sprites.push(Sprite("curtains1"));
			this.width=44;
			this.height=64
			this.orientation=1;
		}else if(this.y==13)
		{
			this.sprites.push(Sprite("curtainsopen2"));
			this.sprites.push(Sprite("curtains2"));
			this.width=64;
			this.height=44
			this.orientation=2;
		}else if(this.x==1)
		{
			this.sprites.push(Sprite("curtainsopen3"));
			this.sprites.push(Sprite("curtains3"));
			this.width=54;
			this.height=64
			this.orientation=3;
		}else
		{
			this.sprites.push(Sprite("curtainsopen0"));
			this.sprites.push(Sprite("curtains0"));
		}
		
	
		this.name="curtains";
		this.activate=function(){
			this.on=!this.on

			playSound("curtains");
			if(this.on)
			{
				
				this.curSprite= 1;
			}else
			{
				this.curSprite= 0;
			
			}
			if(this.hasSecret)
			{
				playSound("secret");
				this.exists=false;
				var pend=this.room.getSpecificDoor(this.x,this.y,this.orientation);
				if(pend){
					pend.on=false;
				}
			}
		}
		this.playerActivate=function(){
			if(this.on)
			{
				this.on=false;

				playSound("curtains");
				if(this.on)
				{
					
					this.curSprite= 1;
				}else
				{
					this.curSprite= 0;
				
				}
				if(this.hasSecret)
				{
					playSound("secret");
					this.exists=false;
					var pend=this.room.getSpecificDoor(this.x,this.y,this.orientation);
					if(pend){
						pend.on=false;
					}
				}
			}
		}
	}else if (this.type==ObjectID.WallShield) {
		this.sprites=new Array(); //exception
		this.curSprite=0;
		this.alwaysWalkable=true;
		if(this.y==1)
		{
			this.sprites.push(Sprite("wallshield0"));
			this.width=32;
			this.height=42;
		}else if(this.x==18)
		{
			this.sprites.push(Sprite("wallshield1"));
			this.width=42;
			this.height=32;
		}else if(this.y==13)
		{
			this.sprites.push(Sprite("wallshield2"));
			this.width=32;
			this.height=42;
		}else if(this.x==1)
		{
			this.sprites.push(Sprite("wallshield3"));
			this.width=42;
			this.height=32;
		}else
		{
			this.sprites.push(Sprite("wallshield0"));
		}
		
	
		this.name="Decorative shield";
		this.activate=function(){
			
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.EyeSwitch) {
		this.sprites=new Array(); //exception
		this.curSprite=1;
		this.on=true;
		this.hookable=false;
		this.arrowsActivate=true;
		this.projPossible=false;
		this.alwaysWalkable=true;
//		console.log(this.x,this.y);
		if(this.y==1)
		{
			this.sprites.push(Sprite("eyeswitch0"));
			this.sprites.push(Sprite("eyeswitch0"));
			this.width=32;
			this.height=32;
		}else if(this.x==18)
		{
			this.sprites.push(Sprite("eyeswitch1"));
			this.sprites.push(Sprite("eyeswitch1"));
			this.width=32;
			this.height=32;
		}else if(this.y==13)
		{
			this.sprites.push(Sprite("eyeswitch2"));
			this.sprites.push(Sprite("eyeswitch2"));
			this.width=32;
			this.height=32;
		}else if(this.x==1)
		{
			this.sprites.push(Sprite("eyeswitch3"));
			this.sprites.push(Sprite("eyeswitch3"));
			this.width=32;
			this.height=32;
		}
	
		this.name="Eye switch";
		this.activateEdit=function(){
			editor.mode=editModes.SwitchLink;
			editor.linkingFrom=this;
		}
		this.activate=function(){
			this.on=!this.on

			playSound("switchhit");
			if(this.on)
			{
				
				this.curSprite= 1;
			}else
			{
				this.curSprite= 0;
			
			}
	
			for(var i=0;i<this.dest.length;i++)
			{
				this.dest[i].activate();
				if(this.dest[i].room.z<this.room.z)
				{
					bConsoleBox.log("You hear a sound from below");
					playSound("switchhit");
				}else if(this.dest[i].room.z>this.room.z)
				{
					bConsoleBox.log("You hear a sound from above");
					playSound("switchhit");
				}else
				{
					if(this.dest[i].room.x<this.room.x)
					{
						bConsoleBox.log("You hear a sound from the west");
					}else if(this.dest[i].room.x>this.room.x)
					{
						bConsoleBox.log("You hear a sound from the east");
					}else if(this.dest[i].room.y<this.room.y)
					{
						bConsoleBox.log("You hear a sound from the north");
					}else if(this.dest[i].room.y>this.room.y)
					{
						bConsoleBox.log("You hear a sound from the south");
					}
				}
			}
		}
		this.playerActivate=function()
		{
			return; 
		}
	}else if (this.type==ObjectID.Peg) { 
	  	this.on=true;
		this.offWalkable=true;
		this.hookable=true;
		this.curSprite=0;
	    this.name="peg";
		this.drawOrder=2;
		this.activateEdit=function()
		{
			this.on=!this.on;
			if(this.on)
			{
				this.hookable=true;
				this.projPassable=false;
				this.curSprite=0;
				this.drawOrder=2;
			}else
			{
				this.hookable=false;
				this.projPassable=true;
				this.drawOrder=0;
				this.curSprite=1;
			}
		}
		this.playerActivate=function()
		{
			if(!miles.has[hasID.Hammer])
			{
				bConsoleBox.log("Only the hammer can destroy roadblocks!","yellow");
				playSound("error");
				return;
			}
			this.activate();
		}
		this.activate=function()
		{
			if(!this.on) {return;}
			
			this.on=false;
			playSound("hammerpost");
			if(this.on)
			{
				this.hookable=true;
				this.curSprite=0;
				this.drawOrder=3;
			}else
			{
				this.hookable=false;
				this.drawOrder=0;
				this.curSprite=1;
			}
		}
		
	}else if (this.type==ObjectID.BlueBlocker) { //blue blocker
		this.playerUsable=false;
		this.offWalkable=true;
		this.hookable=false;
		if(this.on)
		{
			this.curSprite=0;
			this.projPossible=false;
			this.projPassable=false;
		}else
		{
			this.curSprite=1;
			this.blockArrows=false;
			this.projPassable=true;
		}
	    this.name="Blue blocker thingy";
		this.activate=function()
		{
			this.on=!this.on;
			if(this.on)
			{
				this.curSprite=0;
				this.projPossible=false;
				this.projPassable=false;
			}else
			{
				this.curSprite=1;
				this.blockArrows=false;
				this.projPassable=true;
			}
		}
		this.activateEdit=this.activate;
		curDungeon.blueBlockers.push(this);
	}else if (this.type==ObjectID.RedBlocker) { //red blocker
		this.playerUsable=false;
		this.offWalkable=true;
		this.hookable=false;
		if(this.on)
		{
			this.curSprite=0;
			this.projPossible=false;
		}else
		{
			this.curSprite=1;
			this.blockArrows=false;
			this.projPassable=true;
		}
	    this.name="Red blocker thingy";
		this.activate=function()
		{
			this.on=!this.on;
			if(this.on)
			{
				this.curSprite=0;
				this.projPassable=false;
			}else
			{
				this.curSprite=1;
				this.blockArrows=false;
				this.projPassable=true;
			}
		}
		this.activateEdit=this.activate;
		curDungeon.redBlockers.push(this);
	}else if (this.type==ObjectID.BlueOrb) { //blue orb
	    this.name="Blue orb";
		this.bombable=true;
		this.projPossible=false;
		this.arrowsActivate=true;
		this.boomerangActivate=true;
		this.swordActivate=function(){return true;};
		this.cooldown=400;
		this.hookable=false;
		this.activate=function()
		{
			var npo=new Date().getTime();
			if(npo-this.lastActivated<this.cooldown)
			{
				return;
			}
			this.lastActivated=npo;
			playSound("orbhit");
		  //change all blue blockers ons
		  bConsoleBox.log("Blue barriers switched");
		  for(var i=0;i<curDungeon.blueBlockers.length;i++)
			{
				curDungeon.blueBlockers[i].activate();
				
			}
		}
		this.playerActivate=this.activate;
		this.playerUsable=false;
		if(OPTIONS.TouchableOrbs)
		{
			this.playerUsable=true
		}
	}else if (this.type==ObjectID.RedOrb) { //red orb
	    this.name="Red orb";
		this.bombable=true;
		this.hookable=false;
		this.projPossible=false;
		this.projPossible=false;
		this.arrowsActivate=true;
		this.boomerangActivate=true;
		this.swordActivate=function(){return true;};
		this.cooldown=400;
		this.playerUsable=false;
		
		this.activate=function()
		{
			var npo=new Date().getTime();
			if(npo-this.lastActivated<this.cooldown)
			{
				return;
			}
			this.lastActivated=npo;
			//this.on=!this.on; //is this even needed
			//change all red blockers ons.
			playSound("orbhit");
			bConsoleBox.log("Red barriers switched");
			for(var i=0;i<curDungeon.redBlockers.length;i++)
			{
				curDungeon.redBlockers[i].activate();
			}
		}
		this.playerActivate=this.activate;
		this.playerUsable=false;
		if(OPTIONS.TouchableOrbs)
		{
			this.playerUsable=true;
		}
	}else if (this.type==ObjectID.Warp) { //warp
		this.active=false;
		this.alwaysWalkable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=0;
		this.dest=null;
	    this.name="Warp tile";
		this.activate=function()
		{
			if(!this.active) {return;}
			if(this.dest)
			{
				playSound("warp");
				//I dunno warp or something?
			}
				
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.HeartContainer) {
		this.alwaysWalkable=true;
	    this.name="Heart container";
		this.pickupable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
			playSound("itemfanfare");
			bConsoleBox.log("You found a heart container!");
			miles.holding=this.sprites[0];
			this.exists=false;
			miles.maxHp+=20;
			miles.hp+=20;
			miles.heal(miles.maxHp);
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Feather) {
	    this.alwaysWalkable=true;
	    this.name="Roc's Feather";
		this.pickupable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
			if(miles.has[hasID.Feather])
			{
				playSound("item");
				bConsoleBox.log("You found another Roc's Feather! I guess you can sell it.");
				btext="You found another Roc's Feather! I guess you can sell it.";
				this.exists=false;
				return;
			}
			playSound("itemfanfare");
			bConsoleBox.log("You found the Roc's Feather! You can use it to jump.");
			btext="You found the Roc's Feather! You can use it to jump.";
			miles.holding=this.sprites[0];
			this.exists=false;
			miles.has[hasID.Feather]=true;
			miles.giveItem(this,1);
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Mirror) {
		this.alwaysWalkable=true;
	    this.name="Magic Mirror";
		this.pickupable=true;
		this.usable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
			if(miles.hasItem(ObjectID.Mirror))
			{
				playSound("item");
				bConsoleBox.log("You found another Mirror! This one doesn't seem to be magical though.");
				btext="You found another Mirror! This one doesn't seem to be magical though.";
				this.exists=false;
				return;
			}
			playSound("itemfanfare");
			bConsoleBox.log("You found a magic mirror. Use it to return to the start of the dungeon.");
			btext="You found another Mirror! This one doesn't seem to be magical though.";
			miles.holding=this.sprites[0];
			this.exists=false;
			//miles.has[hasID.Feather]=true;
			miles.giveItem(this,1);
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Shovel) {
	   	this.alwaysWalkable=true;
	    this.name="Shovel";
		this.pickupable=true;
		this.usable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
			playSound("itemfanfare");
			if(miles.hasItem(ObjectID.Shovel))
			{
				playSound("item");
				bConsoleBox.log("You found another shovel! It turns out they're really not that uncommon.");
				btext="You found another shove! it turns out they're really not that uncommon.";
				this.exists=false;
				return;
			}
			bConsoleBox.log("You found a shovel! Look for soft ground!");
			miles.holding=this.sprites[0];
			this.exists=false;
			//miles.has[hasID.Shovel]=true;
			miles.giveItem(this,1);
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Brick) {
	 	this.pushable=true;
		this.floating=false;
		this.drawOrder=2;
	    this.name="Moveable brick";
		this.playerUsable=false;
		this.activate=function(){};
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.StairsUp) {
	 	this.pushable=false;
		this.floating=true;
		this.drawOrder=0;
	    this.name="Stairs";
		this.alwaysWalkable=true;
		this.playerUsable=false;
		this.activate=function(){};
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.IceBlock) {
	 	this.pushable=true;
		this.floating=false;
		this.drawOrder=2;
		this.canLavaSwim=true;
	    this.name="Ice Block";
		this.flammable=true;
		this.playerUsable=false;
		this.activate=function()
		{
			this.curSprite=1;
			this.exists=false;
			this.xSmall=0;
			this.ySmall=0;
			this.room.tiles[this.x][this.y].data=DungeonTileType.FloorEighteen;
			floorDirty=true; 
			this.alwaysWalkable=true;
			this.pushable=false;
			this.drawOrder=0;
			playSound("sizzle");
			playSound("icemelt");
		};
		this.playerActivate=function(){};
	}else if (this.type==ObjectID.HolePlugger) {
		this.pushable=true;
		this.floating=true;
		this.on=false;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=2;
	    this.name="Hole Plugger";
		this.playerUsable=false;
		this.activate=function(){};
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.MasterSword)
	{
		this.alwaysWalkable=true;
	    this.name="Master sword";
		this.pickupable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
			if(!miles.has[hasID.MasterSword])
			{
				playSound("itemfanfare");
				bConsoleBox.log("You found the Master Sword!!");
				miles.holding=this.sprites[0];
				miles.swingSprites=masterSwingSprites;
				miles.pokeSprites=masterPokeSprites;
				miles.swordDamage=20;
			}else
			{
				playSound("item");
				bConsoleBox.log("Uhh, there's only one Master sword. this must be a forgery. You can probably still sell it on E-bay though.");
			}
			this.exists=false;
			miles.has[hasID.Sword]=true;
			miles.has[hasID.MasterSword]=true;
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Sword) {
			this.alwaysWalkable=true;
			this.name="Half-decent sword";
			this.pickupable=true;
			this.hookable=false;
			this.projPassable=true;
			this.drawOrder=3;
			this.activate=function()
			{
				if(this.buried){return;}
				if(!miles.has[hasID.Sword])
				{
					playSound("itemfanfare");
					bConsoleBox.log("You found a half-decent sword!");
					miles.holding=this.sprites[0];
				}else
				{
					playSound("item");
					bConsoleBox.log("You don't really need another half-decent sword.");
				}
				this.exists=false;
				miles.has[hasID.Sword]=true;
			}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Bow) {
		this.alwaysWalkable=true;
	    this.name="Bow and Arrows";
		this.usable=true;
		this.singular=false;
		this.pickupable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
			if(!miles.has[hasID.Bow])
			{
				playSound("itemfanfare");
				bConsoleBox.log("You found the Bow!");
				miles.holding=this.sprites[0];
			}else
			{
				playSound("item");
				bConsoleBox.log("You don't really need another bow, but you'll take the arrows!");
			}
			this.exists=false;
			miles.has[hasID.Bow]=true;
			miles.arrows+=10;
			miles.giveItem(this,10);
			
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Glove) {
		this.alwaysWalkable=true;
	    this.name="Power Glove";
		this.pickupable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
			if(!miles.has[hasID.Glove])
			{
				playSound("itemfanfare");
				bConsoleBox.log("You found the Power Glove! Now you can lift certain objects!");
				miles.holding=this.sprites[0];
			}else
			{
				playSound("item");
				bConsoleBox.log("You don't really need another glove. Oh wait, yeah you do! You have two hands! ");
			}
			this.exists=false;
			miles.has[hasID.Glove]=true;
			//miles.giveItem(this,1);
			
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Cane) {
		this.alwaysWalkable=true;
	    this.name="Cane of Somaria";
		this.pickupable=true;
		this.usable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
			if(!miles.hasItem(ObjectID.Cane))
			{
				playSound("itemfanfare");
				bConsoleBox.log("You found the Cane of Somaria!");
				miles.holding=this.sprites[0];
			}else
			{
				playSound("item");
				bConsoleBox.log("You don't really need another Cane of Somaria.");
			}
			this.exists=false;
			//miles.has[hasID.Cane]=true;
			miles.giveItem(this,1);
			
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Cape) {
		this.alwaysWalkable=true;
	    this.name="Magic Cape";
		this.pickupable=true;
		this.usable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
			if(!miles.hasItem(ObjectID.Cape))
			{
				playSound("itemfanfare");
				bConsoleBox.log("You found the Magic Cape!");
				miles.holding=this.sprites[0];
			}else
			{
				playSound("item");
				bConsoleBox.log("You don't really need another Magic Cape!");
			}
			this.exists=false;
			//miles.has[hasID.Cane]=true;
			miles.giveItem(this,1);
			
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.FireRod) {
		this.alwaysWalkable=true;
	    this.name="Fire Rod";
		this.pickupable=true;
		this.usable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
			if(!miles.hasItem(ObjectID.FireRod))
			{
				playSound("itemfanfare");
				bConsoleBox.log("You found the Fire Rod!");
				miles.holding=this.sprites[0];
			}else
			{
				playSound("item");
				bConsoleBox.log("You don't really need another Fire Rod.");
			}
			this.exists=false;
			//miles.has[hasID.Cane]=true;
			miles.giveItem(this,1);
			
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.IceRod) {
		this.alwaysWalkable=true;
	    this.name="Ice Rod";
		this.pickupable=true;
		this.usable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
			if(!miles.hasItem(ObjectID.IceRod))
			{
				playSound("itemfanfare");
				bConsoleBox.log("You found the Ice Rod!");
				miles.holding=this.sprites[0];
			}else
			{
				playSound("item");
				bConsoleBox.log("You don't really need another Ice Rod.");
			}
			this.exists=false;
			//miles.has[hasID.Cane]=true;
			miles.giveItem(this,1);
			
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Boomerang) {
		this.alwaysWalkable=true;
	    this.name="Boomerang";
		this.pickupable=true;
		this.usable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
			if(!miles.has[hasID.Boomerang])
			{
				playSound("itemfanfare");
				bConsoleBox.log("You found the Boomerang!");
				miles.holding=this.sprites[0];
			}else
			{
				playSound("item");
				bConsoleBox.log("You don't really need another boomerang. Unless one day it doesn't come back...");
			}
			this.exists=false;
			miles.has[hasID.Boomerang]=true;
			miles.giveItem(this,1);
			
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Flippers) {
		this.alwaysWalkable=true;
	    this.name="Flippers";
		this.pickupable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
			if(!miles.has[hasID.Flippers])
			{
				playSound("itemfanfare");
				bConsoleBox.log("You found the Flippers!");
				miles.holding=this.sprites[0];
			}else
			{
				playSound("item");
				bConsoleBox.log("You don't really need another pair of flippers.");
			}
			this.exists=false;
			miles.canSwim=true; 
			miles.has[hasID.Flippers]=true;
			//miles.giveItem(this,1);
			
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Mushroom) {
		this.alwaysWalkable=true;
	    this.name="mushroom";
		this.pickupable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
			playSound("itemfanfare");
			bConsoleBox.log("You found a mushroom!");
			miles.holding=this.sprites[0];
			this.exists=false;
			miles.has[hasID.Mushroom]=true;
			miles.giveItem(this,1);
			
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Boots) {
		this.alwaysWalkable=true;
	    this.name="Pegasus Boots";
		this.pickupable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
			if(!miles.has[hasID.Boots])
			{
				playSound("itemfanfare");
				bConsoleBox.log("You found some boots! Use them to dash!");
				miles.holding=this.sprites[0];
				miles.giveItem(this,1);
			}else
			{
				playSound("item");
				bConsoleBox.log("This pair of boots is actually slightly nicer than the pear you've been wearing! You swap them out.");
			}
			this.exists=false;
			miles.has[hasID.Boots]=true;
			//miles.giveItem(this,1);
			
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Hookshot) {
		this.alwaysWalkable=true;
	    this.name="Hookshot";
		this.pickupable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
			if(!miles.has[hasID.Hookshot])
			{
				playSound("itemfanfare");
				bConsoleBox.log("You found the Hookshot! Use it to cross large gaps.");
				miles.holding=this.sprites[0];
			}else
			{
				playSound("item");
				bConsoleBox.log("You don't really need another hookshot.");
			}
			this.exists=false;
			miles.has[hasID.Hookshot]=true;
			miles.giveItem(this,1);
			
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Ocarina) {
		this.alwaysWalkable=true;
	    this.name="Ocarina";
		this.pickupable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
			if(!miles.hasItem[ObjectID.Ocarina])
			{
				playSound("itemfanfare");
				bConsoleBox.log("You found an Ocarina! Play it to reset any room.");
				miles.holding=this.sprites[0];
			}else
			{
				playSound("item");
				bConsoleBox.log("You don't really need another Ocarina.");
			}
			this.exists=false;
			miles.giveItem(this,1);
			
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Lens) {
		this.alwaysWalkable=true;
	    this.name="Creepy Lens";
		this.pickupable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
			if(!miles.has[hasID.Lens])
			{
				playSound("itemfanfare");
				bConsoleBox.log("You found ..some weird magnifying glass!");
				miles.holding=this.sprites[0];
			}else
			{
				playSound("item");
				bConsoleBox.log("You don't really need another priceless ancient artifact.");
			}
			this.exists=false;
			miles.has[hasID.Lens]=true;
			//miles.giveItem(this,1);
			
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Bomb) {
		this.alwaysWalkable=true;
	    this.name="Bombs";
		this.pickupable=true;
		this.usable=true;
		this.singular=false;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}	
			if(!miles.has[hasID.Bomb])
			{
				bConsoleBox.log("You found your first bombs!");
				playSound("itemfanfare");
				miles.holding=this.sprites[0];
			}else
			{
				bConsoleBox.log("You found some bombs!");
				playSound("item");
			}
			this.exists=false;
			miles.has[hasID.Bomb]=true;
			miles.bombs+=5;
			miles.giveItem(this,5);
			if(miles.has[hasID.SuperBomb])
			{
				miles.getItem(ObjectID.Bomb).sprites=new Array();
				miles.getItem(ObjectID.Bomb).sprites.push(superbombsprite);
			}
			
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Lantern) {
		this.alwaysWalkable=true;
	    this.name="Lantern";
		this.playerUsable=true;
		this.pickupable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
			if(miles.has[hasID.Lantern])
			{
				playSound("item");
				this.exists=false;
				bConsoleBox.log("You don't really feel like carrying around another lantern.");
				btext="You don't really feel like carrying around another lantern.";
				return;
			}
			playSound("itemfanfare");
			bConsoleBox.log("You found the lantern. You can light torches with it.");
			btext="You found the lantern. You can light torches with it.";
			miles.holding=this.sprites[0];
			this.exists=false;
			miles.has[hasID.Lantern]=true;
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Hammer) {
		this.alwaysWalkable=true;
	    this.name="Hammer";
		this.pickupable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		this.activate=function()
		{
			if(this.buried){return;}
			if(miles.has[hasID.Hammer])
			{
				playSound("item");
				this.exists=false;
				bConsoleBox.log("You don't really feel like carrying around another hammer.");
				btext="You don't really feel like carrying around another hammer.";
				return;
			}
			playSound("itemfanfare");
			bConsoleBox.log("You found the hammer! You can hammer stuff!");
			btext="You found the hammer! You can hammer stuff!";
			miles.holding=this.sprites[0];
			this.exists=false;
			miles.has[hasID.Hammer]=true;
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Spikes) {
		this.alwaysWalkable=true;
		this.on=true;
		this.name="Spikes";
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=2;
		this.activate=function()
		{
			this.on=!this.on;
			if(this.on)
			{
				this.curSprite=0;
			}else
			{
				this.curSprite=1;
			}
			//miles.hurt(5);
			
		}
		this.activateEdit=this.activate;
		this.playerActivate=function()
		{
			//do nothing.
		}
	}else if (this.type==ObjectID.Triforce) {
		this.alwaysWalkable=true;
		this.pickupable=true;
		this.aniRate=5;
		this.curSprite=1;
		this.active=true;
		this.width=64;
		this.height=64;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
	    this.name="Triforce";
		this.activate=function()
		{
			//change music
			//temp!
			if(Krugman)
			{
				Krugman.textBank.push("Nice, you found a shiny triangle. We're still stuck down here you know.");
				var hlop=function(){return true;}
				Krugman.textConditions.push(hlop);
			}
			playSound("heartcontainer");
			var now=new Date().getTime();
			var timeTaken=now-curDungeon.timeStarted.getTime();
			var arecord=false;
			var difference=0
			//this.x-=1;
			//this.y-=1;
			//pickup thing
			//miles.holding=this.sprites[0];
			if(timeTaken<curDungeon.bestTime)
			{
				arecord=true;
				difference=(curDungeon.bestTime-timeTaken)/1000;
			}
			var secsTaken=timeTaken/1000;//now it's in seconds.
			var mancy=new textbox();
			this.exists=false;
			mancy.setup();
			mancy.x=240;
			mancy.y=100;
			//mancy.width=210;
			mancy.textLim=104;
			if(curDungeon.hasEdited)
			{
				mancy.log("Congratulations! You have found the tri-force and beaten this dungeon! It took you "+secsTaken+" seconds, but you used edit mode. Hit Y to exit.");
			}else
			{
				if(arecord)
				{
					if(curDungeon.bestTime>998000)
					{
						mancy.log("Congratulations! You have found the tri-force and beaten this dungeon! It took you "+secsTaken+" seconds, a new record!. Hit Y to exit.");
					}else
					{
						mancy.log("Congratulations! You have found the tri-force and beaten this dungeon! It took you "+secsTaken+" seconds, beating the old record by "+difference+" seconds!. Hit Y to exit.");
					}
					
					curDungeon.bestTime=timeTaken;
					bConsoleBox.log("New record!","yellow"); 
					var smoth="Dungeon/dungeons/"+curDungeon.name+"/score.txt";
					$.post("/save/", {"data": timeTaken, "path": smoth}).done(function(response) { bConsoleBox.log("Saved " +smoth); });
					
				}else
				{
					mancy.log("Congratulations! You have found the tri-force and beaten this dungeon! It took you "+secsTaken+" seconds. The current record is "+curDungeon.bestTime/1000+" seconds. Hit Y to exit.");
				}
			}
			mancy.hasFocus=true;
			buttons.push(mancy);
			editor.confirming=true;
			editor.confirmingWhat=function() {
				editor.penDown=false;
				if(editor.confirming)
				{
					editor.clearConfirm();
				}
				//bullshitHack=true;
				$.post("/listdir/", {"path": "C:/JS/Dungeon/dungeons/"}, function(resp)
				 {
					var tempExistingDungeons=resp.split(",");
					tempExistingDungeons.splice(0,1);
					for(var i=0;i<tempExistingDungeons.length;i++)
					{
						if(i%2)
						{
							LOAD_COUNTS.push(tempExistingDungeons[i]);
						}else
						{
							existingDungeons.push(tempExistingDungeons[i]);
						}
					}
				 } 
				 )
				mode=0;
				mancy.exists=false;
				document.getElementById("mainSong").pause();
			}
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.BombRefill) {
		this.alwaysWalkable=true;
	    this.name="Bombs";
		this.pickupable=true;
		this.floating=false;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		if((!OPTIONS.DropsPersist) && (!editMode))
		{
			this.timed=true;
			this.createdTime=new Date().getTime();
		}
		this.activate=function()
		{
			if(this.buried){return;}	
			if(OPTIONS.OverLog)
			{
				bCosoleBox.log("You found a bomb.");
			}
			playSound("item");
			this.exists=false;
			var shinex=new object();
			shinex.usable=true;
			shinex.type=ObjectID.Bomb;
			shinex.setup();
			miles.bombs+=1;
			miles.giveItem(shinex,1);
			if(miles.has[hasID.SuperBomb])
			{
				miles.getItem(ObjectID.Bomb).sprites=new Array();
				miles.getItem(ObjectID.Bomb).sprites.push(superbombsprite);
			}
			
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.MagicJar) {
	   	this.alwaysWalkable=true;
	    this.name="Magic Jar";
		this.pickupable=true;
		this.floating=false;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		if((!OPTIONS.DropsPersist) && (!editMode))
		{
			this.timed=true;
			this.createdTime=new Date().getTime();
		}
		this.activate=function()
		{
			if(this.buried){return;}	
			if(OPTIONS.OverLog)
			{
				bCosoleBox.log("You found a magic jar.");
			}
			playSound("item");
			this.exists=false;
			miles.recharge(30);
			
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.SmallJar) {
		this.alwaysWalkable=true;
	    this.name="Small Magic Jar";
		this.pickupable=true;
		this.floating=false;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		if((!OPTIONS.DropsPersist) && (!editMode))
		{
			this.timed=true;
			this.createdTime=new Date().getTime();
		}
		this.activate=function()
		{
			if(this.buried){return;}	
			if(OPTIONS.OverLog)
			{
				bCosoleBox.log("You found a small magic jar.");
			}
			playSound("item");
			this.exists=false;
			miles.recharge(10);
			
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Arrow) {
		this.alwaysWalkable=true;
	    this.name="Arrow";
		this.floating=false;
		this.pickupable=true;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		if((!OPTIONS.DropsPersist) && (!editMode))
		{
			this.timed=true;
			this.createdTime=new Date().getTime();
		}
		this.activate=function()
		{
			if(this.buried){return;}	
			if(OPTIONS.OverLog)
			{
				bConsoleBox.log("You found an Arrow.");
			}
			playSound("item");
			this.exists=false;
			var shinex=new object();
			shinex.usable=true;
			shinex.type=ObjectID.Bow;
			shinex.setup();
			miles.arrows+=1;
			miles.giveItem(shinex,1);
			
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Shell) {
		this.alwaysWalkable=true;
	    this.name="sea shell";
		this.pickupable=true;
		this.floating=false;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		if((!OPTIONS.DropsPersist)&& (!editMode))
		{
			//this.timed=true;
			//this.createdTime=new Date().getTime();
		}
		this.activate=function()
		{
			if(this.buried){return;}
			miles.holding=this.sprites[0];
			bConsoleBox.log("You found a secret seashell! If you collect enough of these, something good is bound to happen!");
			playSound("itemfanfare");
			this.exists=false;
			miles.shells++;
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Gold) {
		this.alwaysWalkable=true;
	    this.name="rupee";
		this.pickupable=true;
		this.floating=false;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		if((!OPTIONS.DropsPersist)&& (!editMode))
		{
			this.timed=true;
			this.createdTime=new Date().getTime();
		}
		this.activate=function()
		{
			if(this.buried){return;}
			if(OPTIONS.OverLog)
			{
				bConsoleBox.log("You found a rupee.");
			}
			playSound("coin");
			this.exists=false;
			miles.money+=1;
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Apple) {
		this.alwaysWalkable=true;
	    this.name="apple";
		this.pickupable=true;
		this.floating=false;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		if((!OPTIONS.DropsPersist)&& (!editMode))
		{
			this.timed=true;
			this.createdTime=new Date().getTime();
		}
		this.activate=function()
		{
			if(this.buried){return;}	
			bConsoleBox.log("You found an apple.");
			playSound("item");
			this.exists=false;
			miles.health+=20;
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.FiveGold) {
		this.alwaysWalkable=true;
	    this.name="rupee";
		this.pickupable=true;
		this.floating=false;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		if((!OPTIONS.DropsPersist)&& (!editMode))
		{
			this.timed=true;
			this.createdTime=new Date().getTime();
		}
		this.activate=function()
		{
			if(this.buried){return;}	
			if(OPTIONS.OverLog)
			{
				bConsoleBox.log("You found five rupees.");
			}
			playSound("coin");
			this.exists=false;
			miles.money+=5;
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.FiftyGold) {
		this.alwaysWalkable=true;
	    this.name="rupee";
		this.pickupable=true;
		this.floating=false;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		if((!OPTIONS.DropsPersist)&& (!editMode))
		{
			this.timed=true;
			this.createdTime=new Date().getTime();
		}
		this.activate=function()
		{
			if(this.buried){return;}	
			if(OPTIONS.OverLog)
			{
				bConsoleBox.log("You found fifty rupees!");
			}
			playSound("coin");
			this.exists=false;
			miles.money+=50;
		}
		this.playerActivate=this.activate;
	}else if (this.type==ObjectID.Heart) {
		this.alwaysWalkable=true;
	    this.name="heart";
		this.floating=false;
		this.hookable=false;
		this.projPassable=true;
		this.drawOrder=3;
		if((!OPTIONS.DropsPersist)&& (!editMode))
		{
			this.timed=true;
			this.createdTime=new Date().getTime();
		}
		this.pickupable=true;
		this.activate=function()
		{
			if(this.buried){return;}
			if(OPTIONS.OverLog)
			{
				bConsoleBox.log("You found a heart.");
			}
			//playSound("coin");
			this.exists=false;
			miles.heal(20);
		}
		this.playerActivate=this.activate;
	}
	else if (this.type==ObjectID.RumHam) {
		this.alwaysWalkable=true;
		
	    this.name="RUM HAM";
		this.floating=false;
		this.hookable=false;
		this.pickupable=true;
		this.projPassable=true;
		this.drawOrder=3;
		bConsoleBox.log("You found the Rum Ham!");
		//miles.holding=this.sprites[0];
		this.activate=function()
		{
			playSound("chant");
			miles.RumHam=true;
			miles.equippedTrack=0;
			miles.equippedTrack2=0;
			for(var i=0;i<29;i++)
			{	
				if((i!=ObjectID.Glove) &&(i!=ObjectID.Lens) &&(i!=ObjectID.Flippers) &&(i!=ObjectID.Sword) &&(i!=ObjectID.MasterSword) && (i!=ObjectID.Shield) && (i!=ObjectID.BetterShield)&& (i!=ObjectID.BestShield)&& (i!=ObjectID.Hammer)&& (i!=ObjectID.MagicBoomerang))
				{
					var shinex=new object();
					shinex.type=i;
					shinex.setup();
					miles.giveItem(shinex,99); 
				}
			}

			this.exists=false;
			
			
			miles.has[hasID.MasterSword]=false;
			miles.has[hasID.BestShield]=false;
			//miles.has[hasID.Boomerang]=false;
			//miles.has[hasID.MagicBoomerang]=false;
			//shinex.usable=true;
			
			var shinex=new object();
			shinex.type=ObjectID.MagicBoomerang;
			shinex.room=this.room;
			shinex.setup();
			shinex.activate();
			var shinex=new object();
			//shinex.usable=true;
			shinex.type=ObjectID.BestShield;
			shinex.room=this.room;
			shinex.setup();
			shinex.activate();
			var shinex=new object();
			//shinex.usable=true;
			shinex.type=ObjectID.MasterSword;
			shinex.room=this.room;
			shinex.setup();
			shinex.activate();
			var shinex=new object();
			//shinex.usable=true;
			shinex.type=ObjectID.SuperBomb;
			shinex.room=this.room;
			shinex.setup();
			shinex.activate();
			var shinex=new object();
			//shinex.usable=true;
			shinex.type=ObjectID.SilverArrow;
			shinex.room=this.room;
			shinex.setup();
			shinex.activate();
			
			var shinex=new object();
			shinex.type=ObjectID.PendantPower;
			shinex.room=this.room;
			shinex.setup();
			shinex.activate();
			
			var shinex=new object();
			shinex.type=ObjectID.PendantWisdom;
			shinex.room=this.room;
			shinex.setup();
			shinex.activate();
			
			var shinex=new object();
			shinex.type=ObjectID.PendantSwiftness;
			shinex.room=this.room;
			shinex.setup();
			shinex.activate();
			
			var shinex=new object();
			shinex.type=ObjectID.PendantFour;
			shinex.room=this.room;
			shinex.setup();
			shinex.activate();
			
			var shinex=new object();
			shinex.type=ObjectID.PendantFive;
			shinex.room=this.room;
			shinex.setup();
			shinex.activate();
			
			miles.holding=null;
			miles.canSwim=true;
			miles.maxHp=280;
			miles.heal(miles.maxHp);
			miles.getItem(ObjectID.Bomb).sprites=new Array();
			miles.getItem(ObjectID.Bomb).sprites.push(superbombsprite);
				for(var i=0;i<miles.has.length;i++)
			{	
				miles.has[i]=true;
			}
		}
		//miles.has all
		this.playerActivate=this.activate;
	}
}

object.prototype.activate=function()
{
	
}

object.prototype.activateEdit=function()
{
	//this.activate();
}
/*object.prototype.tileX=function()
{
	return Math.floor((this.x-xOffset)/32));
}
object.prototype.tileY=function()
{
	return Math.floor((this.x-xOffset)/32));
}*/
object.prototype.tryMove=function(dir)
	{
		if(dir==0)
		{
			if(this.y<3)
			{
				return false;
			}
			if(this.room.walkable(this.x,this.y-1,false,this))
			{
				//this.lastX=this.x;
				//this.lastY=this.y;
				this.y--;
			}else
			{
				return false;
			}
		}else if(dir==2)
		{
			if(this.y>12)
			{
				return false;
			}
			if(this.room.walkable(this.x,this.y+1,false,this))
			{
				//this.lastX=this.x;
				//this.lastY=this.y;
				this.y++;
			}else
			{
				return false;
			}
		}else if(dir==3)
		{
			if(this.x<3)
			{
				return false;
			}
			if(this.room.walkable(this.x-1,this.y,false,this))
			{
				//this.lastX=this.x;
				//this.lastY=this.y;
				this.x--;
			}else
			{
				return false;
			}
		}else if(dir==1)
		{
			if(this.x>17)
			{
				return false;
			}
			if(this.room.walkable(this.x+1,this.y,false,this))
			{
				//this.lastX=this.x;
				//this.lastY=this.y;
				this.x++;
			}else
			{
				return false;
			}
		}
		return true; 
	}
object.prototype.canMove=function(dir)
	{
		if(dir==0)
		{
			if(this.y<3)
			{
				return false;
			}
			if(!this.room.walkable(this.x,this.y-1,false,this))
			{
				return false;
			}else
			{
				return true;
			}
		}else if(dir==2)
		{
			if(this.y>12)
			{
				return false;
			}
			if(!this.room.walkable(this.x,this.y+1,false,this))
			{
				return false;
			}else
			{
				return true;
			}
		}else if(dir==3)
		{
			if(this.x<3)
			{
				return false;
			}
			if(!this.room.walkable(this.x-1,this.y,false,this))
			{
				return false;
			}else
			{
				return true;
			}
		}else if(dir==1)
		{
			if(this.x>16)
			{
				return false;
			}
			if(!this.room.walkable(this.x+1,this.y,false,this))
			{
				return false;
			}else
			{
				return true;
			}
		}
		return true; 
	}

object.prototype.slide=function(dir)
{
	if((dir==0))
	{
		this.ySmall--;
	}
	if((dir==1))
	{
		this.xSmall++;
	}
	if((dir==2))
	{
		this.ySmall++;
	}
	if((dir==3))
	{
		this.xSmall--;
	}
	var frankie=false;
	var temp_break=SMALL_BREAK;
	if(!this.canMove(2))
	{
		temp_break=SMALL_BREAK/2;
	}
	if(this.ySmall>temp_break)
	{
		if(this.canMove(2))
		{
			this.tryMove(2);
			this.ySmall=-SMALL_BREAK;
			frankie=true;
			
			
		}else
		{
			this.ySmall=temp_break;
			this.ya=0;
			this.yv=0;
			if(this.activateOnImpact)
			{
				this.activate();
			}
		}
	}
	temp_break=SMALL_BREAK;
	if(!this.canMove(0))
	{
		temp_break=SMALL_BREAK/2;
	}
	if(this.ySmall<-temp_break)
	{
		if(this.canMove(0))
		{
			this.ySmall=SMALL_BREAK;
			this.tryMove(0);
			frankie=true;
		}else
		{
			this.ySmall=-temp_break;
			this.ya=0;
			this.yv=0;
			if(this.activateOnImpact)
			{
				this.activate();
			}
		}
	}
	temp_break=SMALL_BREAK;
	if(!this.canMove(1))
	{
		temp_break=SMALL_BREAK/2;
	}
	if(this.xSmall>temp_break)
	{
		if(this.canMove(1))
		{
			this.xSmall=-SMALL_BREAK;
			this.tryMove(1);
			frankie=true;
		}else
		{
			this.xSmall=temp_break;
			this.xa=0;
			this.xv=0;
			if(this.activateOnImpact)
			{
				this.activate();
			}
		}
	}
	temp_break=SMALL_BREAK;
	if(!this.canMove(3))
	{
		temp_break=SMALL_BREAK/2;
	}
	if(this.xSmall<-temp_break)
	{
		if(this.canMove(3))
		{
			this.xSmall=SMALL_BREAK;
			this.tryMove(3);
			frankie=true;
		}else
		{
			this.xSmall=-temp_break;
			this.xa=0;
			this.xv=0;
			if(this.activateOnImpact)
			{
				this.activate();
			}
		}
	}
}
	
object.prototype.incMove=function()
{
	this.xSmall+=this.xv*2;
	this.ySmall+=this.yv*2;
	this.xv+=this.xa*2;
	this.yv+=this.ya*2;
	if(this.fallingY<1){
		if(this.xv>0)
		{
			this.xv-=this.friction/2;
			if(this.xv<0)
			{
				this.xv=0;
			}
		}else if(this.xv<0)
		{
			this.xv+=this.friction/2;
			if(this.xv>0)
			{
				this.xv=0;
			}
		}
	}else
	{
		if(this.xv>0)
		{
			this.xv-=this.friction/3;
			if(this.xv<0)
			{
				this.xv=0;
			}
		}else if(this.xv<0)
		{
			this.xv+=this.friction/3;
			if(this.xv>0)
			{
				this.xv=0;
			}
		}

	}
	if(this.yv>0)
	{
		this.yv-=this.friction/2;
		if(this.yv<0)
		{
			this.yv=0;
		}
	}else if(this.yv<0)
	{
		this.yv+=this.friction/2;
		if(this.yv>0)
		{
			this.yv=0;
		}
	}
	/*if(this.xa>0)
	{
		this.xa-=this.decel;
		if(this.xa<0)
		{
			this.xa=0;
		}
	}if(this.xa<0)
	{
		this.xa+=this.decel;
		if(this.xa>0)
		{
			this.xa=0;
		}
	}
	if(this.ya>0)
	{
		this.ya-=this.decel;
		if(this.ya<0)
		{
			this.ya=0;
		}
	}if(this.ya<0)
	{
		this.ya+=this.decel;
		if(this.ya>0)
		{
			this.ya=0;
		}
	}*/
	if(this.xv>this.peakXV)
	{
		this.xv=this.peakXV;
		this.xa=0;
	}
	if(this.yv>this.peakYV)
	{
		this.yv=this.peakYV;
		this.ya=0;
	}
	if(this.xv<-this.peakXV)
	{
		this.xv=-this.peakXV;
		this.xa=0;
	}
	if(this.yv<-this.peakYV)
	{
		this.yv=-this.peakYV;
		this.ya=0;
	}
	var frankie=false;
	var temp_break=SMALL_BREAK;
	if(!this.canMove(2))
	{
		temp_break=SMALL_BREAK/2;
	}
	if(this.ySmall>temp_break)
	{
		if(this.canMove(2))
		{
			this.ySmall=-SMALL_BREAK;
			this.tryMove(2);
			frankie=true;
			
		}else
		{
			this.ySmall=temp_break;
			this.ya=0;
			this.yv=0;
			if(this.activateOnImpact)
			{
				this.activate();
			}
		}
	}
	temp_break=SMALL_BREAK;
	if(!this.canMove(0))
	{
		temp_break=SMALL_BREAK/2;
	}
	if(this.ySmall<-temp_break)
	{
		if(this.canMove(0))
		{
			this.ySmall=SMALL_BREAK;
			this.tryMove(0);
			frankie=true;
		}else
		{
			this.ySmall=-temp_break;
			this.ya=0;
			this.yv=0;
			if(this.activateOnImpact)
			{
				this.activate();
			}
		}
	}
	temp_break=SMALL_BREAK;
	if(!this.canMove(1))
	{
		temp_break=SMALL_BREAK/2;
	}
	if(this.xSmall>temp_break)
	{
		if(this.canMove(1))
		{
			this.xSmall=-SMALL_BREAK;
			this.tryMove(1);
			frankie=true;
		}else
		{
			this.xSmall=temp_break;
			this.xa=0;
			this.xv=0;
			if(this.activateOnImpact)
			{
				this.activate();
			}
		}
	}
	temp_break=SMALL_BREAK;
	if(!this.canMove(3))
	{
		temp_break=SMALL_BREAK/2;
	}
	if(this.xSmall<-temp_break)
	{
		if(this.canMove(3))
		{
			this.xSmall=SMALL_BREAK;
			this.tryMove(3);
			frankie=true;
		}else
		{
			this.xSmall=-temp_break;
			this.xa=0;
			this.xv=0;
			if(this.activateOnImpact)
			{
				this.activate();
			}
		}
	}
	if((this.fallingY<1) && (!this.floating) &&(this.room.tiles[this.x][this.y].data>19) && (this.room.tiles[this.x][this.y].data<24))
	{
		this.underWater=true;
	}
	if((this.fallingY<1) && (!this.floating)&& (this.type!=ObjectID.IceBlock) &&(this.room.tiles[this.x][this.y].data>23) && (this.room.tiles[this.x][this.y].data<28))
	{
		this.exists=false;
		playSound("burn");
	}
	if(this.flame)
	{
		this.flame.x=this.x*32+xOffset+this.xSmall;
		this.flame.y=this.y*32+yOffset-16+this.ySmall;
		this.flame.flare.x=this.x*32+xOffset+this.xSmall;
		this.flame.flare.y=this.y*32+yOffset-16+this.ySmall;
		if(this.type==ObjectID.TallLamp)
		{
			this.flame.y=this.y*32+yOffset-36+this.ySmall;
			this.flame.flare.y=this.y*32+yOffset-36+this.ySmall;
		}
	}
	return frankie;
}

object.prototype.changeRoom=function(dz,dx,dy)
{
	for (var i=0;i<this.room.objects.length;i++)
	{
		if(this.room.objects[i].ID==this.ID)
		{
			this.room.objects.splice(i,1);
			i--;
		}
	}
	this.room=curDungeon.rooms[dz][dx][dy];
	this.room.objects.push(this);
}

object.prototype.update=function()
{
	if(this.fallingUp>0)
	{
		this.fallingY+=1;
		this.fallingUp-=1;
		if(this.fallingUp<1)
		{
			this.hurty=true;
		}
	}else if(this.fallingY>0)
	{
		this.fallingY-=4;
		if((this.type==ObjectID.StairsUp) && (this.hidden)&& (this.torchActivate))
		{
			var numyl=0;
			var numisl=0;
			for(var i=0;i<this.room.objects.length;i++)
			{
				
				if((this.room.objects[i].type==ObjectID.Lamp) || (this.room.objects[i].type==ObjectID.TallLamp) || (this.room.objects[i].type==ObjectID.Candle))
				{
					numyl++;
					if(this.room.objects[i].on)
					{
						numisl++;
					}
				}
			}
			if(numisl>numyl-1)
			{
				this.activate();
			}
		}
		if(this.fallingY<1)
		{
			if((this.type!=ObjectID.SpikeyThing) && (this.type!=ObjectID.Cactus))
			{
				this.hurty=false;
			}
			if((this.room.tiles[this.x][this.y].data>19) && (this.room.tiles[this.x][this.y].data<24))
			{
				playSound("splash");
				var bumj= new explosionEffect(this.room);
				bumj.setup(this.x,this.y,this.room,this,2);
				explosions.push(bumj);
				this.underWater=true;
				this.xv=0;
				this.yv=0;
				this.xa=0;
				this.ya=0; 
			}
			this.fallingY=0;
	
			if((!this.floating)&& (this.room.isHole(this.x,this.y)))
			{
				playSound("itemfall");
				if((this.room.z>0) && (curDungeon.rooms[this.room.z-1][this.room.x][this.room.y].active) && (this.room.tiles[this.x][this.y].data!=DungeonTileType.DeathHole))
				{
					//this.room=curDungeon.rooms[this.room.z-1][this.room.x][this.room.y];
					this.changeRoom(this.room.z-1,this.room.x,this.room.y);
					this.fallingY=150;
					this.xSmall=0;
					this.ySmall=0;
				}else
				{
					this.exists=false;
				}
			}else
			{
				if(this.activateOnImpact) 
				{
					if(!this.underWater)
					{
						this.xv=0;
						this.yv=0;
						this.xa=0;
						this.ya=0;
						this.activate();
					}else
					{
						this.exists=false
					}
				}
			}			
		}
		
	}else if((!this.floating) &&(this.room.isHole(this.x,this.y)))
	{
		playSound("itemfall");
		if((this.room.z>0) && (curDungeon.rooms[this.room.z-1][this.room.x][this.room.y].active) && (this.room.tiles[this.x][this.y].data!=DungeonTileType.DeathHole))
		{
			//this.room=curDungeon.rooms[this.room.z-1][this.room.x][this.room.y];
			this.changeRoom(this.room.z-1,this.room.x,this.room.y);
			this.fallingY=150;
			//???
			this.xSmall=0;
			this.ySmall=0;
		}else
		{
			this.exists=false;
		}
	}
	if((!this.on) && (this.type==ObjectID.HolePlugger) && (this.room.isHole(this.x,this.y)))
	{
		this.on=true;
		this.curSprite=1;
		this.pushable=false;
		playSound("arrowhit");
		this.xSmall=0;
		this.ySmall=0;
		this.drawOrder=0;
		this.room.tiles[this.x][this.y].data=DungeonTileType.GreenFloor;
	}
	if((this.fallingY<1) && (!this.floating)&& (this.type!=ObjectID.IceBlock) &&(this.room.tiles[this.x][this.y].data>23) && (this.room.tiles[this.x][this.y].data<28))
	{
		this.exists=false;
		playSound("burn");
	}
	if(((this.type==ObjectID.Lamp) || (this.type==ObjectID.TallLamp))&&(this.on))
	{
		this.flame.update();
	}
	if((this.type==ObjectID.IceBlock) && (this.room.tiles[this.x][this.y].data>23) && (this.room.tiles[this.x][this.y].data<28))
	{
		this.activate();
	}
	if(this.type==ObjectID.HoldSwitch) 
	{
		var ison=false;
		for(var i=0;i<entities.length;i++)
		{
			if((entities[i].room.z==this.room.z) && (entities[i].room.x==this.room.x) && (entities[i].room.y==this.room.y))
			{
				if((entities[i].x==this.x) && (entities[i].y==this.y) && (entities[i].fallingY<5))
				{
					ison=true;
				}
			}
		}
		
		//todo objects!
		for(var i=0;i<this.room.objects.length;i++)
		{
				if((this.room.objects[i].x==this.x) && (this.room.objects[i].y==this.y) && (this.room.objects[i].fallingY<5) && (this.room.objects[i].ID!=this.ID))
				{
					ison=true;
				}
		}
		
		if((this.on) && (!ison))
		{
			playSound("switch");
			this.on=false;
			this.curSprite=0;
			for(var i=0;i<this.dest.length;i++){
				this.dest[i].activate();
				if(this.dest[i].room.z<this.room.z)
				{
					bConsoleBox.log("You hear a sound from below");
					playSound("switchhit");
				}else if(this.dest[i].room.z>this.room.z)
				{
					bConsoleBox.log("You hear a sound from above");
					playSound("switchhit");
				}else
				{
					if(this.dest[i].room.x<this.room.x)
					{
						bConsoleBox.log("You hear a sound from the west");
					}else if(this.dest[i].room.x>this.room.x)
					{
						bConsoleBox.log("You hear a sound from the east");
					}else if(this.dest[i].room.y<this.room.y)
					{
						bConsoleBox.log("You hear a sound from the north");
					}else if(this.dest[i].room.y>this.room.y)
					{
						bConsoleBox.log("You hear a sound from the south");
					}
				}
			}
		}else if((!this.on) && (ison))
		{
			playSound("switch");
			this.on=true;
			this.curSprite=1;
			for(var i=0;i<this.dest.length;i++){
				this.dest[i].activate();
				if(this.dest[i].room.z<this.room.z)
				{
					bConsoleBox.log("You hear a sound from below");
					playSound("switchhit");
				}else if(this.dest[i].room.z>this.room.z)
				{
					bConsoleBox.log("You hear a sound from above");
					playSound("switchhit");
				}else
				{
					if(this.dest[i].room.x<this.room.x)
					{
						bConsoleBox.log("You hear a sound from the west");
					}else if(this.dest[i].room.x>this.room.x)
					{
						bConsoleBox.log("You hear a sound from the east");
					}else if(this.dest[i].room.y<this.room.y)
					{
						bConsoleBox.log("You hear a sound from the north");
					}else if(this.dest[i].room.y>this.room.y)
					{
						bConsoleBox.log("You hear a sound from the south");
					}
				}
			}
		}
	}
	if(((this.type==ObjectID.Warp) ||(this.type==ObjectID.Triforce) ) && (this.active))
	{
		this.ani++;
		if(this.ani>this.aniRate)
		{
			this.ani=0;
			this.curSprite++
			if(this.curSprite>this.sprites.length-1)
			{
				this.curSprite=1;
			}
		}
	}
	
	if(this.type==ObjectID.SpikeyThing)
	{
		if((this.returning)&&(this.x==this.homeX) && (this.y==this.homeY) && (this.xSmall<4) &&(this.ySmall<4))
		{
			this.returning=false;
			this.triggeredX=false;
			this.triggeredY=false;
			this.xv=0;
			this.yv=0;
			this.xa=0;
			this.ya=0;
			this.xSmall=0;
			this.ySmall=0;
			//console.log("home");
		}
		if(this.returning)
		{
			
			if(this.y==this.homeY)
			{
				if(this.homeX>this.x)
				{
					this.xv=1;
				}else if(this.homeX<this.x)
				{
					this.xv=-1;
				}
			}else if(this.x==this.homeX)
			{
				if(this.homeY>this.y)
				{
					this.yv=1;
				}else if(this.homeY<this.y)
				{
					this.yv=-1;
				}
			}
		}else if(this.triggeredY)
		{
			if((this.room.objectWillBlock(this)) || ((this.x<3)&&(this.xSmall<-4)) ||((this.x>16)&&(this.xSmall>4))|| (this.x==this.targX))
			{
				if((this.room.name==miles.room.name) && (this.room.z==miles.room.z))
				{
					playSound("chink");
				}
				this.triggeredY=false;
				this.triggeredX=false;
				this.returning=true;
				this.triggeredX=false;
				this.triggeredY=false;
				this.xv=0;
				this.yv=0;
				this.xa=0;
				this.ya=0;
				this.targX=this.homeX;
				this.targY=this.homeY;
				this.xSmall=0;
				this.ySmall=0;
				return;
			}
			if((this.y==this.homeY))
			{
				if(this.targX>this.x)
				{
					this.xv=Spikey_Vel;
				}else if(this.targX<this.x)
				{
					this.xv=-Spikey_Vel;
				}else
				{
					this.xv=0;
				}
			}
			
		}else if(this.triggeredX)
		{
			if((this.room.objectWillBlock(this))|| ((this.y<3)&&(this.ySmall<-4)) ||((this.y>11) && (this.ySmall>4)) || (this.y==this.targY))
			{
				if((this.room.name==miles.room.name) && (this.room.z==miles.room.z))
				{
					playSound("chink");
				}
				this.triggeredX=false;
				this.triggeredY=false;
				this.returning=true;
				this.triggeredX=false;
				this.triggeredY=false;
				this.xv=0;
				this.yv=0;
				this.xa=0;
				this.ya=0;
				this.targX=this.homeX;
				this.targY=this.homeY;
				this.xSmall=0;
				this.ySmall=0;
				return;
			}
			if((this.x==this.homeX))
			{
				if(this.targY>this.y)
				{
					this.yv=Spikey_Vel;
				}else if(this.targY<this.y)
				{
					this.yv=-Spikey_Vel;
				}else
				{
					this.yv=0;
				}
			}
		}else
		{
			for(var i=0;i<entities.length;i++)
			{
				if((entities[i].room.z==this.room.z) && (entities[i].room.x==this.room.x) &&(entities[i].room.y==this.room.y)&&(!entities[i].invisible))
				{
					if(entities[i].x==this.x)
					{
						if(entities[i].y>this.y)
						{
							this.dir=2;
							this.targY=this.y+12;
						}else
						{
							this.dir=0;
							this.targY=this.y-12;
						}
						this.triggeredX=true;
						break;
					}
					if(entities[i].y==this.y)
					{
						if(entities[i].x>this.x)
						{
							this.dir=1;
							this.targX=this.x+18;
						}else
						{
							this.dir=3;
							this.targX=this.x-18;
						}
						this.triggeredY=true;
						break;
					}
				}
			}
		}
	}
	if(this.type!=ObjectID.Brick)
	{
		this.incMove();
	}
	
	if((this.type==ObjectID.TallLamp)  && (this.on))
	{
		this.ani++;
		if(this.ani>this.aniRate)
		{
			this.ani=0;
			this.curTopSprite++;
			if(this.curTopSprite>this.topLayer.length-1)
			{
				this.curTopSprite=1;
			}
			//console.log(this.curTopSprite);
		}
	}
	if((this.shatters)&&(this.curSprite>0))
	{
		this.ani++;
		if(this.ani>this.aniRate)
		{
			this.ani=0;
			this.curSprite++
			if(this.curSprite>this.sprites.length-1)
			{
				this.curSprite=0;
				this.exists=false;
			}
		}
	}
	if(this.timed)
	{
		var knuc=new Date().getTime();
		if(knuc-this.createdTime>this.persistTime*1000)
		{
			this.exists=false;
		}
	}
}

object.prototype.drawTop=function(can,cam,xOffh,yOffh)
{
	
	if(this.timed)
	{
		var knuc=new Date().getTime();
		if(knuc-this.createdTime>(this.persistTime-3)*1000)
		{
			if(knuc%2==0)
			{
				return;
			}
		}
	}
	if((this.hidden) ||(this.underWater)||(this.buried))
	{
		if((miles.has[hasID.Lens]) || (editMode))
		{
			can.globalAlpha=0.5;
		}else
		{
			return;
		}
	}
	if(!xOffh) {xOffh=0;}
	if(!yOffh) {yOffh=0;}
	if((this.type==ObjectID.TallLamp) && (this.on))
	{
		if((this.room.x==curDungeon.roomX)&& (this.room.y==curDungeon.roomY))
		{
			//draw fire?
			//this.flame.draw(can,cam,xOffh+this.xSmall,yOffh-32+this.ySmall-this.fallingY*2);
		}else
		{
			//this.flame.sprites[this.flame.aniTrack].draw(can, this.x*32+xOffh+this.xSmall, (this.y-1)*32+yOffh-16+this.ySmall-this.fallingY*2);
		}
	}
	if(!this.on)
	{
		this.curTopSprite=0;
	}
	this.topLayer[this.curTopSprite].draw(can, this.x*32+xOffh+this.xSmall, (this.y-1)*32+1+yOffh+this.ySmall-this.fallingY*2);
	can.globalAlpha=1;
}
object.prototype.draw=function(can,cam,xOffh,yOffh,special)
{
	if((this.type==ObjectID.Bush) &&(!this.on) && (this.room.tiles[this.x][this.y].data==DungeonTileType.Hole))
	{
		return;
	}
	if(this.timed)
	{
		var knuc=new Date().getTime();
		if(knuc-this.createdTime>(this.persistTime-5)*1000)
		{
			if(knuc%2==0)
			{
				return;
			}
		}
	}
	if((this.hidden) ||(this.underWater)||(this.buried))
	{
		if((miles.has[hasID.Lens]) || (editMode))
		{
			can.globalAlpha=0.5;
		}else
		{
			return;
		}
	}
	if((this.type==ObjectID.Bush) &&(!this.on) && (this.room.tiles[this.x][this.y].data==DungeonTileType.Hole))
	if(!xOffh) {xOffh=0;}
	if(!yOffh) {yOffh=0;}
	if(this.fallingY>0)
	if(special!="no shadow")
	{
		shadowSprite[0].draw(can, this.x*32+xOffh+this.xSmall, this.y*32+yOffh+this.ySmall);
	}
	this.sprites[this.curSprite].draw(can, this.x*32+xOffh+this.xSmall, this.y*32+yOffh+this.ySmall-this.fallingY*2);
	//this.sprite.draw(can, this.x*32+xOffset, this.y*32+yOffset);
	if((this.type==ObjectID.Lamp) && (this.on))
	{
		if((this.room.x==curDungeon.roomX)&& (this.room.y==curDungeon.roomY))
		{
			//draw fire?
			this.flame.draw(can,cam,xOffh+this.xSmall,yOffh+this.ySmall-this.fallingY*2);
		}else
		{
			this.flame.sprites[this.flame.aniTrack].draw(can, this.x*32+xOffh+this.xSmall, this.y*32+yOffh-16+this.ySmall-this.fallingY*2);
		}
	}else if(this.type==ObjectID.Chest)
	{
		can.globalAlpha=1;
		if ((this.messagebox) && (this.messagebox.exists) && (this.loot>19) && (this.loot!=505) && ((this.loot<400) || (this.loot>407)) )
		{
			objectSprites[this.loot][0].draw(can, this.x*32+xOffh+this.xSmall, this.y*32+yOffh-20+this.ySmall-this.fallingY*2);
		}
	}
	can.globalAlpha=1;
}

object.prototype.linkToAllSpikes=function()
{
	this.dest=new Array();
	for(i=0;i<this.room.objects.length;i++)
	{
		if(this.room.objects[i].type==ObjectID.Spikes)
		{
			this.dest.push(this.room.objects[i]);
		}
	}
	
}

object.prototype.stringify=function()
{
	var tempstring= "";
	tempstring+=this.x;
	tempstring+=";";
	tempstring+=this.y;
	tempstring+=";";
	tempstring+=this.type;
	tempstring+=";";
	tempstring+=this.hidden;
	tempstring+=";";
	tempstring+=this.buried;
	if(this.type==ObjectID.Sign)
	{
		tempstring+=";";
		tempstring+=this.text;
	}else if(this.type==ObjectID.Chest)
	{
		tempstring+=";";
		tempstring+=this.loot;
	}else if(this.type==ObjectID.Lamp)
	{
		tempstring+=";";
		tempstring+=this.on;
	}else if(this.type==ObjectID.Curtains)
	{
		tempstring+=";";
		tempstring+=this.hasSecret;
	}else if((this.type==ObjectID.BlueBlocker) || (this.type==ObjectID.RedBlocker))
	{
		tempstring+=";";
		tempstring+=this.on;
	}else if ((this.type==ObjectID.ToggleSwitch) || (this.type==ObjectID.HoldSwitch)|| (this.type==ObjectID.EyeSwitch))
	{
		tempstring+=";";
		tempstring+=this.dest.length;
		for(var i=0;i<this.dest.length;i++)
		{
			tempstring+=";";
			tempstring+=this.dest[i].room.z;
			tempstring+=";";
			tempstring+=this.dest[i].room.x;
			tempstring+=";";
			tempstring+=this.dest[i].room.y;
			tempstring+=";";
			tempstring+=this.dest[i].x;
			tempstring+=";";
			tempstring+=this.dest[i].y;
			tempstring+=";";
			tempstring+=this.dest[i].type;
			tempstring+=";";
			tempstring+=this.dest[i].ctype;
		}
	}
	return tempstring;
}


function makeObject(x,y,broom,t,par)
{
	var pleb=new object(broom);
	if(!t){t=0;}
	if(!par){par=0;}
	pleb.type=t;
	if(pleb.type==ObjectID.Chest)
	{
		pleb.loot=Math.floor(Math.random()*numLoots);
	}
	pleb.x=x;
	pleb.y=y;
	pleb.setup(t,par);
	broom.objects.push(pleb);
	return pleb;
}
