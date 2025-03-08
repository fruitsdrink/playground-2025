package system

import (
	"github.com/gin-gonic/gin"
	"github.com/gogofly/router/system/auth"
	baseInfo "github.com/gogofly/router/system/baseinfo"
)

func Init(publicRouterGroup *gin.RouterGroup, authRouterGroup *gin.RouterGroup) {
	auth.Init(publicRouterGroup, authRouterGroup)
	baseInfo.Init(publicRouterGroup, authRouterGroup)
}