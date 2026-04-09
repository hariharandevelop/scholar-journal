import Types "../types/paper-submission";
import PaperLib "../lib/paper-submission";
import Storage "mo:caffeineai-object-storage/Storage";
import List "mo:core/List";

mixin (
  submissions : List.List<Types.SubmissionInternal>,
) {
  let ADMIN_PASSWORD : Text = "admin123";

  // Validate admin password — returns true if password matches
  public query func adminLogin(password : Text) : async Bool {
    password == ADMIN_PASSWORD;
  };

  // Submit a new paper
  public shared func submitPaper(
    submitterName : Text,
    submitterEmail : Text,
    submitterAge : Nat,
    collegeName : Text,
    pdfFileId : Storage.ExternalBlob,
    screenshotFileId : Storage.ExternalBlob,
  ) : async Types.SubmitResult {
    let currentId = submissions.size();
    let sub = PaperLib.createSubmission(
      submissions,
      currentId,
      submitterName,
      submitterEmail,
      submitterAge,
      collegeName,
      pdfFileId,
      screenshotFileId,
    );
    #ok(sub.id);
  };

  // Admin approves a paper — validates token, marks approved
  public shared func approvePaper(
    submissionId : Types.SubmissionId,
    token : Text,
  ) : async Types.ActionResult {
    switch (PaperLib.findForAdminAction(submissions, submissionId, token)) {
      case null { { ok = false; message = "Invalid submission ID or token" } };
      case (?sub) {
        if (sub.status != #pending) {
          return { ok = false; message = "Submission has already been processed" };
        };
        sub.status := #approved;
        { ok = true; message = "Paper approved successfully" };
      };
    };
  };

  // Admin rejects a paper — validates token, marks rejected
  public shared func rejectPaper(
    submissionId : Types.SubmissionId,
    token : Text,
  ) : async Types.ActionResult {
    switch (PaperLib.findForAdminAction(submissions, submissionId, token)) {
      case null { { ok = false; message = "Invalid submission ID or token" } };
      case (?sub) {
        if (sub.status != #pending) {
          return { ok = false; message = "Submission has already been processed" };
        };
        sub.status := #rejected;
        { ok = true; message = "Paper rejected successfully" };
      };
    };
  };

  // Admin approves a paper using admin password (dashboard workflow)
  public shared func adminApprovePaper(
    submissionId : Types.SubmissionId,
    adminPassword : Text,
  ) : async Types.ActionResult {
    if (adminPassword != ADMIN_PASSWORD) {
      return { ok = false; message = "Invalid admin password" };
    };
    switch (PaperLib.findById(submissions, submissionId)) {
      case null { { ok = false; message = "Submission not found" } };
      case (?sub) {
        if (sub.status != #pending) {
          return { ok = false; message = "Submission has already been processed" };
        };
        sub.status := #approved;
        { ok = true; message = "Paper approved successfully" };
      };
    };
  };

  // Admin rejects a paper using admin password (dashboard workflow)
  public shared func adminRejectPaper(
    submissionId : Types.SubmissionId,
    adminPassword : Text,
  ) : async Types.ActionResult {
    if (adminPassword != ADMIN_PASSWORD) {
      return { ok = false; message = "Invalid admin password" };
    };
    switch (PaperLib.findById(submissions, submissionId)) {
      case null { { ok = false; message = "Submission not found" } };
      case (?sub) {
        if (sub.status != #pending) {
          return { ok = false; message = "Submission has already been processed" };
        };
        sub.status := #rejected;
        { ok = true; message = "Paper rejected successfully" };
      };
    };
  };

  // Admin query — returns all submissions (pending, approved, rejected) sorted newest first
  public query func getAllSubmissions() : async [Types.Submission] {
    PaperLib.getAll(submissions);
  };

  // Public query — returns all approved submissions sorted newest first
  public query func getApprovedPapers() : async [Types.Submission] {
    PaperLib.getApproved(submissions);
  };
};
