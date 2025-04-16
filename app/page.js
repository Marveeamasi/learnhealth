'use client'
import AiVideoCreator from "@/components/AiVideoCreator";
import SideBarForAi from "@/components/SideBarForAi";

export default function AiPage() {
  
  return (
  <div className="flex w-full h-full">
    <SideBarForAi/>
    <AiVideoCreator/>
  </div>
  );
}
