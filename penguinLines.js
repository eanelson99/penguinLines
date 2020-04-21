var getQuizScores = function(quiz)
    {
        return quiz.grade
    }
var getPenguinQuiz = function(penguin)
    {
        var QuizGrades = penguin.quizes.map(getQuizScores)
        return QuizGrades
    }

var drawToolTip = function(penguin)
{
    d3.select("#tooltip div")
        .remove();

    
    var xPosition = d3.event.pageX;
    var yPosition = d3.event.pageY;

    var base = d3.select("#tooltip")
        .classed("hidden",false)
        .style("top",yPosition+"px")
        .style("left",xPosition+"px")
        .append("div")
    
    base.append("div")
        .classed("tt-Title",true)
        .text("Penguin Line Selected:");
    
    base.append('img')
        .attr("id","photo")
        .attr('src','imgs/'+penguin.picture);
    
}


var drawLines = function(penguins,target,graph,yScale,xScale)
{
    var lineGenerator = d3.line()
    .x(function(quiz,index) 
       {return xScale(index)})
    .y(function(quiz)  
       {return yScale(quiz.grade)})
    .curve(d3.curveCardinal)
    
    var lines = d3.select(target)
        .select(".graph")
        .selectAll("g")
        .data(penguins)
        .enter()
        .append("g")
        .classed("line",true)
        .attr("fill","none")
        .attr("stroke","gray")
        .attr("stroke-width", 1)
        .on("mouseover",function(penguin)
           {
            d3.select(this)
            .attr("stroke","black")
            .attr("stroke-width",7)
            .raise(this);
            drawToolTip(penguin)
           })
        .on("mouseout",function(penguin)
           {
            d3.select(this)
            .attr("stroke","gray")
            .attr("stroke-width", 1);
            d3.select("#tooltip")
            .classed("hidden",true);
           })
        
    lines.append("path")
        .datum(function(penguin)
        {return penguin.quizes})
        .attr("d", lineGenerator)
    
}

var createLabels = function(screen,margins,graph,target)
{
        var labels = d3.select(target)
        .append("g")
        .classed("labels",true)
        
    labels.append("text")
        .text("Grade Over Time")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2))
        .attr("y",margins.top)
    
    labels.append("text")
        .text("Week")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2))
        .attr("y",screen.height)
    
    labels.append("g")
        .attr("transform","translate(20,"+ 
              (margins.top+(graph.height/2))+")")
        .append("text")
        .text("Change in Quiz Grade")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(90)")
    
}

               
var createAxes = function(screen,margins,target,graph,xScale,yScale)
{
    var xAxis = d3.axisBottom(xScale)
    
    var yAxis = d3.axisLeft(yScale)
    
    var axes = d3.select(target)
        .append("g")
    axes.append("g")
        .attr("transform","translate("+margins.left+","
             +(margins.top+graph.height)+")")
        .call(xAxis)
    axes.append("g")
        .attr("transform","translate("+margins.left+","
             +(margins.top)+")")
        .call(yAxis)
}

var displayLineGraph = function(target, penguins)
{  
    var screen = {width:1000, height:600};

    var margins = {top:50, bottom:40, left:70, right:40};
    
    var graph = 
        {
            width: screen.width-margins.left-margins.right,
            height: screen.height-margins.top-margins.bottom,
        }
   
    d3.select(target)
        .attr("width",screen.width)
        .attr("height",screen.height)
    
    var g = d3.select(target)
        .append("g")
        .classed("graph",true)
        .attr("transform","translate("+margins.left+","+margins.top+")");
    
    var xScale = d3.scaleLinear()
        .domain([0,penguins[0].quizes.length-1])
        .range([0,graph.width])
    
     var lowQuiz = d3.min(penguins,function(penguin)
    {
        return d3.min(penguin.quizes, getQuizScores);
    })
    
    var highQuiz = d3.max(penguins,function(penguin)
    { 
        return d3.max(penguin.quizes, getQuizScores);
    })
    
   var yScale = d3.scaleLinear()
        .domain([lowQuiz,highQuiz])
        .range([graph.height,0])
             
  createAxes(screen,margins,target,graph,xScale,yScale)
  drawLines(penguins,target,graph,yScale,xScale)
  createLabels(screen,margins,graph,target)
 
    
}

var classDataPromise = d3.json("classData.json")
classDataPromise.then(function(penguins)
                     {
                      console.log("worked", penguins);
                      displayLineGraph("#linegraph",penguins);
                       
                     });
                     (function(err){console.log("failed",err)})



