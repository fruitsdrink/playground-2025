package auth

import (
	"github.com/gin-gonic/gin"
	"github.com/gogofly/api"
	"github.com/gogofly/global/types"
)

func Init(registerRouteFn types.IFnInitRoute) {
	registerRouteFn(func(publicRouterGroup *gin.RouterGroup, authRouterGroup *gin.RouterGroup) {
		authGroup := authRouterGroup.Group("/auth")

		authGroup.POST("/login", api.AuthApi.Login)
	})
}
