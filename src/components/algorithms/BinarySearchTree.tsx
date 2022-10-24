import { Button, TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import * as d3 from "d3";
import Tree from "../drawables/Tree";

class Node {

    value: number;
    left: Node;
    right: Node;

    constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function BinarySearchTree() {

    const [binaryTree, setBinaryTree] = useState(null);
    const [inputFieldNumber, setInputFieldNumber] = useState('');

    const height = 500;
    const width = 500;

    const margin = useMemo(() => ({ top: 30, right: 30, bottom: 30, left: 60 }), []);

    const d3Container = React.useRef<SVGSVGElement>(null);

    const insertNode = (node, newNode) => {
        if (newNode.value < node.value) {
            // check if null or go to next child
            if (node.left === null) {
                node.left = newNode;
            } else {
                insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                insertNode(node.right, newNode);
            }
        }
        return node;
    }

    const insertDataInTree = (tree, value) => {
        // than it is the root
        const newNode = new Node(value)
        if (tree === null) {
            setBinaryTree(newNode);
        } else {
            setBinaryTree({ ...insertNode(binaryTree, newNode) });
        }
    };

    const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (e.target.value === '' || re.test(e.target.value)) {
            // const val = parseInt(e.target.value);
            setInputFieldNumber(e.target.value);
        }
    };

    const handleAddValueToTree = () => {
        if (inputFieldNumber === '') return;
        insertDataInTree(binaryTree, parseInt(inputFieldNumber));
    };

    useEffect(() => {

        const margin = { top: 30, right: 30, bottom: 30, left: 60 };

        // drawing stuff
        if (d3Container.current && binaryTree) {
            const svg = d3.select(d3Container.current);
            svg.selectAll("*").remove();
            // 
            const treemap = d3.tree<Node>().size([height, width])
            let nodes = d3.hierarchy(binaryTree, (d: Node) => {
                if (d.left && d.right) return [d.left, d.right];
                if (d.left && !d.right) return [d.left];
                if (!d.left && d.right) return [d.right];
                return [];
            });

            nodes = treemap(nodes);
            const g = svg.append("g")
                .attr("transform",
                    "translate(" + (margin.left) + "," + margin.top + ")");
            g.selectAll(".link")
                .data(nodes.descendants().slice(1))
                .enter().append("path")
                .attr("class", "link")
                .style("stroke", "grey")

                .attr("d", (d: d3.HierarchyPointNode<Node>) => {
                    return "M" + d.x + "," + d.y
                        + "C" + (d.x + d.parent.x) / 2 + "," + d.y
                        + " " + (d.x + d.parent.x) / 2 + "," + d.parent.y
                        + " " + d.parent.x + "," + d.parent.y;
                });
            // adds each node as a group
            const node = g.selectAll(".node")
                .data(nodes.descendants())
                .enter().append("g")
                .attr("class", (d: d3.HierarchyPointNode<Node>) => "node" + (d.children ? " node--internal" : " node--leaf"))
                .attr("transform", (d: d3.HierarchyPointNode<Node>, i) => "translate(" + (d.x) + "," + (d.y) + ")");
            // adds the circle to the node
            node.append("circle")
                .attr("r", d => 20)
                .style("stroke", "red")
                .style("fill", "#333");
            // adds the text to the nod
            node.append("text")
                .attr("dy", ".35em")
                .attr("class", "node-text")
                .style("text-anchor", "middle")
                .text(d => d.data.value);
        }
    }, [binaryTree, margin])

    return (
        <>
            <TextField type="number" label="Number to be added" variant="outlined" value={inputFieldNumber} onChange={handleTextInputChange} />
            <Button onClick={handleAddValueToTree}>Add</Button>
            <Tree treeData={binaryTree}></Tree>
        </>
    )
}

export default BinarySearchTree;