package baseinfo

import (
	"github.com/gin-gonic/gin"
)

func Init(publicRouterGroup *gin.RouterGroup, authRouterGroup *gin.RouterGroup) {
	baseInfoGroup := authRouterGroup.Group("baseinfo")
	InitUserRoutes(baseInfoGroup)
}
