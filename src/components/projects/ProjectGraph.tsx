import React, { useCallback, useRef } from 'react';
import ForceGraph2D, { type ForceGraphMethods, type NodeObject, type LinkObject } from 'react-force-graph-2d';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../../types/project';

interface GraphNode {
  id: string;
  name: string;
  status: string;
  val: number;
  color: string;
}

interface GraphLink {
  source: string;
  target: string;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

function buildGraphData(
  projects: Project[],
  statusColor: (status: string) => string
): GraphData {
  const nodes: GraphNode[] = projects.map((p) => ({
    id: p.id,
    name: p.title,
    status: p.status,
    val: 3,
    color: statusColor(p.status),
  }));

  // Add status cluster nodes
  const statuses = ['idea', 'developing', 'executing'];
  const clusterNodes: GraphNode[] = statuses.map((s) => ({
    id: `cluster-${s}`,
    name: s.charAt(0).toUpperCase() + s.slice(1),
    status: s,
    val: 8,
    color: statusColor(s),
  }));

  // Links from each project to its status cluster
  const links: GraphLink[] = projects.map((p) => ({
    source: p.id,
    target: `cluster-${p.status}`,
  }));

  return {
    nodes: [...clusterNodes, ...nodes],
    links,
  };
}

interface ProjectGraphProps {
  projects: Project[];
  width?: number;
  height?: number;
}

export const ProjectGraph: React.FC<ProjectGraphProps> = ({
  projects,
  width = 800,
  height = 500,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const graphRef = useRef<ForgeGraphRef | undefined>(undefined);
  type ForgeGraphRef = ForceGraphMethods<NodeObject<GraphNode>, LinkObject<GraphNode, GraphLink>>;

  // Project status -> node color, from the theme (info/success/grey).
  const statusColor = (status: string): string => {
    switch (status) {
      case 'developing':
        return theme.palette.info.main;
      case 'executing':
        return theme.palette.success.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const graphData = buildGraphData(projects, statusColor);

  const handleNodeClick = useCallback(
    (node: { id?: string | number }) => {
      const id = String(node.id ?? '');
      if (!id.startsWith('cluster-')) {
        navigate(`/projects/${id}`);
      }
    },
    [navigate]
  );

  const nodeCanvasObject = useCallback(
    (
      node: { x?: number; y?: number; name?: string; color?: string; val?: number },
      ctx: CanvasRenderingContext2D,
      globalScale: number
    ) => {
      const label = node.name ?? '';
      const x = node.x ?? 0;
      const y = node.y ?? 0;
      const r = Math.sqrt((node.val ?? 3)) * 4;

      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI, false);
      ctx.fillStyle = node.color ?? theme.palette.grey[500];
      ctx.fill();

      const fontSize = Math.max(10 / globalScale, 2);
      ctx.font = `${fontSize}px Sans-Serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white';
      ctx.fillText(label.slice(0, 20), x, y);
    },
    [theme]
  );

  if (projects.length === 0) {
    return (
      <Box
        sx={{
          width,
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px dashed',
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <Typography variant="body2" sx={{
          color: "text.secondary"
        }}>
          No projects to display.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
      <ForceGraph2D
        ref={graphRef}
        graphData={graphData}
        width={width}
        height={height}
        nodeCanvasObject={nodeCanvasObject}
        onNodeClick={handleNodeClick}
        linkColor={() => theme.palette.divider}
        linkWidth={1}
        backgroundColor={theme.palette.background.default}
        nodeRelSize={4}
      />
    </Box>
  );
};
