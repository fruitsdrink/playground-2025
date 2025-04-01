package auth

import (
	"github.com/gin-gonic/gin"
)

type AuthModule struct {
	controller *AuthController
}

var authModule *AuthModule

func NewModule() *AuthModule {
	if authModule == nil {
		authModule = &AuthModule{
			controller: NewController(),
		}
	}
	return authModule
}


func (am *AuthModule) Init(publicRouterGroup *gin.RouterGroup, authRouterGroup *gin.RouterGroup) {
	authGroup := publicRouterGroup.Group("auth")
	{
		authGroup.POST("/login", am.controller.Login)
	}
	
}