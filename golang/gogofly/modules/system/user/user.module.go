package user

import "github.com/gin-gonic/gin"

type UserModule struct {
	controller *UserController
}
func NewModule() *UserModule {
	return &UserModule{
		controller: NewController(),
	}
}

func (am *UserModule) Init(publicRouterGroup *gin.RouterGroup, authRouterGroup *gin.RouterGroup) {
	userGroup := authRouterGroup.Group("user")
	userGroup.GET("", am.controller.FindList)
}