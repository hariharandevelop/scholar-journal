import Types "../types/paper-submission";
import Storage "mo:caffeineai-object-storage/Storage";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";

module {
  public type SubmissionList = List.List<Types.SubmissionInternal>;

  // Generate an admin action token — deterministic, based on id + timestamp
  public func generateToken(id : Types.SubmissionId, submittedAt : Types.Timestamp) : Text {
    id.toText() # "x" # submittedAt.toText() # "xsj";
  };

  // Convert internal submission to public shared type
  public func toPublic(sub : Types.SubmissionInternal) : Types.Submission {
    {
      id = sub.id;
      submitterName = sub.submitterName;
      submitterEmail = sub.submitterEmail;
      submitterAge = sub.submitterAge;
      collegeName = sub.collegeName;
      pdfFileId = sub.pdfFileId;
      screenshotFileId = sub.screenshotFileId;
      status = sub.status;
      submittedAt = sub.submittedAt;
    };
  };

  // Create a new submission and add to list
  public func createSubmission(
    submissions : SubmissionList,
    nextId : Nat,
    submitterName : Text,
    submitterEmail : Text,
    submitterAge : Nat,
    collegeName : Text,
    pdfFileId : Storage.ExternalBlob,
    screenshotFileId : Storage.ExternalBlob,
  ) : Types.SubmissionInternal {
    let now = Time.now();
    let token = generateToken(nextId, now);
    let sub : Types.SubmissionInternal = {
      id = nextId;
      submitterName;
      submitterEmail;
      submitterAge;
      collegeName;
      pdfFileId;
      screenshotFileId;
      var status = #pending;
      submittedAt = now;
      adminToken = token;
    };
    submissions.add(sub);
    sub;
  };

  // Find a submission by ID and token, validate for admin action
  public func findForAdminAction(
    submissions : SubmissionList,
    submissionId : Types.SubmissionId,
    token : Text,
  ) : ?Types.SubmissionInternal {
    submissions.find(func(sub) {
      sub.id == submissionId and sub.adminToken == token
    });
  };

  // Find a submission by ID only (for admin dashboard use)
  public func findById(
    submissions : SubmissionList,
    submissionId : Types.SubmissionId,
  ) : ?Types.SubmissionInternal {
    submissions.find(func(sub) { sub.id == submissionId });
  };

  // Get all approved submissions sorted newest first
  public func getApproved(submissions : SubmissionList) : [Types.Submission] {
    let arr = submissions.toArray();
    let filtered = arr.filter(func(sub : Types.SubmissionInternal) : Bool { sub.status == #approved });
    let mapped = filtered.map(func(sub : Types.SubmissionInternal) : Types.Submission { toPublic(sub) });
    mapped.sort(func(a : Types.Submission, b : Types.Submission) : { #equal; #greater; #less } { Int.compare(b.submittedAt, a.submittedAt) });
  };

  // Get all submissions (pending, approved, rejected) sorted newest first
  public func getAll(submissions : SubmissionList) : [Types.Submission] {
    let arr = submissions.toArray();
    let mapped = arr.map(func(sub : Types.SubmissionInternal) : Types.Submission { toPublic(sub) });
    mapped.sort(func(a : Types.Submission, b : Types.Submission) : { #equal; #greater; #less } { Int.compare(b.submittedAt, a.submittedAt) });
  };
};
