if (user.prefersConcise) {
  return generateBriefReply();
} else {
  return generateDetailedExplanation();
}
