import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type SubmissionId = bigint;
export type SubmitResult = {
    __kind__: "ok";
    ok: SubmissionId;
} | {
    __kind__: "err";
    err: string;
};
export type Timestamp = bigint;
export interface Submission {
    id: SubmissionId;
    status: SubmissionStatus;
    screenshotFileId: ExternalBlob;
    submitterName: string;
    collegeName: string;
    submittedAt: Timestamp;
    submitterEmail: string;
    pdfFileId: ExternalBlob;
    submitterAge: bigint;
}
export interface ActionResult {
    ok: boolean;
    message: string;
}
export enum SubmissionStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export interface backendInterface {
    adminApprovePaper(submissionId: SubmissionId, adminPassword: string): Promise<ActionResult>;
    adminLogin(password: string): Promise<boolean>;
    adminRejectPaper(submissionId: SubmissionId, adminPassword: string): Promise<ActionResult>;
    approvePaper(submissionId: SubmissionId, token: string): Promise<ActionResult>;
    getAllSubmissions(): Promise<Array<Submission>>;
    getApprovedPapers(): Promise<Array<Submission>>;
    rejectPaper(submissionId: SubmissionId, token: string): Promise<ActionResult>;
    submitPaper(submitterName: string, submitterEmail: string, submitterAge: bigint, collegeName: string, pdfFileId: ExternalBlob, screenshotFileId: ExternalBlob): Promise<SubmitResult>;
}
