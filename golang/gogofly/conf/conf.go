package conf

import (
	"github.com/gogofly/global"
)


func Init() {
	global.Settings = InitSettings()
	global.Logger = InitLogger(global.Settings)
}