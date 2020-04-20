var getQuizScores = function(quiz)
    {
        return quiz.grade
    }
var getPenguinQuiz = function(penguin)
    {
        var QuizGrades = penguin.quizes.map(getQuizScores)
        return QuizGrades
    }


var drawLines = function(penguins,target,graph,yScale,xScale)
{
    var lineGenerator = d3.line()
    .x(function(penguin,index) 
       {return xScale(index)})
    .y(function(penguin)  
       {return yScale(getQuizScores)})
    
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
    
    lines.append("path")
        .datum(function(penguin)
        {return getPenguinQuiz})
        .attr("d", lineGenerator)
    
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
    var screen = {width:800, height:600};

    var margins = {top:15, bottom:40, left:70, right:40};
    
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
 
    
}

var classDataPromise = d3.json("classData.json")
classDataPromise.then(function(penguins)
                     {
                      console.log("worked", penguins);
                      displayLineGraph("#linegraph",penguins);
                       
                     });
                     (function(err){console.log("failed",err)})



