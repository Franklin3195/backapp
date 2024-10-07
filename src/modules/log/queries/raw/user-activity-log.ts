import { LogAction, LogTable } from '../../../../constants';

export const userActivityLog = () =>
  `

      SELECT
      DATE(created_at) AS "date",
      sum(TIMESTAMPDIFF(MINUTE, created_at, updated_at ) )AS minutes

      FROM
      logs l
      WHERE
      l.event='${LogAction.USER_LOGIN}' AND
      l.entity='${LogTable.USER} AND
      l.user_id= ? AND
      DATE(l.created_at) >= DATE(? ) AND
      DATE(l.created_at) <= DATE( ? )


      GROUP BY DATE(created_at)
      ORDER BY  DATE(created_at)

              `;
