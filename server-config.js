const auth = require('json-server-auth');
const jsonServer = require('json-server');

const app = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = 3000;

app.db = router.db;

app.use(auth);
app.use(middlewares);
app.use(router);

app.listen(port, () => {
  console.log(`JSON Server з auth запущений на http://localhost:${port}`);
  console.log(`Auth endpoints:`);
  console.log(`   POST /auth/register - реєстрація`);
  console.log(`   POST /auth/login - логін`);
  console.log(`Items endpoints: GET, POST, PUT, DELETE /items`);
});
