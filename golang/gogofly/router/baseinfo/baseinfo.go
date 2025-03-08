package baseinfo

import (
	"github.com/gin-gonic/gin"
	"github.com/gogofly/types"
)

func Init(registerRouteFn types.IFnInitRoute) {
	registerRouteFn(func(publicRouterGroup *gin.RouterGroup, authRouterGroup *gin.RouterGroup) {
		group := authRouterGroup.Group("/baseinfo")
		InitUserRoutes(group)
	})
}
