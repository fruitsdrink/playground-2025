package core

import (
	"fmt"

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

func (c *CoreModule) Init(r *gin.Engine, publicRouterGroup *gin.RouterGroup, authRouterGroup *gin.RouterGroup) {
	fmt.Println("core module init: ", c.authModule)
	group := publicRouterGroup.Group("auth")
	c.authModule.Init(r,group, authRouterGroup)
}