/** Pixels per minute — the horizontal scale of the time axis. */
export const PX_PER_MIN = 23;
/** Ruler (tick strip) height, px. */
export const RULER_H = 34;
/** Lane (bar row) height, px. Kept tight so the schematic reads as a compact
 *  overview (~20% of a laptop viewport) and the recipe method lands above the
 *  fold — the point of the timeline-first redesign. */
export const ROW_H = 32;
/** Vertical gap between lanes, px. Small on purpose (see ROW_H). */
export const ROW_GAP = 5;
/** Sticky left gutter that holds lane labels, px. Kept compact so the
 *  bars get the horizontal space (timeline-first redesign) and the short
 *  component names in 12px mono don't out-shout the bars they label. */
export const GUTTER = 100;
