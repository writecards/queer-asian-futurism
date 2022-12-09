// let svg = d3.select("svg");

// let categories = ["one", "two", "three", "four", "five", "six"]

// d3.select("#content")
//     .selectAll("div")
//     .data(categories)
//     .enter()   //returning enterNode
//     .append("div")
//     .text(d=>d);


let width = window.innerWidth;
let height = window.innerHeight;

let links = [
    {source: 'source1', target: 'target1'},
    {source: 'source2', target: 'target1'},
    {source: 'source3', target: 'target2'},
    {source: 'source4', target: 'target1'},

    {source: 'source5', target: 'target1'},
    {source: 'source6', target: 'target2'},
    {source: 'source7', target: 'target2'},
    {source: 'source8', target: 'target2'},

];

let nodes = {};

//parse links to nodes

links.forEach(function(link){
    link.source = nodes[link.source] || 
    (nodes[link.source] = {name: link.source});
    link.target = nodes[link.target] || 
    (nodes[link.target] = {name: link.target});
});


//add svg to body

let svg = d3.select('body').append('svg')
            .attr('width', width)
            .attr('height', height);

let force = d3.layout.force()
    .size([width, height])
    .nodes(d3.values(nodes))
    .links(links)
    .on("tick", tick)
    .linkDistance(400)
    .start();

let link = svg.selectAll('.link')
            .data(links)
            .enter().append('line') // path if curved line. look at example
            .attr('class', 'link');

let node = svg.selectAll('.node')
            .data(force.nodes())
            .enter().append('circle')
            .attr('class', 'node')
            .attr('r', width * 0.02);
            

function tick(e){
    node.attr('cx', function(d){ return d.x;})
        .attr('cy', function(d){return d.y;})
         .call(force.drag);
      
    

    link.attr('x1', function(d){return d.source.x;})
        .attr('y1', function(d){return d.source.y;})
        .attr('x2', function(d){return d.target.x;})
         .attr('y2', function(d){return d.target.y;})
}



function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  
  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  