package baseinfo

import (
	"github.com/gin-gonic/gin"
	"github.com/gogofly/modules/system/baseinfo/user"
)

type BaseInfoModule struct {
	UserModule *user.UserModule
}

var baseInfoModule *BaseInfoModule

func NewModule() *BaseInfoModule {
	if baseInfoModule == nil {
		baseInfoModule = &BaseInfoModule{
			UserModule: user.NewModule(),
		}
	}
	return baseInfoModule
}

func (bim *BaseInfoModule) Init(publicRouterGroup *gin.RouterGroup, authRouterGroup *gin.RouterGroup) {
	baseInfoGroup := authRouterGroup.Group("baseinfo")
	{
		bim.UserModule.Init(publicRouterGroup, baseInfoGroup)
	}
}