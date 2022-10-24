import { Box } from "@mui/material";
import * as d3 from "d3";
import React, { useEffect, useMemo } from "react";

interface Node {
    value: number;
    left: Node;
    right: Node;
}

const Tree = ({ treeData }) => {

    const height = 500;
    const width = 500;
    const margin = useMemo(() => ({ top: 30, right: 30, bottom: 30, left: 60 }), []);
    const d3Container = React.useRef<SVGSVGElement>(null);

    useEffect(() => {
        // drawing stuff
        if (d3Container.current && treeData) {
            const svg = d3.select(d3Container.current);
            svg.selectAll("*").remove();
            // 
            const treemap = d3.tree<Node>().size([height, width])
            let nodes = d3.hierarchy(treeData, (d: Node) => {
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
            // adds the text to the node
            node.append("text")
                .attr("dy", ".35em")
                .attr("class", "node-text")
                .style("text-anchor", "middle")
                .text(d => d.data.value);
        }
    }, [treeData, margin])

    return (
        <Box>
            <svg ref={d3Container} width={width + margin.left + margin.right} height={height + margin.bottom + margin.top} />
        </Box>
    )

};

export default Tree;