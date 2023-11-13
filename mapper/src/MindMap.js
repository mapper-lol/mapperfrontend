import { useCallback, useState, useEffect } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, getNodePositionWithOrigin } from 'reactflow';
import 'reactflow/dist/style.css';

import TextUpdaterNode from './TextUpdaterNode.js';

import './text-updater-node.css';

const rfStyle = {
    backgroundColor: '#B8CEFF',
};

const initialNodes = [
    { id: 'node-1', type: 'textUpdater', position: { x: 0, y: 0 }, data: { value: 123, text: "Write your thoughts..." } },
];

const initialEdges = [

];

const ideas = [
    {
        "id": "1231",
        "text": "Zipline from the top of the Washington Monument to the Pentagon",
        "related": []
    },
    {
        "id": "1232",
        "text": "Hot link all media",
        "related": []
    },
    {
        "id": "1233",
        "text": "MIT Licenses are permissive, relatively, I think",
        "related": []
    }
]

const makeNode = (idea, index) => {
    const x = ((index + 1) * ((-1) ** index)) * 100;
    const y = ((index + 1) * ((-1) ** (index+1))) * 100;
    return {
        id: idea.id,
        type: 'output',
        data: {
            label: idea.text
        },
        position: {
            x,
            y
        }
    }
}

const getNodes = async () => {
    return [
        ...initialNodes,
        ...ideas.map((idea, i) => makeNode(idea, i))
    ]
}

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode };

function MindMap() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    useEffect(() => {
        (async () => {
            setNodes(await getNodes());
        })();
    }, [])

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                style={rfStyle}
            />
        </div>
    );
}

export default MindMap;