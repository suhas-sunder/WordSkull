//Was having issue in pm2 logs for random requests to xmlrpc.php, likely from bots trying to target WordPress servers
//This code ensures that any request to /xmlrpc.php returns a 404 Not Found response.
export const loader = async () => {
  return new Response("Not Found", { status: 404 });
};

export const action = async () => {
  return new Response("Not Found", { status: 404 });
};
