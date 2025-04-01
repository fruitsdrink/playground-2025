package system

import (
	"github.com/gin-gonic/gin"
	"github.com/gogofly/modules/system/baseinfo"
)

type SystemModule struct {
	BaseInfoModule *baseinfo.BaseInfoModule
}

var systemModule *SystemModule

func NewModule() *SystemModule {
	if systemModule == nil {
		systemModule = &SystemModule{
			BaseInfoModule: baseinfo.NewModule(),
		}
	}
	return systemModule
}

func (sm *SystemModule) Init(publicRouterGroup *gin.RouterGroup, authRouterGroup *gin.RouterGroup) {
	systemGroup := authRouterGroup.Group("system")
	{
		sm.BaseInfoModule.Init(publicRouterGroup, systemGroup)
	}
}