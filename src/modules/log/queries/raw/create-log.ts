export const createLog = () =>
  `INSERT INTO logs (id, event, entity, ip_address, user_id) VALUES (?, ? , ?, ?, ?)`;
