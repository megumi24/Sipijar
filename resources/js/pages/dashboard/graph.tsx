import { factQueries } from '@/services/fact';
import { useEffect, useRef, useState } from 'react';
import { DataSet } from 'vis-data';
import { Network } from 'vis-network';

interface GraphData {
  nodes: {
    id: string;
    group: string;
    label: string;
    value: number;
  }[];
  edges: {
    from: string;
    to: string;
    color: string;
    label: string;
    width: number;
  }[];
}

const groupStyles = {
  actor: { background: '#FF9800', border: '#FFB74D' },
  company: { background: '#3F51B5', border: '#7986CB' },
};

const NetworkGraph = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network>(null);
  const [loading, setLoading] = useState(true);

  const { data } = factQueries.graphData.useQuery(
    {},
    {
      staleTime: 5 * 60 * 1000,
    },
  );

  useEffect(() => {
    if (!data) return;
    const nodes = new DataSet(
      (data as GraphData).nodes.map((n) => ({
        ...n,
        color: groupStyles[n.group as keyof typeof groupStyles],
        font: {
          color: groupStyles[n.group as keyof typeof groupStyles].background,
        },
      })),
    );
    const edges = new DataSet(
      (data as GraphData).edges.map((e, i) => ({
        ...e,
        id: `e${i}`,
      })),
    );

    const options = {
      groups: {
        actor: {
          color: { background: '#FF9800', border: '#FFB74D' },
          shape: 'dot',
        },
        company: {
          color: { background: '#3F51B5', border: '#7986CB' },
          shape: 'dot',
        },
      },
      nodes: {
        shape: 'dot',
        scaling: {
          min: 10,
          max: 60,
          label: { enabled: true, min: 12, max: 18 },
        },
        borderWidth: 2,
      },
      edges: {
        color: { color: '#aaa', highlight: '#fff' },
        smooth: { enabled: true, type: 'dynamic', roundness: 0.5 },
        font: { size: 12, color: '#ccc', strokeWidth: 0 },
        selectionWidth: 2,
      },
      physics: {
        barnesHut: {
          gravitationalConstant: -25000,
          springLength: 200,
          springConstant: 0.04,
        },
        stabilization: { iterations: 250 },
      },
      layout: { improvedLayout: true },
      interaction: { hover: true },
    };

    const container = containerRef.current;
    networkRef.current = new Network(container!, { nodes, edges }, options);

    setLoading(false);

    // cleanup
    return () => {
      if (networkRef.current) {
        networkRef.current.destroy();
        networkRef.current = null;
      }
    };
  }, [data]);

  return (
    <div style={{ position: 'relative' }}>
      <h3 style={{ color: '#ffcc00', textAlign: 'center' }}>
        Graf Hubungan Actor–Company
      </h3>
      <div
        ref={containerRef}
        style={{ height: '80vh', background: '#1e1e1e', borderRadius: 8 }}
      />
      {loading && (
        <p style={{ color: '#ccc', textAlign: 'center' }}>Loading...</p>
      )}

      {/* Legend */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          background: 'rgba(30,30,30,0.85)',
          padding: 10,
          borderRadius: 8,
          color: '#ddd',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: '#FF9800',
              marginRight: 8,
            }}
          />{' '}
          Actor
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: '#3F51B5',
              marginRight: 8,
            }}
          />{' '}
          Company
        </div>
      </div>
    </div>
  );
};
export default NetworkGraph;
