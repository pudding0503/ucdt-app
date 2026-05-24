import type { IconBaseProps, IconType } from "react-icons";
import { FaApple, FaGithub, FaLinux, FaWindows } from "react-icons/fa6";
import {
  LuCheck,
  LuChevronDown,
  LuClipboard,
  LuDatabase,
  LuExternalLink,
  LuInfo,
  LuPalette,
  LuShieldCheck,
  LuSparkles,
} from "react-icons/lu";
import type { DownloadPlatform } from "@/data/products";

type SiteIconProps = IconBaseProps;

function renderIcon(Icon: IconType, props: SiteIconProps) {
  return <Icon aria-hidden="true" {...props} />;
}

export function GitHubIcon(props: SiteIconProps) {
  return renderIcon(FaGithub, props);
}

export function InfoIcon(props: SiteIconProps) {
  return renderIcon(LuInfo, props);
}

export function CopyIcon(props: SiteIconProps) {
  return renderIcon(LuClipboard, props);
}

export function CheckIcon(props: SiteIconProps) {
  return renderIcon(LuCheck, props);
}

export function ChevronIcon(props: SiteIconProps) {
  return renderIcon(LuChevronDown, props);
}

export function DatabaseIcon(props: SiteIconProps) {
  return renderIcon(LuDatabase, props);
}

export function PaletteIcon(props: SiteIconProps) {
  return renderIcon(LuPalette, props);
}

export function SparkIcon(props: SiteIconProps) {
  return renderIcon(LuSparkles, props);
}

export function LicenseIcon(props: SiteIconProps) {
  return renderIcon(LuShieldCheck, props);
}

export function ExternalLinkIcon(props: SiteIconProps) {
  return renderIcon(LuExternalLink, props);
}

export function PlatformIcon({ platform, className }: { platform: DownloadPlatform; className?: string }) {
  const Icon = platform === "macOS" ? FaApple : platform === "Windows" ? FaWindows : FaLinux;

  return <Icon aria-hidden="true" className={className} />;
}
