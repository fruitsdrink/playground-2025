package conf

import (
	"context"

	"github.com/redis/go-redis/v9"
)

type RedisClient struct{}

var redisPrefix = ""
var client *redis.Client



func InitRedis(settings *SettingsConfig) (*RedisClient, error) {
	client = redis.NewClient(&redis.Options{
		Addr:     settings.Redis.Url,
		Password: settings.Redis.Password, // no password set
		DB:       settings.Redis.Db,  // use default DB
	})

	redisPrefix = settings.Redis.Prefix

	_, err := client.Ping(context.Background()).Result()
	
	if err != nil {
		return nil, err
	}

	return &RedisClient{}, nil
}


func (rc *RedisClient) Set(key string, value any) error {
	return client.Set(context.Background(), redisPrefix+key, value, 0).Err()
}