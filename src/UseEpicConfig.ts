export type InteropAction = Record<keyof unknown, unknown>;

export interface UseEpicConfig {
  /** Actions */
  A: InteropAction;
  /** State */
  S: unknown;
  /** Dependencies */
  D: unknown;
}
