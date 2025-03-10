package user

import "github.com/gin-gonic/gin"

type UserModule struct {
	controller *UserController
}

var userModule *UserModule

func NewModule() *UserModule {
	if userModule == nil {
		userModule = &UserModule{
			controller: NewController(),
		}
	}
	return userModule
}

func (am *UserModule) Init(publicRouterGroup *gin.RouterGroup, authRouterGroup *gin.RouterGroup) {
	userGroup := authRouterGroup.Group("user")
	{
		userGroup.POST("/", am.controller.Create)
		userGroup.PUT("/:id", am.controller.Update)
		userGroup.DELETE("/:id", am.controller.Delete)
		userGroup.GET("/", am.controller.FindList)
		userGroup.GET("/:id", am.controller.FindOne)
	}
}