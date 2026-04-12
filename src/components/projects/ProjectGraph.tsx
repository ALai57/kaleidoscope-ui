import React, { useCallback, useRef } from 'react';
import ForceGraph2D, { type ForceGraphMethods, type NodeObject, type LinkObject } from 'react-force-graph-2d';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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

const STATUS_COLORS: Record<string, string> = {
  idea: '#9e9e9e',
  developing: '#1976d2',
  executing: '#2e7d32',
};

function buildGraphData(projects: Project[]): GraphData {
  const nodes: GraphNode[] = projects.map((p) => ({
    id: p.id,
    name: p.title,
    status: p.status,
    val: 3,
    color: STATUS_COLORS[p.status] ?? '#9e9e9e',
  }));

  // Add status cluster nodes
  const statuses = ['idea', 'developing', 'executing'];
  const clusterNodes: GraphNode[] = statuses.map((s) => ({
    id: `cluster-${s}`,
    name: s.charAt(0).toUpperCase() + s.slice(1),
    status: s,
    val: 8,
    color: STATUS_COLORS[s] ?? '#9e9e9e',
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
  const graphRef = useRef<ForgeGraphRef | undefined>(undefined);
  type ForgeGraphRef = ForceGraphMethods<NodeObject<GraphNode>, LinkObject<GraphNode, GraphLink>>;

  const graphData = buildGraphData(projects);

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
      ctx.fillStyle = node.color ?? '#9e9e9e';
      ctx.fill();

      const fontSize = Math.max(10 / globalScale, 2);
      ctx.font = `${fontSize}px Sans-Serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white';
      ctx.fillText(label.slice(0, 20), x, y);
    },
    []
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
        <Typography variant="body2" color="text.secondary">
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
        linkColor={() => '#e0e0e0'}
        linkWidth={1}
        backgroundColor="#fafafa"
        nodeRelSize={4}
      />
    </Box>
  );
};
