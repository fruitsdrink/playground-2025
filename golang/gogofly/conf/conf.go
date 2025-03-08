package conf

import (
	"github.com/gogofly/global"
)


func Init() {
	global.Settings = InitSettings()
	global.Logger = InitLogger(global.Settings)
	// 必须在InitLogger之后调用
	global.DB = InitDB()
}