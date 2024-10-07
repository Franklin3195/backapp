export const updateLogById = () =>
  `UPDATE logs SET updated_at = NOW() WHERE id = ?`;
