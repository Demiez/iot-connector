import * as mongoose from 'mongoose';
import { ConnectOptions } from 'mongoose';
import { logger } from './logger.util';

export const connectMongoDB = async (mongoURI: string): Promise<void> => {
  try {
    const { connection } = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    } as ConnectOptions);

    logger.info(`MongoDB Connected: ${connection.host}`);
  } catch (error) {
    logger.error('', error);
  }
};
