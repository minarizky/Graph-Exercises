class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // Adds a vertex to the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // Adds multiple vertices to the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // Adds an edge between two vertices
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // Removes an edge between two vertices
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // Removes a vertex from the graph, also removing it from adjacent nodes
  removeVertex(vertex) {
    for (let adjacent of vertex.adjacent) {
      adjacent.adjacent.delete(vertex);
    }
    this.nodes.delete(vertex);
  }

  // Performs Depth-First Search (DFS) and returns the visited nodes
  depthFirstSearch(start) {
    let visited = new Set();
    let result = [];

    function dfs(node) {
      if (!node || visited.has(node)) return;
      visited.add(node);
      result.push(node.value);

      node.adjacent.forEach((neighbor) => {
        if (!visited.has(neighbor)) dfs(neighbor);
      });
    }

    dfs(start);
    return result;
  }

  // Performs Breadth-First Search (BFS) and returns the visited nodes
  breadthFirstSearch(start) {
    let visited = new Set();
    let queue = [start];
    let result = [];

    visited.add(start);

    while (queue.length) {
      let current = queue.shift();
      result.push(current.value);

      current.adjacent.forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }

    return result;
  }

  // Finds the shortest path between source and target using BFS
  findShortestPath(source, target) {
    let visited = new Set();
    let queue = [[source]];
    visited.add(source);

    while (queue.length) {
      let path = queue.shift();
      let node = path[path.length - 1];

      // If target node is found, return the path
      if (node === target) {
        return path.map((vertex) => vertex.value);
      }

      // Add unvisited neighbors to the queue
      for (let neighbor of node.adjacent) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          let newPath = [...path, neighbor];
          queue.push(newPath);
        }
      }
    }

    // If no path is found, return null
    return null;
  }
}

// Exports the Graph and Node classes
module.exports = { Graph, Node };

// Example Usage:

let graph = new Graph();
let A = new Node("A");
let B = new Node("B");
let C = new Node("C");
let D = new Node("D");
let E = new Node("E");

graph.addVertices([A, B, C, D, E]);
graph.addEdge(A, B);
graph.addEdge(A, C);
graph.addEdge(B, D);
graph.addEdge(C, D);
graph.addEdge(D, E);

console.log(graph.findShortestPath(A, E)); // Output: [ 'A', 'B', 'D', 'E' ]