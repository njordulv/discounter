import redis from 'ioredis'
import { promisify } from 'util'
import databaseConfig from '@/config/database'

const client = new redis(databaseConfig.redis.url)

// Transform redis methods into promises
const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)

export { client, getAsync, setAsync }
