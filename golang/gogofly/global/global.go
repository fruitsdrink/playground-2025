package global

import (
	"github.com/gogofly/global/types"
	"go.uber.org/zap"
)

var (
	Settings *types.SettingsConfig
	Logger *zap.SugaredLogger
)