import { Shield, Code2, Search, ArrowLeftRight, Calculator, PenSquare, Briefcase, HeartPulse, Gauge, Palette, Clock3 } from "lucide-react";

export function ToolIcon({ category }: { category: string }) {
  const key = category.toLowerCase();
  if (key.includes("security")) return <Shield className="h-4 w-4" />;
  if (key.includes("developer")) return <Code2 className="h-4 w-4" />;
  if (key.includes("seo")) return <Search className="h-4 w-4" />;
  if (key.includes("converter")) return <ArrowLeftRight className="h-4 w-4" />;
  if (key.includes("math") || key.includes("finance")) return <Calculator className="h-4 w-4" />;
  if (key.includes("writing")) return <PenSquare className="h-4 w-4" />;
  if (key.includes("business") || key.includes("marketing") || key.includes("commerce")) return <Briefcase className="h-4 w-4" />;
  if (key.includes("health")) return <HeartPulse className="h-4 w-4" />;
  if (key.includes("performance")) return <Gauge className="h-4 w-4" />;
  if (key.includes("design")) return <Palette className="h-4 w-4" />;
  return <Clock3 className="h-4 w-4" />;
}
