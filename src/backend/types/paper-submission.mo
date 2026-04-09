import Storage "mo:caffeineai-object-storage/Storage";
import Time "mo:core/Time";

module {
  public type SubmissionId = Nat;
  public type Timestamp = Time.Time;

  public type SubmissionStatus = {
    #pending;
    #approved;
    #rejected;
  };

  // Internal type with mutable status
  public type SubmissionInternal = {
    id : SubmissionId;
    submitterName : Text;
    submitterEmail : Text;
    submitterAge : Nat;
    collegeName : Text;
    pdfFileId : Storage.ExternalBlob;
    screenshotFileId : Storage.ExternalBlob;
    var status : SubmissionStatus;
    submittedAt : Timestamp;
    adminToken : Text;
  };

  // Public/shared type for API boundary (no var fields)
  public type Submission = {
    id : SubmissionId;
    submitterName : Text;
    submitterEmail : Text;
    submitterAge : Nat;
    collegeName : Text;
    pdfFileId : Storage.ExternalBlob;
    screenshotFileId : Storage.ExternalBlob;
    status : SubmissionStatus;
    submittedAt : Timestamp;
  };

  public type SubmitResult = {
    #ok : SubmissionId;
    #err : Text;
  };

  // Record-based result with ok flag and message
  public type ActionResult = {
    ok : Bool;
    message : Text;
  };
};
