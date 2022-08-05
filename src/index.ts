import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import 'dotenv/config';
import AppDataSource from '@config/data-source';
import routes from '@routes/index';
import {
  ServerToClientEvents,
  ClientToServerEvents
} from '@interfaces/socket/socket.dto';
import createChatNameSpace from './socket';

const app = express();
const httpServer = createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer);

const specs = YAML.load('build/swagger.yaml');

AppDataSource.initialize()
  .then(async () => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());

    app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(specs, { explorer: true })
    );
    app.use('/api', routes);

    httpServer
      .listen(process.env.PORT, () => {
        console.log(
          `${process.env.NODE_ENV} - API Server Start At Port ${process.env.PORT}`
        );
      })
      .on('error', err => {
        console.log(err);
        process.exit(1);
      });
  })
  .catch(err => console.log(err));

createChatNameSpace(io);
