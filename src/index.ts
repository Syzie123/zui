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
export { SignInCard, type SignInCardProps, type SignInProvider } from './patterns/SignInCard/SignInCard';
export { LoginSplit, type LoginSplitProps, type LoginSplitVariant } from './patterns/LoginSplit/LoginSplit';

/* ─────────── AI patterns ─────────── */
export {
  AIPrompt,
  type AIPromptProps,
  type AIPromptMode,
  type AIPromptStreamState,
  type AIPromptTag,
  type AIPromptTool,
  type AIPromptSuggestion,
  type AIPromptModel,
} from './patterns/AIPrompt/AIPrompt';
export {
  AIDropzone,
  type AIDropzoneProps,
  type AIDropzoneFileKind,
  type AIDropzonePreview,
  type AIDropzoneAction,
} from './patterns/AIDropzone/AIDropzone';
export {
  AIRecorder,
  type AIRecorderProps,
  type AIRecorderState,
} from './patterns/AIRecorder/AIRecorder';
export {
  AIGreeting,
  type AIGreetingProps,
  type AIGreetingCardVariant,
} from './patterns/AIGreeting/AIGreeting';
export { AIMessage, type AIMessageProps } from './patterns/AIMessage/AIMessage';
export {
  AIGenerating,
  type AIGeneratingProps,
  type AIGeneratingChip,
  type AIGeneratingPreset,
} from './patterns/AIGenerating/AIGenerating';

/* ─────────── 3D / Neumorphic + scene patterns ─────────── */
export { Action3D, type Action3DProps } from './patterns/Action3D/Action3D';
export { Switch3D, type Switch3DProps } from './patterns/Switch3D/Switch3D';
export { ImageCard3D, type ImageCard3DProps } from './patterns/ImageCard3D/ImageCard3D';
export {
  PlanCard3D,
  type PlanCard3DProps,
  type PlanCard3DTone,
} from './patterns/PlanCard3D/PlanCard3D';
export {
  MenuList3D,
  type MenuList3DProps,
  type MenuList3DItemProps,
  type MenuList3DProgressProps,
} from './patterns/MenuList3D/MenuList3D';
export {
  JobCardStack,
  type JobCardStackProps,
  type JobCardItem,
  type JobCardTone,
} from './patterns/JobCardStack/JobCardStack';
export {
  TrackDelivery,
  type TrackDeliveryProps,
} from './patterns/TrackDelivery/TrackDelivery';
export {
  TravelCard,
  type TravelCardProps,
} from './patterns/TravelCard/TravelCard';
export {
  InstallCard,
  type InstallCardProps,
} from './patterns/InstallCard/InstallCard';
export {
  PricingDark,
  type PricingDarkProps,
  type PricingDarkTone,
  type PricingDarkFeature,
  type PricingDarkSpec,
} from './patterns/PricingDark/PricingDark';
export {
  StatsCard,
  type StatsCardProps,
  type StatsCardRow,
} from './patterns/StatsCard/StatsCard';
export {
  TalentGrid,
  type TalentGridProps,
  type TalentItem,
  type TalentRoleTone,
} from './patterns/TalentGrid/TalentGrid';
export {
  ContentGenerator,
  type ContentGeneratorProps,
} from './patterns/ContentGenerator/ContentGenerator';

/* ─────────── Brand icons ─────────── */
export {
  GoogleIcon,
  AppleIcon,
  MicrosoftIcon,
  FacebookIcon,
  XIcon,
  GithubBrandIcon,
  OpenAIIcon,
  AnthropicIcon,
  ZoomIcon,
  SlackIcon,
  FramerIcon,
  LoomIcon,
  HopinIcon,
  NotionIcon,
  FigmaIcon,
  CursorIcon,
  GeminiIcon,
} from './components/icons/brand';

/* ─────────── Hooks & utils ─────────── */
export { useTheme, type Theme } from './hooks/useTheme';
export { useControllableState } from './hooks/useControllableState';
export { useIsMobile } from './hooks/useIsMobile';
export { useAnimations } from './hooks/useAnimations';
export { cn } from './utils/cn';
