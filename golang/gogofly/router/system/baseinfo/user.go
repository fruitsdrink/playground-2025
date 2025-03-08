package baseinfo

import (
	"github.com/gin-gonic/gin"
	api "github.com/gogofly/api/system/baseinfo"
)

func InitUserRoutes(baseInfoGroup *gin.RouterGroup) {
	userGroup := baseInfoGroup.Group("user")

	userGroup.GET("/", func(ctx *gin.Context) {
		api.UserApi.GetInfo(ctx)
	})
}
