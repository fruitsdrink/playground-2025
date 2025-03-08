package auth

import (
	"github.com/gin-gonic/gin"
	api "github.com/gogofly/api/system/auth"
)

func Init(publicRouterGroup *gin.RouterGroup, authRouterGroup *gin.RouterGroup) {
	authGroup := authRouterGroup.Group("/auth")
	authGroup.POST("/login", api.AuthApi.Login)
}
