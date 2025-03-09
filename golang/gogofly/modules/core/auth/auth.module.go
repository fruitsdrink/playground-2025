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


func (am *AuthModule) Init(r *gin.Engine, publicRouterGroup *gin.RouterGroup, authRouterGroup *gin.RouterGroup) {
	publicRouterGroup.POST("/login", am.controller.Login)
	
}