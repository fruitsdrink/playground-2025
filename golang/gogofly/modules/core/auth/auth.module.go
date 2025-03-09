package auth

import (
	"github.com/gin-gonic/gin"
)

type AuthModule struct {
	controller *AuthController
}

func NewModule() *AuthModule {
	return &AuthModule{
		controller: NewController(),
	}
}


func (am *AuthModule) Init(publicRouterGroup *gin.RouterGroup, authRouterGroup *gin.RouterGroup) {
	authGroup := publicRouterGroup.Group("auth")
	authGroup.POST("/login", am.controller.Login)
	
}