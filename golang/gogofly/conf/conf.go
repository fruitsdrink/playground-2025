package conf

import (
	"github.com/gogofly/utils"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

type customerLogger struct {
	logger *zap.SugaredLogger
}

// Printf(string, ...interface{})
func (l customerLogger) Printf(format string, v ...interface{}) {
	l.logger.Infof(format, v...)
}

type Conf struct {
	Settings *SettingsConfig
	Logger *zap.SugaredLogger
	Redis *RedisClient
	DB *gorm.DB
}

func Init() (*Conf, error) {
	err := error(nil)
	settings := InitSettings()
	logger := InitLogger(settings)
	redis, redisErr := InitRedis(settings)
	if redisErr != nil {
		utils.AppendError(err, redisErr)
	}
	// 必须在InitLogger之后调用
	db, dbErr := InitDB(settings, customerLogger{logger: logger})
	if dbErr != nil {
		utils.AppendError(err, dbErr)
	}
	result := &Conf{
		Settings: settings,
		Logger: logger,
		Redis: redis,
		DB: db,
	}

	return result, err
}