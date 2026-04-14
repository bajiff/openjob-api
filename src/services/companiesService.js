// src/services/companiesService.js
import pool from '../config/database.js';

export const addCompany = async ({ name, location }) => {
  const id = `company-${Date.now()}`; 
  
  const query = {
    text: 'INSERT INTO companies (id, name, location) VALUES ($1, $2, $3) RETURNING id',
    values: [id, name, location],
  };

  const result = await pool.query(query);
  return result.rows[0].id;
};