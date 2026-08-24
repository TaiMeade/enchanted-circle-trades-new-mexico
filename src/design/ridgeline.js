/**
 * The ridgeline — this site's one signature shape.
 *
 * The Sangre de Cristo range stands directly east of Taos, and "Sangre de
 * Cristo" is a description of what it does at sunset: the high peaks go
 * blood-orange while the slopes below stay dark. That is where this site's two
 * colors come from, so the range itself is the shape the whole page hangs on.
 *
 * It appears in three places, all drawn from the paths below:
 *   1. the horizon at the foot of the hero, with the lit rim along the crest
 *   2. RidgeRule.vue — the section divider
 *   3. LogoMark.vue — a peak inside the open circle of the byway
 *
 * A stylised profile, not survey data. It is drawn to read as this range at a
 * glance; it does not claim to be any particular set of summits.
 */

/** Everything is authored against this box and scaled by the consumer. */
export const RIDGE_VIEWBOX = '0 0 1440 200'

/**
 * The far ridge: higher, hazier, and the part that catches the light. Its crest
 * is `FAR_CREST` below — the fill and the lit rim have to trace the same line,
 * so the crest is defined once and the fill closes it off at the baseline.
 */
export const FAR_CREST =
  'M0,150 L70,132 L110,140 L170,104 L215,116 L270,74 L310,88 L360,46 L400,60 ' +
  'L455,22 L500,52 L545,38 L600,72 L650,58 L700,92 L760,78 L820,106 L880,94 ' +
  'L940,120 L1010,108 L1070,132 L1140,120 L1200,142 L1270,132 L1340,150 ' +
  'L1400,142 L1440,154'

export const FAR_RIDGE = `${FAR_CREST} L1440,200 L0,200 Z`

/** The near ridge: lower, darker, no light on it. */
export const NEAR_RIDGE =
  'M0,178 L60,166 L120,174 L190,150 L250,162 L320,138 L380,150 L450,126 ' +
  'L510,142 L580,118 L640,134 L710,112 L780,130 L850,116 L920,138 L990,128 ' +
  'L1060,148 L1130,138 L1200,156 L1270,148 L1340,164 L1400,158 L1440,168 ' +
  'L1440,200 L0,200 Z'

/**
 * Rough length of FAR_CREST in user units, for the draw-on animation's
 * stroke-dasharray. Only needs to be >= the true length; overshooting just
 * means the dash starts further off-screen.
 */
export const FAR_CREST_LENGTH = 1700

/** One tooth of the divider rule: a peak 14 wide and 7 tall. */
export const RULE_TOOTH = { width: 20, height: 10, path: 'M0,10 L10,0 L20,10' }
