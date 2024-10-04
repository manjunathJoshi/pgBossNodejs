import express from 'express';
import router from './router';
import {PgBossService} from './pgBossService';
import {intializeConsumer} from './pgBossConsumer'


const app = express();

app.use(express.json());

// Use the router
app.use(router);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function main() {
  try {
    const pgBoss = PgBossService.getInstance()
    await pgBoss.initiatePgBoss();
    await intializeConsumer();
    console.log('All jobs set up successfully');
  } catch (error) {
    console.error('Error setting up jobs:', error);
  }
}

main();