import React from "react";

const SectionDivider: React.FC = () => {
  return (
    <div className="py-12 md:py-16">
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent"></div>
    </div>
  );
};

export default SectionDivider;