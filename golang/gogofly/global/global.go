package global

import (
	"github.com/gogofly/global/types"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

var (
	Settings *types.SettingsConfig
	Logger *zap.SugaredLogger
	DB *gorm.DB
)