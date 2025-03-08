package global

import (
	"github.com/gogofly/conf"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

var (
	Settings *conf.SettingsConfig
	Logger *zap.SugaredLogger
	DB *gorm.DB
	Redis *conf.RedisClient
)

func init() {
	settings, logger, redis, db, err := conf.Init()
	if err != nil {
		if logger != nil {
			logger.Error("初始化失败: ", err.Error())
		}else{
			panic("初始化失败: " + err.Error())
		}
	}
	Settings = settings
	Logger = logger
	Redis = redis
	DB = db
}