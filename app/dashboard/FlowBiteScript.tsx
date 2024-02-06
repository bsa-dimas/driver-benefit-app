"use client";

import { initFlowbite } from "flowbite";
import { memo } from "react";

/**
 * FlowbiteScript Component
 *
 * This component initializes the Flowbite functionality using the `initFlowbite` function.
 * It is memoized for performance optimization.
 *
 * @component
 * @return {React.Fragment} An empty fragment, as this component doesn't render visible content.
 *
 * @example
 * // Import the component
 * import FlowbiteScript from './FlowbiteScript';
 *
 * // Use the component in your JSX
 * <FlowbiteScript />
 */
const FlowbiteScript = () => {
  // Initialize Flowbite functionality
  if (typeof window !== "undefined") {
    initFlowbite();
  }

  // Return an empty fragment
  return <></>;
};

// Memoize the component for performance optimization
export default memo(FlowbiteScript);
