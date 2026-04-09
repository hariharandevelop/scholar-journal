import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import PaperMixin "mixins/paper-submission-api";
import Types "types/paper-submission";
import List "mo:core/List";

actor {
  let submissions = List.empty<Types.SubmissionInternal>();

  // Migration: explicitly declare stable variables from previous version
  // that used email-based workflow (now replaced by admin dashboard).
  // These are kept only for upgrade compatibility and hold no data.
  var ADMIN_EMAIL : Text = "";
  var B64_CHARS : [Char] = [];
  var CANISTER_BASE_URL : Text = "";
  var MAILGUN_API_KEY : Text = "";
  var MAILGUN_DOMAIN : Text = "";

  include MixinObjectStorage();
  include PaperMixin(submissions);
};
