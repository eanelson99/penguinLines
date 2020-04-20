var getQuizScores = function(quiz)
    {
        return quiz.grade
    }
var getPenguinQuiz = function(penguin)
    {
        var QuizGrades = penguin.quizes.map(getQuizScores)
        return QuizGrades
    }


var drawLines = function(penguins,graph,target,yScale,xScale)
{
    var lineGenerator = d3.line()
    .x(function(penguin) 
       {return xScale(getPenguinQuiz(penguin))})
    .y(function(penguin)  
       {return yScale(getPenguinQuiz(penguin))})
    var lines = d3.select(penguins)
        .select(".graph")
        .selectAll("g")
        .data(classData)
        .append("g")
        .attr("class",getPenguinQuiz)
        .classed("line",true)
        .attr("fill","none")
        .attr("stroke",getPenguinQuiz)
    
    lines.append("path")
        .datum(getPenguinQuizpenguin)
        .attr("d", lineGenerator)
    
    var svg = d3.select("#lines")
        .append("svg")
        .attr("width", 750)
        .attr("height", 500)
    svg.append("path")
        .datum(penguins)
        .attr("class","line")
        .attr("penguin", line);
        
}
               
var createAxes = function(screen,margins,graph,target,xScale,yScale)
{
    var xAxis = d3.axisBottom(xScale)
        
    svg.append("g")
        .attr("class","axis")
        .attr("transfrom","translate(0,"+(height-padding)+")")
        .call(xAxis);
    
    var yAxis = d3.axisLeft(yScale)
        .ticks(5)
    
    svg.append("g")
        .attr("class","axis")
        .attr("transform","translate("+padding+",0)")
        .call(yAxis);
}

var displayLineGraph = function(target,penguins)
{  
    var screen = {width:500,height:400}
    
    var margins = {top:15, bottom:40, left:70, right:40}
    
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
    
    xScale = d3.scaleLinear()
        .domain([d3.min(penguins,getPenguinQuiz),d3.max(penguins,getPenguinQuiz)])
        .range([0,graph.width])
    
    yScale = d3.scaleLinear()
        .domain([d3.min(penguins,index),d3.max(penguins,index)])
        .range([graph.height,0])
    
  
 
    
}

var classDataPromise = d3.json("classData.json")
classDataPromise.then(function(penguins)
                     {
                      console.log("worked", penguins);
                      displayLineGraph(penguins);
                       
                     });
                     (function(err){console.log("failed",err)})



