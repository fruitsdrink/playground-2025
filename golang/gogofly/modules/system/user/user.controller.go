package user

import "github.com/gin-gonic/gin"

type UserController struct {
	service *UserService
}

func NewController() *UserController {
	return &UserController{
		service: NewService(),
	}
}

func (uc *UserController) FindList(ctx *gin.Context) {
	uc.service.FindList(ctx)
}