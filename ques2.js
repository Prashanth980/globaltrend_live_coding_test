const { MinPriorQueue } = require('@datastructures-js/priority-queue');
const readline = require('readline');

function dijkstra(graph, source) {
    const distances = {};
    const priorityQueue = new MinPriorQueue();

    for (let vertex in graph) {
        if (vertex == source) {
            distances[vertex] = 0;
            priorityQueue.enqueue(vertex, 0);
        }
        else {
            distances[vertex] = Infinity;
            priorityQueue.enqueue(vertex, Infinity);
        }
    }
    while (!priorityQueue.isEmpty()) {
        const { element: currentVertex, priority: currentDistance } = priorityQueue.dequeue();
        if (currentDistance > distances[currentVertex]) {
            continue;
        }
        for (let neighbor in graph[currentVertex]) {
            const distance = graph[currentVertex][neighbor];
            const newDistance = currentDistance + distance;

            if (newDistance < distance[neighbor]) {
                distance[neighbor] = newDistance;
                priorityQueue.enqueue(neighbor, newDistance);
            }
        }
    }
    return distances;
}
function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter Number of Vertices:', (numVertices) => {
        const graph = {};

        console.log('Enter Edges in Format "source target weight" (One Per Line), Type "done" when you are finished:');

        rl.on('line', (line) => {
            if (line.trim().toLowerCase() === 'done') {
                rl.question('Enter Source:', (source) => {
                    const result = dijkstra(graph, Number(source));
                    console.log(`The Shortest Path Distance From Source Vertex ${source} are:`);
                    console.log(result);
                    rl.close();
                });
            }
            else {
                const [source, target, weight] = line.split(' ').map(Number);
                if (!graph[source]) {
                    graph[source] = {};
                }
                graph[source][target] = weight;
                }
        });
    });
}
main();