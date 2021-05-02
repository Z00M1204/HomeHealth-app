// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { UserStats, StatSet, PublicStatSet, UserInfo } = initSchema(schema);

export {
  UserStats,
  StatSet,
  PublicStatSet,
  UserInfo
};