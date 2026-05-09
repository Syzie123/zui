/* zuilib — public exports */

// Side-effect: imports the bundled stylesheet so users get tokens +
// Tailwind utilities + keyframes by importing "zuilib/styles.css".
// (The import here is what tells the lib build to emit styles.css.)
import './styles/lib.css';

/* ─────────── Tier 1 — Foundations ─────────── */
export * from './components/Button';
export * from './components/Input';
export * from './components/Label';
export * from './components/Textarea';
export * from './components/Separator';
export * from './components/Skeleton';
export * from './components/Badge';
export * from './components/Avatar';

/* ─────────── Tier 2 — Overlays ─────────── */
export * from './components/Popover';
export * from './components/Tooltip';
export * from './components/DropdownMenu';
export * from './components/HoverCard';

/* ─────────── Tier 3 — Modal layer ─────────── */
export * from './components/Dialog';
export * from './components/AlertDialog';
export * from './components/Toast';
export * from './components/Sheet';

/* ─────────── Tier 4 — Forms ─────────── */
export * from './components/Checkbox';
export * from './components/RadioGroup';
export * from './components/Switch';
export * from './components/Select';
export * from './components/SegmentedControl';

/* ─────────── Tier 5 — Composition ─────────── */
export * from './components/Card';
export * from './components/Tabs';
export * from './components/Accordion';
export * from './components/Progress';
export * from './components/Slider';
export * from './components/Sidebar';

/* ─────────── Ecommerce kit ─────────── */
export * from './components/ecommerce';

/* ─────────── Effects ─────────── */
export * from './components/effects/Marquee';
export * from './components/effects/BorderBeam';
export * from './components/effects/ShineBorder';
export * from './components/effects/NumberTicker';
export * from './components/effects/MagicCard';
export * from './components/effects/Dock';
export * from './components/effects/WordRotate';

/* ─────────── Patterns ─────────── */
export {
  FilterPanel,
  AddFiltersCard,
  PaymentTypeCard,
  OwnedByCard,
  LocationCard,
} from './patterns/FilterPanel/FilterPanel';
export { ViewingOptionsCard } from './patterns/ViewingOptions/ViewingOptions';
export { ProjectDetailCard } from './patterns/ProjectDetail/ProjectDetail';
export { SharePanelCard } from './patterns/SharePanel/SharePanel';
export { FeatureListCard } from './patterns/FeatureList/FeatureList';

/* ─────────── Hooks & utils ─────────── */
export { useTheme, type Theme } from './hooks/useTheme';
export { useControllableState } from './hooks/useControllableState';
export { useIsMobile } from './hooks/useIsMobile';
export { useAnimations } from './hooks/useAnimations';
export { cn } from './utils/cn';
