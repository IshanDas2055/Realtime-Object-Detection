img = "";
status1 = "" ;
object = [] ;

function preload()
{
   img = loadImage("dog_cat.jpg");
}

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    ObjectDetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status2").innerHTML = "Status : Detecting Object";
}

function draw()
{
    image(video,0,0,380,380);
    if(status1 != "")
    {
      ObjectDetector.detect(video , gotResults);
      r=random(255);
      g=random(255);
      b=random(255);
      for(i = 0;i < object.length; i++)
      {
       document.getElementById("status2").innerHTML = "Status : Object Detected";
       document.getElementById("No_of_object").innerHTML ="Number of Objects : "+object.length ;
       fill(r,g,b);
       percent=floor(object[i].confidence*100);
       text(object[i].label+" "+percent+"%",object[i].x , object[i].y);
       noFill();
       stroke(r,g,b);
       rect(object[i].x , object[i].y,object[i].width , object[i].height);
      }
    }
}   

function modelloaded()
{
console.log("modelloaded");
status1 = true;
}

function gotResults(error,results)
{
if(error)
{
    console.log(error);
}
else
{
    console.log(results);
    object = results ;
}

}