(async () => {
  const transcript = await transcribe(audioBlob);
  const response = await chat(transcript);
  const audioReply = await textToSpeech(response);
})();

export {};
