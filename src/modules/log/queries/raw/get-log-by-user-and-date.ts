export const getLogByUserAndDate = () =>
  `SELECT * FROM logs l WHERE user_id = ? AND DATE(l.created_at) = ? ORDER BY l.updated_at DESC LIMIT 1`;
