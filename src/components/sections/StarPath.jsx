import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import styles from './StarPath.module.css';

// ── Tight sinusoidal wave  ─────────────────────────────────────────────
// ViewBox: 200 wide × 1200 tall  (centre x = 100)
// Same formula as before: OFF = SEG × 0.3642  for bezier ≈ sine
// But now 6 half-periods (3 full waves) with smaller amplitude so it
// looks like the reference – a tight, elegant multi-oscillation spiral.
const CX = 100;  // horizontal centre
const AMP = 55;   // amplitude (narrower than before)
const SEG = 200;  // height per half-period  (6 halves = 1200 total)
const OFF = SEG * 0.3642; // ≈ 72.8 — bezier control offset

const L = CX - AMP; // 45
const R = CX + AMP; // 155

// Build 6 half-period segments: C→L, L→C, C→R, R→C, C→L, L→C
function buildPath() {
    const parts = [`M ${CX} 0`];
    const segsData = [
        [CX, L],  // seg 0: centre → left
        [L, CX],  // seg 1: left   → centre
        [CX, R],  // seg 2: centre → right
        [R, CX],  // seg 3: right  → centre
        [CX, L],  // seg 4: centre → left
        [L, CX],  // seg 5: left   → centre
    ];
    segsData.forEach(([from, to], i) => {
        const y0 = i * SEG;
        const y1 = y0 + SEG;
        // Cubic: from (from, y0) to (to, y1)
        // cp1 = (from, y0+OFF), cp2 = (to, y1-OFF)
        parts.push(`C ${from} ${y0 + OFF} ${to} ${y1 - OFF} ${to} ${y1}`);
    });
    return parts.join(' ');
}
const PATH = buildPath();  // total height = 6 × 200 = 1200

// Precompute segment data for point lookup
const SEGS_DATA = [
    [CX, L], [L, CX], [CX, R], [R, CX], [CX, L], [L, CX],
].map(([from, to], i) => {
    const y0 = i * SEG;
    const y1 = y0 + SEG;
    return {
        p0: [from, y0],
        p1: [from, y0 + OFF],
        p2: [to, y1 - OFF],
        p3: [to, y1],
    };
});

function getBezierPoint(t) {
    const N = SEGS_DATA.length; // 6
    const i = Math.min(Math.floor(t * N), N - 1);
    const u = t * N - i;
    const { p0, p1, p2, p3 } = SEGS_DATA[i];
    const x = (1 - u) ** 3 * p0[0] + 3 * (1 - u) ** 2 * u * p1[0] + 3 * (1 - u) * u ** 2 * p2[0] + u ** 3 * p3[0];
    const y = (1 - u) ** 3 * p0[1] + 3 * (1 - u) ** 2 * u * p1[1] + 3 * (1 - u) * u ** 2 * p2[1] + u ** 3 * p3[1];
    return { x, y };
}

// Sections evenly spread across the 6 half-periods
// Put them at the peaks (L or R extremes) of each wave
//   t ≈ 0.08  → top of seg 0 approaching L
//   t ≈ 0.25  → bottom of seg 1 back at C (between waves 1 and 2)
//   t ≈ 0.58  → peak of seg 3 at R (wave 3 right extreme)
//   t ≈ 0.75  → bottom of seg 3 back at C
const SECTIONS = [
    { id: 'about', title: 'About', desc: 'Precision financial strategies.', href: '/about', t: 0.10, side: 'left' },
    { id: 'projects', title: 'Projects', desc: 'High-yield asset management.', href: '/projects', t: 0.35, side: 'right' },
    { id: 'articles', title: 'Articles', desc: 'Market insights & fiscal trends.', href: '/articles', t: 0.60, side: 'left' },
    { id: 'gallery', title: 'Gallery', desc: 'A decade of finance visualised.', href: '/gallery', t: 0.85, side: 'right' },
];

const SectionLabel = ({ sec, scrollProgress }) => {
    const opacity = useTransform(scrollProgress, [sec.t - 0.06, sec.t + 0.05], [0, 1]);
    const yShift = useTransform(scrollProgress, [sec.t - 0.06, sec.t + 0.05], [12, 0]);

    const pt = getBezierPoint(sec.t);
    const xPct = (pt.x / 200) * 100;
    const yPct = (pt.y / 1200) * 100;   // viewBox is 1200 tall

    return (
        <motion.div
            className={`${styles.anchor} ${sec.side === 'left' ? styles.anchorLeft : styles.anchorRight}`}
            style={{ left: `${xPct}%`, top: `${yPct}%`, opacity, y: yShift }}
        >
            <div className={`${styles.connector} ${sec.side === 'left' ? styles.connLeft : styles.connRight}`} />
            <Link to={sec.href} className={`${styles.card} ${sec.side === 'left' ? styles.cardLeft : styles.cardRight}`}>
                <span className={styles.cardTitle}>{sec.title}</span>
                <span className={styles.cardDesc}>{sec.desc}</span>
                <span className={styles.cardArrow}>{sec.side === 'left' ? '←' : '→'}</span>
            </Link>
        </motion.div>
    );
};

const StarPath = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 90%', 'end 20%'],
    });
    const pathLength = useSpring(scrollYProgress, { stiffness: 45, damping: 16, restDelta: 0.001 });

    return (
        <section ref={ref} className={styles.container}>
            <div className={styles.headline}>
                <span className={styles.eyebrow}>Explore</span>
                <h2 className={styles.headlineTitle}>Navigate my<br /><em>universe</em></h2>
            </div>

            <div className={styles.svgWrapper}>
                <svg className={styles.svg} viewBox="0 0 200 1200" preserveAspectRatio="xMidYMid meet">
                    {/* Layer 1 – wide golden atmosphere */}
                    <motion.path d={PATH} fill="none"
                        stroke="rgba(214,160,50,0.18)" strokeWidth="20" strokeLinecap="round"
                        style={{ pathLength, filter: 'blur(12px)' }} />
                    {/* Layer 2 – mid warm amber glow */}
                    <motion.path d={PATH} fill="none"
                        stroke="rgba(255,200,80,0.50)" strokeWidth="7" strokeLinecap="round"
                        style={{ pathLength, filter: 'blur(3px)' }} />
                    {/* Layer 3 – sharp bright edge */}
                    <motion.path d={PATH} fill="none"
                        stroke="rgba(255,240,180,0.95)" strokeWidth="1.8" strokeLinecap="round"
                        style={{ pathLength, filter: 'drop-shadow(0 0 4px rgba(255,220,100,1))' }} />
                    {/* Layer 4 – pure white-hot centre */}
                    <motion.path d={PATH} fill="none"
                        stroke="rgba(255,255,255,1)" strokeWidth="0.5" strokeLinecap="round"
                        style={{ pathLength }} />
                </svg>

                {SECTIONS.map(sec => (
                    <SectionLabel key={sec.id} sec={sec} scrollProgress={pathLength} />
                ))}
            </div>
        </section>
    );
};

export default StarPath;
