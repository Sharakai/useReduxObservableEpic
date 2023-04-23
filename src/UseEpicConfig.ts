export type InteropAction = Record<keyof any, unknown>;

export interface UseEpicConfig {
  /** Actions */
  A: InteropAction;
  /** State */
  S: unknown;
  /** Dependencies */
  D: unknown;
}
