/**
 * ==========================================================
 * FINVERSE AI — New Chat Session Button
 * Executive action button with plus icon & gradient glow
 * ==========================================================
 */

import React from "react";
import Button from "../../../components/ui/Button/Button";
import { FaPlus } from "react-icons/fa";

function ChatMenu({ onNewChat }) {
  return (
    <Button
      variant="ai"
      size="md"
      onClick={onNewChat}
      icon={<FaPlus className="h-3 w-3" />}
      className="w-full justify-center shadow-lg shadow-purple-500/10"
    >
      New Session
    </Button>
  );
}

export default ChatMenu;