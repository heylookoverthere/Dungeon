var ProjTypes={}
ProjTypes.Arrow=0;
ProjTypes.Boomarang=1;

var xOffset = 150;
var yOffset= 150;

var arrowsprite=Sprite("arrow");



var boomarangsprite1=Sprite("boomarang");
var boomarangsprite2=Sprite("boomarang1");
function projectile(aPlayer)
{
	this.x=aPlayer.x*32-16;
	this.y=aPlayer.y*32-16;
	this.player=aPlayer;
	this.team=aPlayer.team;
	this.xv=0;
	this.yv=0; 
	this.type=0;
	this.angle=0;
	this.width=32;
	this.height=32;
	this.counter=0;
	this.exists=false;
	this.smart=true; // tracks player on return
	this.damage=20; 
	this.stun=false;
	this.startTime=0;
	this.curSprite=0;
	this.aniTrack=0;
	this.aniRate=2;
	this.peakTime=750;
	this.hitWall=false; 
	this.boomarang=false; // will it return
	this.returning=false;
	this.speed=1;
	this.sprites=new Array();
	
}

projectile.prototype.setup=function(type)
{
	this.type=type;
	this.startTime=new Date().getTime();
	if(this.type==0)
	{
		this.sprites.push(arrowsprite);
	}else if(this.type==1)
	{
		this.sprites.push(boomarangsprite1);
		this.sprites.push(boomarangsprite2);
	}

}

projectile.prototype.draw=function(can)
{
	
	if(this.type==0)
	{
		can.save();
		can.translate(this.x+16+xOffset,this.y+16+yOffset);
		can.rotate((this.angle-90)* (Math.PI / 180));
		this.sprites[this.curSprite].draw(can, 0,0);//this.x+xOffset, this.y+yOffset);
		//can.scale(1,1);
		can.restore();
	}else if(this.type==1)
	{
		can.save();
		can.translate(this.x+16+xOffset,this.y+16+yOffset);
		can.rotate((this.counter)* (Math.PI / 180));
		this.sprites[0].draw(can, 0,0);//this.x+xOffset, this.y+yOffset);
		//can.scale(1,1);
		can.restore();
	}
}

projectile.prototype.hit=function(obj)
{
	if((this.x < obj.getScreenX()+obj.width) && (this.x+this.width>obj.getScreenX()) && (this.y<obj.getScreenY()+obj.height) && (this.y+this.height>obj.getScreenY()))
	{
		return true;
	}
	return false;
}

projectile.prototype.update=function() //remember, this one's X,Y shoudl not be tile based!!! 
{
	var hoat=new Date().getTime();
	if((this.type==1) && (hoat-this.startTime>this.peakTime))
	{
		if(this.returning==false)
		{
			this.returning=true;
			this.startTime=hoat;
			if(this.smart)
			{
				var beta=Math.atan2(this.player.getScreenY()-this.y,this.player.getScreenX()-this.x)* (180 / Math.PI);
				if (beta < 0.0)
					beta += 360.0;
				else if (beta > 360.0)
					beta -= 360;
					this.angle=beta;
					this.xv=Math.cos((Math.PI / 180)*Math.floor(this.angle));
					this.yv=Math.sin((Math.PI / 180)*Math.floor(this.angle));
			}
		}else if(!this.smart)
		{
			this.exists=false;
		}
		
		
	}
	//update position based on...? see space game!
	if(this.returning)
	{
		//again, use angles and shit to move back to tosser.
       //but bear in mind tilex vs screenx.
	   if(this.smart)
	   {

		var beta=Math.atan2(this.player.getScreenY()-this.y,this.player.getScreenX()-this.x)* (180 / Math.PI);
		if (beta < 0.0)
			beta += 360.0;
		else if (beta > 360.0)
			beta -= 360;
			this.angle=beta;
			this.xv=Math.cos((Math.PI / 180)*Math.floor(this.angle));
			this.yv=Math.sin((Math.PI / 180)*Math.floor(this.angle));

		this.x+=this.xv*this.speed*gameSpeed;
		this.y+=this.yv*this.speed*gameSpeed;
		if(this.hit(this.player))
		{
			this.exists=false;
			return;
		}
			
	   }else
	   {
	   	this.x-=this.xv*this.speed*gameSpeed;
		this.y-=this.yv*this.speed*gameSpeed;
	   }
	}else
	{
		//away from tosser along angle. 
		this.x+=this.xv*this.speed*gameSpeed;
		this.y+=this.yv*this.speed*gameSpeed;
	}
	
	this.counter+=10;
	if(this.counter>359)
	{
		this.counter=0;
	}
	
	this.aniTrack++;
	if (this.aniTrack>this.aniRate)
	{
		this.aniTrack=0;
		this.curSprite++;
		if(this.curSprite>this.sprites.length-1)
		{
			this.curSprite=0;
		}
	}
	
	for(var i=0;i<entities.length;i++)
	{
		if(this.hit(entities[i]))
		{
			if(this.type==0)
			{
				playSound("arrowhit");
				this.exists=false; //todo, link it to target so it moves with him stuck in him for  abit?
			}
			if((this.team!=entities[i].team) || (OPTIONS.FriendlyFire))
			{
				entities[i].hurt(this.damage);
			}
		}
	}
	
	//check collision with all objects. some may block, some may activate
}
