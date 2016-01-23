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
	this.xv=0;
	this.yv=0; 
	this.type=0;
	this.angle=0;
	this.speed=3;
	this.exists=false;
	this.smart=true; // tracks player on return
	this.damage=0; 
	this.stun=false;
	this.startTime=0;
	this.curSprite=0;
	this.aniTrack=0;
	this.aniRate=6;
	this.peakTime=3;
	this.hitWall=false; 
	this.boomarang=false; // will it return
	this.returning=false;
	this.speed=1;
	this.sprites=new Array();
	
}

projectile.prototype.setup=function(type)
{
	this.type=type;
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
	
	can.save();
	can.translate(this.x+16+xOffset,this.y+16+yOffset);
	can.rotate((this.angle-90)* (Math.PI / 180));
	this.sprites[this.curSprite].draw(can, 0,0);//this.x+xOffset, this.y+yOffset);
	//can.scale(1,1);
	can.restore();
}

projectile.prototype.launch=function () //this will probably end up being an entity funciton
{
	this.startTime=new Date().getTime();
	this.returning=false;
	if(this.type==ProjTypes.Boomarang)
	{
		this.boomarang=true;
	}
}

projectile.prototype.update=function() //remember, this one's X,Y shoudl not be tile based!!! 
{
	var hoat=new Date().getTime();
	if((this.boomarang) && (hoat-this.startTime>this.peakTime))
	{
		this.returning=true;
	}
	//update position based on...? see space game!
	if(this.returning)
	{
		//again, use angles and shit to move back to tosser.
       //but bear in mind tilex vs screenx.
	
	}else
	{
		//away from tosser along angle. 
		this.x+=this.xv*this.speed*gameSpeed;
		this.y+=this.yv*this.speed*gameSpeed;
	}
	
	this.aniTrack++;
	if (this.aniTrack>this.aniRate)
	{
		this.aniTrack=0;
		this.curSprite++;
		if(this.curSprite>this.sprites.length-1)
		{
			this.curSprite=this.sprites.length-1;
		}
	}
	
	//check collision with all objects. some may block, some may activate
}
