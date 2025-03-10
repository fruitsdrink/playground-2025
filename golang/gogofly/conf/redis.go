package conf

import (
	"context"
	"strings"
	"time"

	"github.com/redis/go-redis/v9"
)

type RedisClient struct{}

var redisPrefix = ""
var client *redis.Client
var duration time.Duration


func InitRedis(settings *SettingsConfig) (*RedisClient, error) {
	client = redis.NewClient(&redis.Options{
		Addr:     settings.Redis.Url,
		Password: settings.Redis.Password, // no password set
		DB:       settings.Redis.Db,  // use default DB
	})

	redisPrefix = settings.Redis.Prefix
	parsedDuration, durationErr := time.ParseDuration(settings.Redis.ExpiresAt)
	if durationErr != nil {
		parsedDuration = 0
	}
	duration = parsedDuration

	_, err := client.Ping(context.Background()).Result()
	
	if err != nil {
		return nil, err
	}

	return &RedisClient{}, nil
}

func (rc *RedisClient) getKey(key string) string {
	return redisPrefix + "::" + key
}

func (rc *RedisClient) Set(key string, value any) error {
	return client.Set(context.Background(), rc.getKey(key), value, duration).Err()
}

func (rc *RedisClient) Get(key string) (any, error) {
	return client.Get(context.Background(), rc.getKey(key)).Result()
}

func (rc *RedisClient) Delete(key ...string) error {
	if len(key) == 0 {
		return nil
	}
	for _, k := range key {
		err := client.Del(context.Background(), rc.getKey(k)).Err()
		if err != nil {
			return err
		}
	}
	return nil
}

func (rc *RedisClient) Clear() error {
	// 获取所有key
	keys, err := client.Keys(context.Background(), "*").Result()
	if err != nil {
		return err
	}
	// 删除所有以redisPrefix开头的key
	if len(redisPrefix) > 0 {
		for _, key := range keys {
			if strings.HasPrefix(key, redisPrefix) {
				client.Del(context.Background(), key)
			}
		}
	}else{
		// 删除所有key
		client.FlushDB(context.Background())
	}
	return nil
}

func (rc *RedisClient) GetExpireDuration(key string) (time.Duration, error) {
	return client.TTL(context.Background(), rc.getKey(key)).Result()
}
