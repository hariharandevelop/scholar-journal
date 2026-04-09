import { ExternalBlob, createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { SubmitPaperParams } from "../types";

export function useApprovedPapers() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery({
    queryKey: ["approvedPapers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getApprovedPapers();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
    refetchInterval: 30_000,
  });
}

export function useSubmitPaper() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: SubmitPaperParams) => {
      if (!actor) throw new Error("Backend not available");

      const pdfBytes = new Uint8Array(await params.pdfFile.arrayBuffer());
      const screenshotBytes = new Uint8Array(
        await params.screenshotFile.arrayBuffer(),
      );

      const pdfBlob = ExternalBlob.fromBytes(pdfBytes);
      const screenshotBlob = ExternalBlob.fromBytes(screenshotBytes);

      const result = await actor.submitPaper(
        params.submitterName,
        params.submitterEmail,
        BigInt(params.submitterAge),
        params.collegeName,
        pdfBlob,
        screenshotBlob,
      );

      if (result.__kind__ === "err") {
        throw new Error(result.err);
      }

      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approvedPapers"] });
    },
  });
}

// ── Admin hooks ──────────────────────────────────────────────────────────────

export function useAllSubmissions() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery({
    queryKey: ["allSubmissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSubmissions();
    },
    enabled: !!actor && !isFetching,
    staleTime: 10_000,
    refetchInterval: 15_000,
  });
}

export function useAdminLogin() {
  const { actor, isFetching: actorLoading } = useActor(createActor);

  const mutation = useMutation({
    mutationFn: async (password: string) => {
      if (!actor)
        throw new Error("Backend not available — please wait and try again.");
      return actor.adminLogin(password);
    },
  });

  return { ...mutation, actorLoading };
}

export function useAdminApprove() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      submissionId,
      adminPassword,
    }: {
      submissionId: bigint;
      adminPassword: string;
    }) => {
      if (!actor) throw new Error("Backend not available");
      return actor.adminApprovePaper(submissionId, adminPassword);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allSubmissions"] });
      queryClient.invalidateQueries({ queryKey: ["approvedPapers"] });
    },
  });
}

export function useAdminReject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      submissionId,
      adminPassword,
    }: {
      submissionId: bigint;
      adminPassword: string;
    }) => {
      if (!actor) throw new Error("Backend not available");
      return actor.adminRejectPaper(submissionId, adminPassword);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allSubmissions"] });
      queryClient.invalidateQueries({ queryKey: ["approvedPapers"] });
    },
  });
}
