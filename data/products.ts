import type { StaticImageData } from "next/image";
import siteLogo from "@/assets/logo.png";
import analysisIcon from "@/assets/ucdt-analysis/logo-rounded.png";
import analysisWordmark from "@/assets/ucdt-analysis/logo-words.png";
import analysisShot1 from "@/assets/ucdt-analysis/screenshot-1.png";
import analysisShot2 from "@/assets/ucdt-analysis/screenshot-2.png";
import analysisShot3 from "@/assets/ucdt-analysis/screenshot-3.png";
import computingIcon from "@/assets/ucdt-computing/logo-rounded.png";
import computingWordmark from "@/assets/ucdt-computing/logo-words.png";
import extractionIcon from "@/assets/ucdt-extraction/logo-rounded.png";
import extractionWordmark from "@/assets/ucdt-extraction/logo-words.png";
import planningIcon from "@/assets/ucdt-planning/logo-rounded.png";
import planningWordmark from "@/assets/ucdt-planning/logo-words.png";
import processingIcon from "@/assets/ucdt-processing/logo-rounded.png";
import processingWordmark from "@/assets/ucdt-processing/logo-words.png";
import processingShot1 from "@/assets/ucdt-processing/screenshot-1.png";
import processingShot2 from "@/assets/ucdt-processing/screenshot-2.png";

export type Locale = "zh" | "en";

export type LocalizedText = {
  zh: string;
  en: string;
};

export type ProductStatus = "released" | "comingSoon";

export type DownloadPlatform = "macOS" | "Windows" | "Linux";

export type ProductDownload = {
  platform: DownloadPlatform;
  available: boolean;
  href?: string;
};

export type Product = {
  id: string;
  slug: string;
  accent: {
    primary: string;
    secondary: string;
    surface: string;
    glow: string;
  };
  status: ProductStatus;
  badge: LocalizedText;
  title: LocalizedText;
  category: LocalizedText;
  tagline: LocalizedText;
  description: LocalizedText;
  workflowRole: LocalizedText;
  highlights: LocalizedText[];
  releaseNote: LocalizedText;
  platforms: string[];
  version: string;
  releaseUrl?: string;
  repoUrl?: string;
  releaseMarkdown?: string;
  icon: StaticImageData;
  wordmark: StaticImageData;
  license: {
    name: string;
    url?: string;
  };
  downloads: ProductDownload[];
  screenshots?: StaticImageData[];
};

export const siteMeta = {
  name: "UCDT Series",
  subtitle: {
    zh: "",
    en: "",
  },
  description: {
    zh: "一个简洁、开源的城市数字孪生软件下载入口。\n为研究者、开发者与设计团队构建。",
    en: "A simple, open-source hub for urban digital twin desktop tools.\nBuilt for researchers, developers, and design teams.",
  },
  logo: siteLogo,
  githubUrl: "https://github.com/buildingdata",
};

export const products: Product[] = [
  {
    id: "extraction",
    slug: "UCDT Extraction Core",
    accent: {
      primary: "#9B5CFF",
      secondary: "#C293FF",
      surface: "rgba(155, 92, 255, 0.14)",
      glow: "rgba(155, 92, 255, 0.34)",
    },
    status: "comingSoon",
    badge: {
      zh: "即将推出",
      en: "Coming Soon",
    },
    title: {
      zh: "UCDT Extraction Core",
      en: "UCDT Extraction Core",
    },
    category: {
      zh: "遥感 → 建筑轮廓",
      en: "Remote Sensing → Building Footprints",
    },
    tagline: {
      zh: "把遥感影像转换为可用于城市数字孪生的建筑轮廓底板。",
      en: "Turn remote sensing imagery into building footprints ready for urban digital twin workflows.",
    },
    description: {
      zh: "面向大尺度城市空间数据准备的提取核心，聚焦从影像、栅格与识别结果中生成稳定的建筑轮廓成果。",
      en: "A foundation layer for large-scale urban data preparation, focused on deriving reliable building footprints from imagery, rasters, and recognition outputs.",
    },
    workflowRole: {
      zh: "从遥感图像中提取建筑几何信息，为整套流程提供基础轮廓数据。",
      en: "Extract building geometry from remote sensing imagery and provide the foundational footprint layer for the full workflow.",
    },
    highlights: [
      {
        zh: "面向批量城市区块的轮廓提取流程",
        en: "Batch-ready footprint extraction workflows for city blocks",
      },
      {
        zh: "为后续 Processing / Analysis 模块提供标准底图",
        en: "Standardized base geometry for downstream Processing and Analysis modules",
      },
      {
        zh: "适合后续接入模型推理与人工修订流程",
        en: "Ready to connect with model inference and human QA pipelines",
      },
    ],
    releaseNote: {
      zh: "当前页面展示为概念版模块，待正式发行后接入下载。",
      en: "This module is currently presented as a concept preview and will be connected to downloads after release.",
    },
    platforms: ["Windows", "Linux"],
    version: "Planned",
    icon: extractionIcon,
    wordmark: extractionWordmark,
    license: {
      name: "GPL 3.0",
    },
    downloads: [
      { platform: "macOS", available: false },
      { platform: "Windows", available: false },
      { platform: "Linux", available: false },
    ],
  },
  {
    id: "processing",
    slug: "UCDT Processing Core",
    accent: {
      primary: "#1994F0",
      secondary: "#7CC6FF",
      surface: "rgba(25, 148, 240, 0.14)",
      glow: "rgba(25, 148, 240, 0.34)",
    },
    status: "released",
    badge: {
      zh: "已发布",
      en: "Released",
    },
    title: {
      zh: "UCDT Processing Core",
      en: "UCDT Processing Core",
    },
    category: {
      zh: "多源数据融合 / 网格化",
      en: "Multi-source Fusion / Gridding",
    },
    tagline: {
      zh: "将多源城市数据聚合到统一空间基准，为后续分析和计算构建稳定中间层。",
      en: "Aggregate heterogeneous urban datasets into a shared spatial baseline for downstream analysis and computation.",
    },
    description: {
      zh: "Processing Core 专注于投影检查、坐标处理、DEM 高程聚合与网格化输出，是 UCDT 工作流中的数据整形中枢。",
      en: "Processing Core focuses on projection checks, coordinate handling, DEM aggregation, and gridded outputs as the data-shaping hub within the UCDT workflow.",
    },
    workflowRole: {
      zh: "负责多源城市数据的聚合与标准化，并导出统一网格成果。",
      en: "Aggregate and standardize heterogeneous urban datasets, then export a shared gridded output.",
    },
    highlights: [
      {
        zh: "统一 UTM / 经纬度输入与投影验证",
        en: "Unified UTM / geographic inputs with projection validation",
      },
      {
        zh: "支持 DEM 聚合与 footprint 网格化处理",
        en: "Support for DEM aggregation and footprint-based gridding",
      },
      {
        zh: "面向大规模任务的并发与分块策略",
        en: "Concurrency and chunking strategies for large processing jobs",
      },
    ],
    releaseNote: {
      zh: "当前稳定版本通过 GitHub Releases 分发，适合进入正式数据预处理流程。",
      en: "The stable release is currently distributed through GitHub Releases and is ready for production preprocessing workflows.",
    },
    platforms: ["Windows"],
    version: "v1.16.0",
    repoUrl: "https://github.com/buildingdata/ucdt-processing-gui",
    releaseUrl: "https://github.com/buildingdata/ucdt-processing-gui/releases",
    releaseMarkdown: "### 更新\n- 调整了瓦片的命名结构，固定为经度3位，纬度2位\n- 修复了 grid_id 网格的错误命名问题\n- 修复了批量任务的 grid_id 问题",
    icon: processingIcon,
    wordmark: processingWordmark,
    license: {
      name: "GPL 3.0",
      url: "https://github.com/buildingdata/ucdt-processing-gui/blob/main/LICENSE",
    },
    downloads: [
      { platform: "macOS", available: false },
      { platform: "Windows", available: true, href: "https://github.com/buildingdata/ucdt-processing-gui/releases" },
      { platform: "Linux", available: false },
    ],
    screenshots: [processingShot1, processingShot2],
  },
  {
    id: "analysis",
    slug: "UCDT Analysis Core",
    accent: {
      primary: "#E41A6D",
      secondary: "#FF8CBD",
      surface: "rgba(228, 26, 109, 0.14)",
      glow: "rgba(228, 26, 109, 0.34)",
    },
    status: "released",
    badge: {
      zh: "已发布",
      en: "Released",
    },
    title: {
      zh: "UCDT Analysis Core",
      en: "UCDT Analysis Core",
    },
    category: {
      zh: "指标计算",
      en: "Indicator Analytics",
    },
    tagline: {
      zh: "在共享基础数据之上快速开展指标分析，把城市问题转化为可比较的分析结果。",
      en: "Run indicator-driven analysis on top of shared baseline data and turn urban questions into comparable outputs.",
    },
    description: {
      zh: "Analysis Core 负责导入共享基础数据、组织分析层级与空间概览，是面向指标计算、统计展示与结果研判的核心前端。",
      en: "Analysis Core organizes shared datasets, analysis levels, and spatial overviews as the main interface for indicator computation, statistics, and result interpretation.",
    },
    workflowRole: {
      zh: "在统一数据底座上拉通各层指标，形成可比较、可浏览的分析结果。",
      en: "Connect indicators across shared baseline data and turn them into comparable, navigable analysis outputs.",
    },
    highlights: [
      {
        zh: "共享数据工作流与分析层级管理",
        en: "Shared-data workflow with analysis-level management",
      },
      {
        zh: "空间概览、主题设置与版本信息一体化",
        en: "Integrated spatial overview, theming, and version information",
      },
      {
        zh: "为 Computing / Planning 模块提供结果支撑",
        en: "Provides downstream support for Computing and Planning modules",
      },
    ],
    releaseNote: {
      zh: "最新版本已通过 GitHub Releases 提供，可直接进入指标分析与结果浏览工作流。",
      en: "The latest version is available on GitHub Releases and can be used immediately for indicator analysis and result review.",
    },
    platforms: ["Windows"],
    version: "v2.2.0",
    repoUrl: "https://github.com/buildingdata/ucdt-analysis-gui",
    releaseUrl: "https://github.com/buildingdata/ucdt-analysis-gui/releases",
    releaseMarkdown: "### 更新\n- 增强了拖放和原生文件选择器功能，现支持单个文件、多个文件及文件夹\n- 在用户界面中引入了“当前文件”选择器，用于批量管理和切换已导入的文件\n- 更新了架构和接口文档，以反映导入流程中的变更\n- 修改了 Electron 主进程，以处理批量输入解析和文件标记\n- 调整了渲染器，确保指标和预览仅针对当前选中的文件",
    icon: analysisIcon,
    wordmark: analysisWordmark,
    license: {
      name: "GPL 3.0",
      url: "https://github.com/buildingdata/ucdt-analysis-gui/blob/main/LICENSE",
    },
    downloads: [
      { platform: "macOS", available: false },
      { platform: "Windows", available: true, href: "https://github.com/buildingdata/ucdt-analysis-gui/releases" },
      { platform: "Linux", available: false },
    ],
    screenshots: [analysisShot1, analysisShot2, analysisShot3],
  },
  {
    id: "computing",
    slug: "UCDT Computing Core",
    accent: {
      primary: "#F58A1F",
      secondary: "#FFC173",
      surface: "rgba(245, 138, 31, 0.14)",
      glow: "rgba(245, 138, 31, 0.34)",
    },
    status: "comingSoon",
    badge: {
      zh: "研发中",
      en: "In Development",
    },
    title: {
      zh: "UCDT Computing Core",
      en: "UCDT Computing Core",
    },
    category: {
      zh: "能耗 / 碳模拟",
      en: "Energy / Carbon Simulation",
    },
    tagline: {
      zh: "连接基础数据与能耗碳排模拟，为城市运行评估提供统一计算引擎。",
      en: "Bridge shared urban data with energy and carbon simulations through a unified computing engine.",
    },
    description: {
      zh: "Computing Core 将聚焦模拟参数组织、场景计算与结果汇总，支持从城市网格到片区尺度的能耗与碳评估。",
      en: "Computing Core will focus on simulation parameters, scenario runs, and result aggregation for energy and carbon evaluation from grid to district scale.",
    },
    workflowRole: {
      zh: "承担建筑模型标准化与能耗、碳排放模拟，连接分析到评估计算。",
      en: "Standardize building models and run energy/carbon simulations to bridge analysis with quantitative evaluation.",
    },
    highlights: [
      {
        zh: "连接共享数据与建筑/片区能耗模型",
        en: "Connect shared data to building and district energy models",
      },
      {
        zh: "支持多场景参数计算与结果回写",
        en: "Support multi-scenario parameter runs and result feedback",
      },
      {
        zh: "为规划与策略对比提供量化底座",
        en: "Provide a quantitative basis for planning and strategy comparison",
      },
    ],
    releaseNote: {
      zh: "当前以概念展示形式呈现，后续将补充真实界面与下载入口。",
      en: "Currently shown as a concept preview; real interface assets and downloads will be added later.",
    },
    platforms: ["Windows", "Linux"],
    version: "Planned",
    icon: computingIcon,
    wordmark: computingWordmark,
    license: {
      name: "GPL 3.0",
    },
    downloads: [
      { platform: "macOS", available: false },
      { platform: "Windows", available: false },
      { platform: "Linux", available: false },
    ],
  },
  {
    id: "planning",
    slug: "UCDT Planning Core",
    accent: {
      primary: "#38C172",
      secondary: "#92F0B2",
      surface: "rgba(56, 193, 114, 0.14)",
      glow: "rgba(56, 193, 114, 0.34)",
    },
    status: "comingSoon",
    badge: {
      zh: "路线图中",
      en: "On the Roadmap",
    },
    title: {
      zh: "UCDT Planning Core",
      en: "UCDT Planning Core",
    },
    category: {
      zh: "规划决策",
      en: "Planning Decisions",
    },
    tagline: {
      zh: "把多源分析与模拟结果整合为可推演、可对比、可沟通的规划决策界面。",
      en: "Translate multi-source analysis and simulation results into a planning interface for scenario comparison and decision support.",
    },
    description: {
      zh: "Planning Core 将面向规划方案评估、参数对比与策略表达，形成从数据到决策的最后一层工作界面。",
      en: "Planning Core is intended for evaluating planning proposals, comparing parameters, and communicating strategies as the final decision layer of the suite.",
    },
    workflowRole: {
      zh: "把各层指标转化为规划决策依据，用于方案比较、论证与设计协同。",
      en: "Turn cross-layer indicators into planning guidance for scheme comparison, decision support, and design collaboration.",
    },
    highlights: [
      {
        zh: "把 Analysis / Computing 结果聚合到决策视图",
        en: "Aggregate Analysis and Computing outputs into a decision-ready view",
      },
      {
        zh: "支持方案对比、指标对照与可视化表达",
        en: "Support scenario comparison, metric benchmarking, and visual communication",
      },
      {
        zh: "为规划论证与跨团队协作提供统一入口",
        en: "Provide a unified entry point for planning justification and cross-team collaboration",
      },
    ],
    releaseNote: {
      zh: "当前以视觉占位展示产品方向，待后续正式发布后更新下载与说明。",
      en: "The current view is a visual placeholder for product direction and will be updated with downloads after release.",
    },
    platforms: ["Web", "Desktop"],
    version: "Planned",
    icon: planningIcon,
    wordmark: planningWordmark,
    license: {
      name: "GPL 3.0",
    },
    downloads: [
      { platform: "macOS", available: false },
      { platform: "Windows", available: false },
      { platform: "Linux", available: false },
    ],
  },
];

export const ecosystemHighlights: LocalizedText[] = [
  {
    zh: "统一的数据底座让 5 款核心软件形成连续工作流，而不是割裂的独立工具。",
    en: "A shared data foundation turns the five core applications into one continuous workflow instead of isolated tools.",
  },
  {
    zh: "每款软件有独立主题色与角色定位，但视觉系统保持一致，适合长期扩展。",
    en: "Each application has its own accent color and role, while the overall visual system stays consistent for long-term growth.",
  },
  {
    zh: "首版下载页优先服务版本发布与产品展示，后续可以平滑升级为文档与案例门户。",
    en: "The first version prioritizes release access and product presentation, with room to evolve into a richer docs and showcase portal.",
  },
];

export const faqItems: Array<{ question: LocalizedText; answer: LocalizedText }> = [
  {
    question: {
      zh: "目前哪些软件已经可以下载？",
      en: "Which tools are already available for download?",
    },
    answer: {
      zh: "当前已发行的是 UCDT Processing Core 和 UCDT Analysis Core，下载按钮会跳转到各自的 GitHub Releases 页面。",
      en: "UCDT Processing Core and UCDT Analysis Core are currently released, and their download buttons lead to the corresponding GitHub Releases pages.",
    },
  },
  {
    question: {
      zh: "其余三款软件为什么没有下载入口？",
      en: "Why do the other three tools not have download links yet?",
    },
    answer: {
      zh: "Extraction、Computing 与 Planning 仍处于概念展示或研发阶段，因此当前只展示产品方向、工作流位置与视觉占位。",
      en: "Extraction, Computing, and Planning are still at the concept or development stage, so the current site shows their product direction, workflow role, and visual placeholders only.",
    },
  },
  {
    question: {
      zh: "页面后续能否接入更多文档或案例？",
      en: "Can the site be extended with docs or case studies later?",
    },
    answer: {
      zh: "可以。当前结构是数据驱动的，后续可继续加入发布记录、文档入口、示例项目与案例页面。",
      en: "Yes. The current structure is data-driven and can be extended with release notes, docs, sample projects, and case-study pages later.",
    },
  },
  {
    question: {
      zh: "这个站点适合部署到哪里？",
      en: "Where is this site intended to be deployed?",
    },
    answer: {
      zh: "该项目按 Next.js 与 Vercel 的默认部署路径设计，后续可直接连接仓库进行部署。",
      en: "The project is designed around the standard Next.js and Vercel deployment flow, so it can be connected to a repository and deployed directly.",
    },
  },
];
