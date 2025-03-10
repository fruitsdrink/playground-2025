package user

import "github.com/gin-gonic/gin"

type UserController struct {
	service *UserService
}

var userController *UserController

func NewController() *UserController {
	if userController == nil {
		userController = &UserController{
			service: NewService(),
		}
	}
	return userController
}

func (uc *UserController) FindList(ctx *gin.Context) {
	uc.service.FindList(ctx)
}