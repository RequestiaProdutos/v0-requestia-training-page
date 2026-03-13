// lib/email/template-engine.ts
import { readFile } from "node:fs/promises";
import path from "node:path";

const cache = new Map<string, string>();
const TOKEN_REGEX = /\{([a-zA-Z0-9:_()-]+)\}/g;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function loadPublicTemplate(fileName: string): Promise<string> {
  const fromCache = cache.get(fileName);
  if (fromCache) return fromCache;

  const filePath = path.join(process.cwd(), "public", fileName);
  const html = await readFile(filePath, "utf8");
  cache.set(fileName, html);
  return html;
}

export function renderTemplate(
  template: string,
  vars: Record<string, string>,
): string {
  return template.replace(TOKEN_REGEX, (match, tokenName: string) => {
    const value = vars[tokenName];
    if (value === undefined) return match;
    return escapeHtml(value);
  });
}
