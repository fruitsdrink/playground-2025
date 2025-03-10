package system

import (
	"github.com/gin-gonic/gin"
	"github.com/gogofly/modules/system/user"
)

type SystemModule struct {
	UserModule *user.UserModule
}

var systemModule *SystemModule

func NewModule() *SystemModule {
	if systemModule == nil {
		systemModule = &SystemModule{
			UserModule: user.NewModule(),
		}
	}
	return systemModule
}

func (sm *SystemModule) Init(publicRouterGroup *gin.RouterGroup, authRouterGroup *gin.RouterGroup) {
	sm.UserModule.Init(publicRouterGroup, authRouterGroup)
}