export const HEADERS = {
  header: () => ({
    accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  }),
  authHeader: () => ({
    accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }),
}
