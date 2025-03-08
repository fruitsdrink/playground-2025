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
	conf, err := conf.Init()
	if err != nil {
		if conf.Logger != nil {
			conf.Logger.Error("初始化失败: ", err.Error())
		}else{
			panic("初始化失败: " + err.Error())
		}
	}
	Settings = conf.Settings
	Logger = conf.Logger
	Redis = conf.Redis
	DB = conf.DB
}