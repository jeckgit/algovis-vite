import { getColors } from '../../mixins/helpers';
import React, { useEffect, useMemo, useState } from 'react';
import * as d3 from "d3";
import { Box, Button, Slider, Typography } from '@mui/material';
import { BlockPicker, ColorResult } from 'react-color';
import '../../style/BinaryTree.css';

class Node {
    value: number;
    left?: Node | null;
    right?: Node | null;

    constructor(value: number) {
        this.value = value;
    }
}

function BinaryTree() {
    const [nodeHeight, setNodeHeigth] = useState(60);
    const [nodeWidth, setNodeWidth] = useState(1);
    const [depthBinaryTree, setDepthBinaryTree] = useState(5);
    const [startColor, setStartColor] = useState("#FFFFFF");
    const [endColor, setEndColor] = useState("#000000");
    const [colorPickerStart, setColorPickerStart] = useState(false);
    const [colorPickerEnd, setColorPickerEnd] = useState(false);

    const height = 500;
    const width = 500;

    const margin = useMemo(() => ({ top: 30, right: 30, bottom: 30, left: 60 }), []);
    const d3Container = React.useRef<SVGSVGElement>(null);

    const handleNodeHeightChange = (event: Event, newValue: number) => {
        setNodeHeigth(newValue);
    };

    const handleNodeWidthChange = (event: Event, newValue: number) => {
        setNodeWidth(newValue);
    }

    const handleBinaryTreeDepthSliderChange = (event: Event, newValue: number) => {
        setDepthBinaryTree(newValue);
    }

    const handleStartColorChange = (newValue: ColorResult) => {
        setStartColor(newValue.hex);
    }

    const handleEndColorChange = (newValue: ColorResult) => {
        setEndColor(newValue.hex);
    }
    const handleColorPickerCloseStart = () => {
        setColorPickerStart(false)
    }

    const handleColorPickerCloseEnd = () => {
        setColorPickerEnd(false)
    }

    const createBinaryTree = (depth = 4) => {
        let stack = [];
        const root = new Node(0);
        stack.push(root);

        let currentNodes = [stack.pop()];
        let nodeCounter = 1;
        for (let i = 0; i < depth - 1; i++) {
            // eslint-disable-next-line
            currentNodes.forEach((node: Node) => {
                node.left = new Node(nodeCounter++);
                node.right = new Node(nodeCounter++);
                stack.push(node.left, node.right);
            })
            currentNodes = [...stack];
            stack = [];
        }
        return root;
    }

    const [treeData] = useState(createBinaryTree(depthBinaryTree));


    useEffect(() => {

        const separationMethod = (a, b) => {
            return (a.parent === b.parent ? 1 : 2 / nodeWidth);
            // return (a.parent == b.parent ? 1 : 2) / a.depth;
        }

        const colors = depthBinaryTree > 1 ? getColors(depthBinaryTree, startColor, endColor) : [startColor];

        // drawing stuff
        if (d3Container.current && treeData) {
            const svg = d3.select(d3Container.current);
            svg.selectAll("*").remove();
            // 
            const treemap = d3.tree<Node>().size([height, width]).separation(separationMethod);
            let nodes = d3.hierarchy(treeData, (d: Node) => {
                if (d.left && d.right) return [d.left, d.right];
                return [];
            });

            nodes = treemap(nodes);
            // change node Height
            nodes.each((d: d3.HierarchyPointNode<Node>) => { d.y = d.depth * nodeHeight; });

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
                .style("fill", d => colors[d.depth]);
            // adds the text to the node
            node.append("text")
                .attr("dy", ".35em")
                .attr("class", "node-text")
                .style("text-anchor", "middle")
                .text(d => d.data.value);
        }


    }, [d3Container, depthBinaryTree, nodeHeight, nodeWidth, startColor, endColor, margin, treeData])



    const popover = {
        position: 'absolute',
        zIndex: '2',
    } as React.CSSProperties;
    const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    } as React.CSSProperties;

    return (
        <Box>
            <Box sx={{ width: 300 }}>
                <Typography gutterBottom>
                    Node Height
                </Typography>
                <Slider
                    onChange={handleNodeHeightChange}
                    aria-label="Node Height"
                    value={nodeHeight}
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={10}
                    max={180}
                />
            </Box>

            <Box sx={{ width: 300 }}>
                <Typography gutterBottom>
                    Node Width
                </Typography>
                <Slider
                    onChange={handleNodeWidthChange}
                    aria-label="Node Height"
                    value={nodeWidth}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={20}
                />
            </Box>

            <Box sx={{ width: 300 }}>
                <Typography gutterBottom>
                    Tree Depth
                </Typography>
                <Slider
                    onChange={handleBinaryTreeDepthSliderChange}
                    aria-label="Node Height"
                    value={depthBinaryTree}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={8}
                />
            </Box>
            <Box sx={{ display: 'flex', '.button-wrapper': { mr: 1 } }}>
                <Box className='button-wrapper'>
                    <Button variant="outlined" onClick={() => setColorPickerStart(true)}>Start Color: <span style={{ color: startColor }}>{startColor}</span></Button>
                    {colorPickerStart && <div style={popover}>
                        <div style={cover} onClick={handleColorPickerCloseStart} />
                        <BlockPicker color={startColor} onChangeComplete={handleStartColorChange} />
                    </div>}
                </Box>
                <Box className='button-wrapper'>
                    <Button variant="outlined" onClick={() => setColorPickerEnd(true)}>End Color: <span style={{ color: endColor }}>{endColor}</span></Button>
                    {colorPickerEnd && <div style={popover}>
                        <div style={cover} onClick={handleColorPickerCloseEnd} />
                        <BlockPicker color={endColor} onChangeComplete={handleEndColorChange} />
                    </div>}
                </Box>
            </Box>

            <svg ref={d3Container} width={width + margin.left + margin.right} height={height + margin.bottom + margin.top} />
        </Box >

    )
}

export default BinaryTree;