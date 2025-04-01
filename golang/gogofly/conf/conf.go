package conf

import (
	"github.com/gogofly/utils"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

type CustomerLogger struct {
	logger *zap.SugaredLogger
}

var Logger CustomerLogger

// Printf(string, ...interface{})
func (l CustomerLogger) Printf(format string, v ...interface{}) {
	l.logger.Infof(format, v...)
}

func (l CustomerLogger) Write(p []byte) (n int, err error) {
	l.logger.Infof("%s", string(p))
	return len(p), nil
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
	Logger = CustomerLogger{logger: logger}
	db, dbErr := InitDB(settings, Logger)
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