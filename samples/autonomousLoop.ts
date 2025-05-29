while (!goalAchieved) {
  const thought = await think(currentState);
  const action = await selectTool(thought);
  const result = await execute(action);
  updateState(result);
}
