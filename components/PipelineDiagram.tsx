import styles from "./PipelineDiagram.module.css"

interface PipelineDiagramProps {
  steps: string[]
}

const BOX_WIDTH = 96
const BOX_HEIGHT = 36
const GAP = 28
const BOX_Y = 10

export function PipelineDiagram({ steps }: PipelineDiagramProps) {
  const width = steps.length * BOX_WIDTH + (steps.length - 1) * GAP
  const height = BOX_HEIGHT + BOX_Y * 2

  return (
    <svg
      className={styles.diagram}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={steps.join(" → ")}
    >
      {steps.map((step, i) => {
        const x = i * (BOX_WIDTH + GAP)
        return (
          <g key={step}>
            <rect className={styles.box} x={x} y={BOX_Y} width={BOX_WIDTH} height={BOX_HEIGHT} rx={6} />
            <text
              className={styles.label}
              x={x + BOX_WIDTH / 2}
              y={BOX_Y + BOX_HEIGHT / 2 + 4}
              textAnchor="middle"
            >
              {step}
            </text>
            {i < steps.length - 1 && (
              <line
                className={styles.arrow}
                x1={x + BOX_WIDTH}
                y1={BOX_Y + BOX_HEIGHT / 2}
                x2={x + BOX_WIDTH + GAP}
                y2={BOX_Y + BOX_HEIGHT / 2}
                markerEnd="url(#arrowhead)"
              />
            )}
          </g>
        )
      })}
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent)" />
        </marker>
      </defs>
    </svg>
  )
}
