package system

import (
	"github.com/gin-gonic/gin"
	"github.com/gogofly/modules/system/user"
)

type SystemModule struct {
	UserModule *user.UserModule
}

func NewModule() *SystemModule {
	return &SystemModule{
		UserModule: user.NewModule(),
	}
}

func (sm *SystemModule) Init(publicRouterGroup *gin.RouterGroup, authRouterGroup *gin.RouterGroup) {
	sm.UserModule.Init(publicRouterGroup, authRouterGroup)
}