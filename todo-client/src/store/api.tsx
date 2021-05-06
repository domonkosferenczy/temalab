/**
 * Assign the project to an employee.
 * @param {string} endpoint - The employee who is responsible for the project.
 * @param {object} payload - The employee who is responsible for the project.
 */
export const apiFetch = async (endpoint: string, requestOptions: object) => {
  try {
    const data: Response = await fetch(endpoint, requestOptions);
    return await data.json();
  } catch (e) {}
};
