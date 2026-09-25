/**
 * Helper local equivalente ao `Extensions/CssClassBuilder.cs` (Regra 10 do MIGRATION.md).
 */
export function cssClasses(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(' ').trim();
}
