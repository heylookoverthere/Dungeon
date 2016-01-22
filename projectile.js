var ProjTypes={}
ProjTypes.Arrow=0;
ProjTypes.Boomarang=1;

function projectile(aPlayer)
{
	this.x=aPlayer.x;
	this.y=aPlayer.y;
	this.type=0;
	this.angle=0;
	this.speed=3;
	this.smart=true; // tracks player on return
	this.damage=0; 
	this.stun=false;
	this.startTime=0;
	this.peakTime=3;
	this.hitWall=false; 
	this.boomarang=false; // will it return
	this.returning=false;
	this.sprites=new Array();
	
}

projectile.prototype.setup=function(type)
{


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
		
	}
	
	//check collision with all objects. some may block, some may activate
}
