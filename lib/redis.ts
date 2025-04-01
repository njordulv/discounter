import redis from 'ioredis'
import { promisify } from 'util'
import databaseConfig from '@/config/database'

const redisClient = new redis(databaseConfig.redis.url)

// Transform redis methods into promises
const getAsync = promisify(redisClient.get).bind(redisClient)
const setAsync = promisify(redisClient.set).bind(redisClient)

export { redisClient, getAsync, setAsync }
