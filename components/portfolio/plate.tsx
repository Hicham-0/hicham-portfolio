'use client'

import { motion } from 'framer-motion'
import { EASE, type Diagram, type DiagramNode } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

const W = 100
const H = 44

function edgePath(a: DiagramNode, b: DiagramNode) {
  const aRight = a.x + W
  const gap = b.x - aRight
  if (gap >= 30) {
    const midX = aRight + gap / 2
    return `M ${aRight} ${a.y} H ${midX} V ${b.y} H ${b.x}`
  }
  if (gap >= 0 && a.y !== b.y) {
    const cx = a.x + W / 2
    const startY = b.y > a.y ? a.y + H / 2 : a.y - H / 2
    return `M ${cx} ${startY} V ${b.y} H ${b.x}`
  }
  const ax = a.x + W / 2
  const bx = b.x + W / 2
  const down = b.y > a.y
  const sy = down ? a.y + H / 2 : a.y - H / 2
  const ey = down ? b.y - H / 2 : b.y + H / 2
  const my = (sy + ey) / 2
  return `M ${ax} ${sy} V ${my} H ${bx} V ${ey}`
}

function RegistrationMark({ x, y }: { x: number; y: number }) {
  return (
    <g stroke="var(--ink)" strokeWidth="0.5" opacity="0.55">
      <line x1={x - 7} y1={y} x2={x + 7} y2={y} />
      <line x1={x} y1={y - 7} x2={x} y2={y + 7} />
      <circle cx={x} cy={y} r="3.5" fill="none" />
    </g>
  )
}

export function Plate({
  diagram,
  className,
  animateIn = true,
  title,
}: {
  diagram: Diagram
  className?: string
  animateIn?: boolean
  title: string
}) {
  const byId = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]))
  const view = animateIn
    ? { initial: 'hidden' as const, whileInView: 'visible' as const, viewport: { once: true, margin: '-5% 0px' } }
    : { initial: 'hidden' as const, animate: 'visible' as const }

  return (
    <motion.svg
      viewBox="-20 -10 640 420"
      className={cn('h-full w-full', className)}
      role="img"
      aria-label={`${title} architecture schematic`}
      {...view}
    >
      <RegistrationMark x={-6} y={4} />
      <RegistrationMark x={606} y={4} />
      <RegistrationMark x={-6} y={396} />
      <RegistrationMark x={606} y={396} />

      {diagram.groups.map((g, i) => (
        <motion.g
          key={g.label}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: 1.2, delay: 0.1 + i * 0.1, ease: EASE }}
        >
          <rect
            x={g.x}
            y={g.y}
            width={g.w}
            height={g.h}
            fill="none"
            stroke="var(--ink)"
            strokeOpacity="0.4"
            strokeDasharray="1 3"
            strokeWidth="0.75"
          />
          <text x={g.x + 8} y={g.y - 6} fill="var(--stone)" className="font-mono" fontSize="7.5" letterSpacing="2">
            {g.label.toUpperCase()}
          </text>
        </motion.g>
      ))}

      {diagram.edges.map(([from, to], i) => {
        const d = edgePath(byId[from], byId[to])
        return (
          <g key={`${from}-${to}`}>
            <motion.path
              d={d}
              fill="none"
              stroke="var(--ink)"
              strokeOpacity="0.6"
              strokeWidth="0.6"
              variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
              transition={{ duration: 1.6, delay: 0.35 + i * 0.1, ease: EASE }}
            />
            <motion.path
              d={d}
              fill="none"
              stroke="var(--klein)"
              strokeWidth="1.2"
              className="flow-dash"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              transition={{ duration: 1, delay: 1.5 + i * 0.08 }}
            />
          </g>
        )
      })}

      {diagram.nodes.map((n, i) => (
        <motion.g
          key={n.id}
          variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 1, delay: 0.2 + i * 0.07, ease: EASE }}
        >
          <rect
            x={n.x}
            y={n.y - H / 2}
            width={W}
            height={H}
            fill={n.accent ? 'var(--klein)' : 'var(--paper)'}
            stroke={n.accent ? 'var(--klein)' : 'var(--ink)'}
            strokeWidth="0.75"
          />
          <text
            x={n.x + 9}
            y={n.y - 3}
            fill={n.accent ? 'var(--paper)' : 'var(--ink)'}
            className="font-mono"
            fontSize="8"
            letterSpacing="1.4"
          >
            {n.label.toUpperCase()}
          </text>
          {n.sub && (
            <text
              x={n.x + 9}
              y={n.y + 12}
              fill={n.accent ? 'var(--paper)' : 'var(--stone)'}
              fillOpacity={n.accent ? 0.75 : 1}
              className="font-serif"
              fontSize="11"
              fontStyle="italic"
            >
              {n.sub}
            </text>
          )}
        </motion.g>
      ))}
    </motion.svg>
  )
}
