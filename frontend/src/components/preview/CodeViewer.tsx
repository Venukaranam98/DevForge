import React, { useState } from "react";
import { Copy, Check, FileCode } from "lucide-react";
import { GeneratedFileItem } from "../../types";

interface CodeViewerProps {
  file: GeneratedFileItem | null;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ file }) => {
  const [copied, setCopied] = useState(false);

  if (!file) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-zinc-500 text-xs font-mono">
        Select a file from the explorer on the left to preview code.
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(file.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = file.content.split("\n");

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#09090c]">
      {/* File Top Bar */}
      <div className="h-10 border-b border-[#1f1f23] bg-[#101014] px-4 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-zinc-300">
          <FileCode className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-white">{file.path}</span>
          <span className="text-zinc-600">({lines.length} lines)</span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1c1c22] hover:bg-[#25252e] text-zinc-300 text-[11px] transition"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-zinc-400" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Text Content */}
      <div className="flex-1 overflow-auto p-4 font-mono text-xs text-zinc-200 leading-relaxed bg-[#0a0a0e]">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-[#13131a]">
                <td className="select-none text-zinc-600 text-right pr-4 pl-1 w-10 text-[11px] font-mono">
                  {idx + 1}
                </td>
                <td className="whitespace-pre font-mono text-zinc-200">{line}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
