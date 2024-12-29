import db from '../helpers/db';

export async function addSubscriptionLogRecord(restaurant_id: number, is_active: boolean) {
  const sqlQuery = `
      INSERT INTO \`subscription_log\` (restaurant_id, is_active, datetime)
      VALUES (?, ?, ?)
    `;

  try {
    const result = await db.executeQuery(sqlQuery, [restaurant_id, is_active ? 1 : 0, new Date()]);
    return result;
  } catch (error) {
    console.error("Error adding record to subscription log:", error);
    throw error;
  }
}