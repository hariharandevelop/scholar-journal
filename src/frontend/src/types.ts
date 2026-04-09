import type { ExternalBlob, SubmissionId, Timestamp } from "./backend.d";

export interface Submission {
  id: SubmissionId;
  screenshotFileId: ExternalBlob;
  submitterName: string;
  collegeName: string;
  submittedAt: Timestamp;
  submitterEmail: string;
  pdfFileId: ExternalBlob;
  submitterAge: bigint;
}

export { SubmissionStatus } from "./backend";

export type SubmitPaperParams = {
  submitterName: string;
  submitterEmail: string;
  submitterAge: number;
  collegeName: string;
  pdfFile: File;
  screenshotFile: File;
};

export type SubmitState =
  | { stage: "idle" }
  | { stage: "uploading"; progress: number }
  | { stage: "submitting" }
  | { stage: "success"; id: SubmissionId }
  | { stage: "error"; message: string };

export type AdminActionResult = {
  ok: boolean;
  message: string;
};
