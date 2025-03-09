package core

import (
	"github.com/gin-gonic/gin"
	"github.com/gogofly/modules/core/auth"
)

type CoreModule struct {
	authModule *auth.AuthModule
}
func NewModule() *CoreModule {
	return &CoreModule{
		authModule: auth.NewModule(),
	}
}

func (c *CoreModule) Init(publicRouterGroup *gin.RouterGroup, authRouterGroup *gin.RouterGroup) {
	c.authModule.Init(publicRouterGroup, authRouterGroup)
}